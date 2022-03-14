<template>
  <v-card class="d-flex flex-row">
    <v-navigation-drawer :expand-on-hover="false" permanent class="d-flex pa-2 col-2">
      <div>
        <v-list dense>
          <v-list-item link>
            <v-list-item-content>
              <v-btn depressed color="pink lighten-1" dark @click="LoadParaFunc()">
                载入
              </v-btn>
              <v-btn depressed color="deep-purple accent-3" dark @click="ExportParaFunc()">
                导出
              </v-btn>
              <v-file-input v-model="selectedfile" truncate-length="15" accept="file,.json" label="导入para&func文件" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card loading outlined>
          <v-card-title>
            Para&Func
            <v-spacer></v-spacer>
            <v-btn color="primary" icon @click="newdialog.isshow = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-list dense link shaped>
            <v-list-group prepend-icon="mdi-function-variant" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Parament&Function</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, index) in localparafunc"
                :key="index"
                dense
                link
                shaped
                class="pl-6"
                @dblclick="openPackage(child)"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-package</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="child.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </div>
    </v-navigation-drawer>
    <div class="col-10">
      <v-tabs v-model="tabindex" color="blue darken-4" @change="changeTab">
        <v-tab v-for="(item, index) in activepackage" :key="index">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabindex">
        <v-tab-item v-for="(item, index) in activepackage" :key="index">
          <v-card flat>
            <package-main ref="packagemain" @close-tab="closeTab" @delete-parafunc="deleteParaFunc"></package-main>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="newdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">添加包</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="newdialog.name" label="包名" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>新增para&func包，请输入名称</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="newdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="newDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import PackageMain from '../SinglePFPackage/PackageMain.vue'
import { exportFile } from '../../../scripts/fileFunc'
import { getAllDataToServer } from '../../../scripts/craft_parafunc'
export default {
  name: 'ParaFunc',
  components: {
    PackageMain
  },
  data() {
    return {
      /**
       * 已选择的文件
       */
      selectedfile: null,
      /**
       * 新建
       * dialog
       */
      newdialog: {
        isshow: false,
        /**
         * 名称
         */
        name: ''
      },
      /**
       * 本地的parafunc
       */
      localparafunc: [],
      /**
       * 已经打开的packagetab
       */
      activepackage: [],
      /**
       * 绑定的活动tab index值
       * 默认0
       */
      tabindex: -1
    }
  },
  methods: {
    /**
     * 新建dialog关闭
     */
    newDialogSave() {
      this.$store.commit('addNewParaFuncPackage', this.newdialog)
      this.localparafunc = this.$store.state.parafunc.parafunc
      // 关闭
      this.newdialog.isshow = false
      this.newdialog.name = ''
    },
    /**
     * 双击打开包
     */
    openPackage(item) {
      const diff = this.checkStepDiff(item, this.activepackage) // 主要对比id
      if (diff !== true) {
        // 属于新增的打开步骤,添加进入到活动的步骤Array内，然后更改活动tab
        this.activepackage.push(item)
      }
    },

    /**
     * 检查两个step是否一致
     */
    checkStepDiff(stepVal, activeVal) {
      let result = false
      activeVal.forEach(element => {
        if (element.id === stepVal.id) {
          result = true
        }
      })
      return result
    },

    /**
     *更改tab时写入reqMain
     */
    changeTab(val) {
      if (val !== undefined) {
        setTimeout(() => {
          this.$refs.packagemain[val].remoteTransPackage(this.activepackage[val])
        }, 10)
      }
    },
    /**
     * 关闭tatb
     */
    closeTab() {
      this.activepackage.splice(this.tabindex, 1)
      this.tabindex - 1
    },
    /**
     *删除一个tab
     */
    deleteParaFunc() {
      // 组件内对值变更后向外部发送事件通知
      this.$store.commit('deleteParaFunc', this.activepackage[this.tabindex])
      this.closeTab()
    },
    /**
     *导入 para func
     */
    LoadParaFunc() {
      const that = this
      getAllDataToServer()
        .then(content => {
          if (content !== null) {
            // 接下来可对文件内容进行处理
            this.$store.commit('importParaFunc', {
              content: content,
              save: false
            }) // 提交
            that.localparafunc = that.$store.state.parafunc.parafunc
            console.log(that.localparafunc)
          }
        })
        .catch(() => {
          that.$buefy.toast.open({
            duration: 3000,
            message: '获取数据失败!您的个人ID没有生成',
            type: 'is-cred-2'
          })
        })
    },
    /**
     * 导出 para func
     * @constructor
     */
    ExportParaFunc() {
      const parafunc = this.$store.state.parafunc.parafunc
      const str = JSON.stringify(parafunc)
      exportFile(str, 'parafunc')
    }
  }
}
</script>

<style></style>
