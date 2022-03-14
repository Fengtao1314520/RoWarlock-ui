<template>
  <v-card v-if="localrosobj !== null && localrosobj !== undefined && JSON.stringify(localrosobj) !== '{}'">
    <v-toolbar color="blue accent-4" dark class="mt-4">
      <v-toolbar-title>{{ localrosobj.name }}</v-toolbar-title>
    </v-toolbar>
    <v-alert
      class="mt-4"
      dense
      rounded
      border="left"
      colored-border
      color="deep-purple accent-4"
      elevation="2"
    >
      <v-row>
        <v-col cols="4">
          <v-btn depressed color="primary" class="mt-8 rounded-r-xl" @click="editSuite()">
            <v-icon left>mdi-sort-descending</v-icon>
            {{ localrosobj.annotation.description }}
          </v-btn>
        </v-col>
        <v-col cols="4">
          <v-alert
            class="mt-4"
            dense
            rounded
            border="left"
            colored-border
            color="grey"
            elevation="0"
          >
            {{ localrosobj.annotation.description }}
            <v-row class="py-1 px-0">
              <v-chip
                class="ma-2 white--text"
                color="amber darken-4"
                label>
                <v-icon left>
                  mdi-map-marker-circle
                </v-icon>
                {{ localrosobj.annotation.lastupdate.athor }}
              </v-chip>
              <v-chip
                class="ma-2 white--text"
                color="amber darken-4"
                label>
                <v-icon left>
                  mdi-calendar-clock
                </v-icon>
                {{ localrosobj.annotation.lastupdate.date }}
              </v-chip>
            </v-row>
          </v-alert>
        </v-col>
        <v-col>
          <v-row>
            <v-col cols="3" class="mr-4 mt-2">
              <v-progress-circular
                :rotate="90"
                :size="90"
                :width="12"
                :value="circularvalue"
                color="pink lighten-1"
              >
                {{ circularvalue }}%
              </v-progress-circular>
            </v-col>
            <v-col class="mt-10" cols="6">
              <v-progress-linear
                v-model="processvalue"
                height="22"
                rounded
                color="deep-purple accent-2">
                <strong class="white--text"> 累计步骤:{{ localrosobj.element.tests.length }}</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="flex justify-end">
        <!--菜单或称之为操作-->
        <v-btn depressed class="rounded-l-xl white--text" color="green accent-4" @click="saveSuite(localrosobj)">
          更新&保存
        </v-btn>
      </v-row>
      <v-list dense shaped>
        <v-list-item v-for="(item,index) in localrosobj.element.tests" :key="index" dense>
          <v-list-item-content class="py-0">
            <v-alert
              shaped
              dense
              class="my-2"
              border="left"
              icon=" mdi-file-powerpoint-box-outline"
              colored-border
              color="indigo accent-4"
              elevation="0">
              <v-row>
                <v-col cols="3">
                  <p class="text-subtitle-2 grey--text text--darken-3 mb-0 text-decoration-underline">标识</p>
                  <p class="text-caption grey--text text--darken-3 mb-0">{{ item.id }}</p>
                </v-col>
                <v-col cols="3">
                  <p class="text-subtitle-2 grey--text text--darken-3 mb-0 text-decoration-underline">名称</p>
                  <p class="text-caption grey--text text--darken-2 mb-0">{{ item.annotation.description }}</p>
                </v-col>
                <v-col cols="3">
                  <p class="text-subtitle-2 grey--text text--darken-3 mb-0 text-decoration-underline">上次更改</p>
                  <p class="text-caption grey--text text--darken-2 mb-0">{{ item.annotation.lastupdate.date }} By {{ item.annotation.lastupdate.athor }}</p>
                </v-col>
                <v-spacer />
                <v-col cols="2">
                  <v-btn icon color="pink lighten-4" depressed small class="mt-2">
                    <v-icon>mdi-file-edit-outline</v-icon>
                  </v-btn>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        color="deep-purple lighten-1"
                        depressed
                        small
                        class="mt-2"
                        v-bind="attrs"
                        @click="openCase(item)"
                        v-on="on">
                        <v-icon>mdi-play-speed</v-icon>
                      </v-btn>
                    </template>
                    <span>打开该Case</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-alert>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-alert>
    <v-snackbar v-model="snackbar.show" top>
      <p class="text-h6 ma-0">{{ snackbar.text }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar.show = false">
          <p class="text-h6 ma-0 font-weight-black">关闭</p>
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog.show"
      persistent
      max-width="480"
    >
      <v-card>
        <v-card-title class="text-h5">
          编辑
        </v-card-title>
        <v-card-text>
          <v-btn depressed disabled class="rounded-r-xl mb-5">
            <v-icon left>mdi-identifier</v-icon>
            {{ localrosobj.identify }}
          </v-btn>
          <v-text-field
            v-model="dialog.description"
            label="Description:"
            prepend-icon="mdi-tag-text-outline"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeEditDialog()"
          >关闭</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>

import { nowdate } from '../../../scripts/common'

export default {
  name: 'TestSuiteDetail',
  props: {
    rosobj: Object
  },
  data() {
    return {
      /**
       * 本地的ros 对象
       * NOTICE:
       */
      localrosobj: {},
      circularvalue: 76,
      processvalue: 112,
      // 消息条
      snackbar: {
        show: false,
        text: ''
      },
      dialog: {
        show: false,
        description: ''
      }
    }
  },
  watch: {
    rosobj: {
      immediate: true,
      handler(val) {
        if (val !== undefined && val !== null && JSON.stringify(val) !== '{}') {
          this.localrosobj = val
        }
      },
      deep: true
    }
  },

  methods: {
    /**
     * 打开case
     * @param item case对象
     */
    openCase(item) {
      // warning: 也许有问题!
      this.localrosobj = {} // 恢复初始值
      this.$emit('openCase', item)
    },
    /**
     * 关闭eidt dialog时的操作
     */
    closeEditDialog() {
      this.dialog.show = false
      this.localrosobj.annotation.description = this.dialog.description
      // notice:数据就这么直接双向绑定了~ ~
      this.localrosobj.annotation.lastupdate.date = nowdate()
      this.dialog.description = ''
    },
    /**
     * 编辑suite
     */
    editSuite() {
      // 赋值
      this.dialog = {
        description: this.localrosobj.annotation.description,
        show: true }
    },

    /**
     * 保存更新
     * @param item
     */
    saveSuite(item) {
      // todo: 更新给store
      this.snackbar = {
        show: true,
        text: 'Test Suite更新完成'
      }
    }
  }

}
</script>
