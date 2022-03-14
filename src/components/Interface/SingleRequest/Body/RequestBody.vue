<template>
  <div>
    <v-card outlined rounded="tr-xl bl-xl">
      <v-app-bar flat color="white" dense>
        <v-app-bar-nav-icon color="primary" menu />
        <v-toolbar-title class="text-h6 gray--text pl-0">
          Request Body
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col class="d-flex mt-3" cols="3">
          <v-select :items="modeseleteitem" label="表单格式:" single-line @input="selectBodyType" />
        </v-col>
        <v-menu centered left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primart" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="bodydialog.isshow = true">
              <v-list-item-title>表单输入</v-list-item-title>
            </v-list-item>
            <v-list-item @click="addBody()">
              <v-list-item-title>新建</v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeAll()">
              <v-list-item-title>删除全部</v-list-item-title>
            </v-list-item>
            <v-list-item @click="bodyrawdialog.isshow = true">
              <v-list-item-title>Raw输入</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-card-text>
        <v-row v-for="(item, index) in localbodys.formbody" :key="index" dense>
          <v-checkbox v-model="item.select" hide-details dense class="shrink mr-2 mt-2" color="green" />
          <v-col cols="4">
            <v-text-field v-model="item.key" dense color="primary">
              <template v-slot:label>
                <p class="indigo--text">Body名</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="item.value" dense color="primary">
              <template v-slot:label>
                <p class="indigo--text">Body值</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn icon color="pink" @click="deleteBody(item, index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="bodydialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">格式化FORM数据</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-textarea v-model="bodydialog.raw" label="请复制..."></v-textarea>
          </v-container>
          <small>一键复制文本类型的formbody数据, 进行格式化</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="bodydialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="bodyDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="bodyrawdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">RAW格式类型BODY数据</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-select :items="moderawseleteitem" label="表单格式:" single-line @input="selectBodyType" />
            <vue-json-editor
              v-model="bodyrawdialog.raw"
              :mode="'code'"
              :show-btns="false"
              :expandedOnStart="true"
            ></vue-json-editor>
          </v-container>
          <small>*BodyRaw是指非form-data/x-www-formurlencoded格式的JSON/TEXT以及其他内容</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="bodyrawdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="bodyRawDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { BODYMODE } from '../../../../scripts/internal'
import vueJsonEditor from 'vue-json-editor'
export default {
  name: 'RequestBody',
  components: {
    vueJsonEditor
  },
  props: {
    /**
     * 传入的 bodys对象
     *
     */
    bodys: Object
  },
  data() {
    return {
      /**
       * body格式类型
       */
      bodymode: '',
      /**
       * 本地body
       */
      localbodys: {},
      /**
       * dialog使用
       */
      bodydialog: {
        isshow: false,
        raw: ''
      },
      /**
       * dialog raw 使用
       */
      bodyrawdialog: {
        isshow: false,
        raw: {}
      },
      modeseleteitem: ['formdata', 'urlencoded'],
      moderawseleteitem: ['Text', 'JSON', 'XML', 'HTML']
    }
  },
  watch: {
    bodys: {
      immediate: true,
      handler(val) {
        this.localbodys = val
        if (val.mode === BODYMODE.FORMDATA || val.mode === BODYMODE.URLENCODED) {
          this.bodymode = 'Form'
        } else {
          this.bodymode = 'Raw'
        }
      },
      deep: true
    },
    localbodys: {
      immediate: true,
      handler(val) {
        this.$emit('on-bodys-change', val) // 组件内对localbodys变更后向外部发送事件通知
      },
      deep: true
    }
  },
  methods: {
    /**
     *删除一个request header
     * @param {*} item 删除对象
     * @param {*} index 删除下标值
     */
    deleteBody(item, index) {
      this.localbodys.formbody.splice(index, 1)
    },

    /**
     * 添加默认头
     */
    addDefaultBody() {
      if (this.localbodys.formbody.length === 0) {
        this.addBody()
      }
    },

    /**
     * 添加头
     */
    addBody() {
      const temp = {
        select: true,
        key: '',
        value: '',
        type: 'text'
      }
      this.localbodys.formbody.push(temp)
    },

    /**
     * 移出所有
     */
    removeAll() {
      this.localbodys.formbody = []
      this.addDefaultBody()
    },
    /**
     * 选择模式
     */
    selectBodyType(item) {
      this.localbodys.mode = item
    },
    /**
     * 子组件更改form 类型的body
     * 基本为form raw都使用
     */
    bodyDialogSave() {
      const tempbodys = []
      if (this.bodydialog.raw !== undefined && this.bodydialog.raw !== '' && this.bodydialog.raw !== null) {
        // 解析val
        const valarray = this.bodydialog.raw.split('&')
        valarray.forEach(element => {
          // 解析element
          const elearray = element.split('=')
          const temp = {
            select: true,
            key: elearray[0],
            value: elearray[1],
            type: 'text'
          }
          tempbodys.push(temp)
        })
      }
      // 更改本地事件
      this.localbodys.formbody = tempbodys

      // 关闭
      this.bodydialog.raw = ''
      this.bodydialog.isshow = false
    },
    /**
     * 子组件更改form 类型的body
     * 基本为form raw都使用
     */
    bodyRawDialogSave() {
      this.localbodys.raw = JSON.stringify(this.bodyrawdialog.raw)
      // 关闭
      this.bodyrawdialog.raw = {}
      this.bodyrawdialog.isshow = false
    }
  }
}
</script>

<style scoped>
.padding-0 {
  padding: 0rem;
}

.margin-05 {
  margin: 0.5rem;
}

.card-header-title {
  padding: 0rem 0rem 0rem 1rem;
}

.card-content {
  padding: 0.75rem 1rem 0.5rem 2rem;
}
</style>
