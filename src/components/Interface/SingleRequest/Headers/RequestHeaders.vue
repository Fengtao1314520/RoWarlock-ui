<template>
  <div>
    <v-card shaped outlined>
      <v-app-bar flat color="white" dense>
        <v-app-bar-nav-icon color="primary" menu />
        <v-toolbar-title class="text-h6 gray--text pl-0">
          Request Header
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu centered left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primart" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="headerdialog.isshow = true">
              <v-list-item-title>重载Raw</v-list-item-title>
            </v-list-item>
            <v-list-item @click="addHeader()">
              <v-list-item-title>新建</v-list-item-title>
            </v-list-item>
            <v-list-item @click="removeAll()">
              <v-list-item-title>删除全部</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-card-text>
        <v-row v-for="(item, index) in localheaders" :key="index" dense>
          <v-checkbox v-model="item.select" hide-details dense class="shrink mr-2 mt-2" color="green" />
          <v-col cols="4">
            <v-text-field v-model="item.key" dense color="primary">
              <template v-slot:label>
                <p class="indigo--text">Request名</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="item.value" dense color="primary">
              <template v-slot:label>
                <p class="indigo--text">Request值</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn icon color="pink" @click="deleteHeader(item, index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="headerdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">添加HeaderRaw</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-textarea v-model="headerdialog.raw" label="请复制..."></v-textarea>
          </v-container>
          <small>*HeaderRaw在添加后会自动变更为Form格式</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="headerdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="headerDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'RequestHeaders',
  components: {},
  props: {
    /**
     * 传入的header 数组
     */
    headers: Array
  },
  data() {
    return {
      /**
       * 本地header
       */
      localheaders: [],
      headerdialog: {
        isshow: false,
        raw: ''
      }
    }
  },

  watch: {
    headers: {
      immediate: true,
      handler(val) {
        this.localheaders = val
      },
      deep: true
    },
    localheaders: {
      immediate: true,
      handler(val) {
        this.$emit('on-headers-change', val) // 组件内对localheaders变更后向外部发送事件通知
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
    deleteHeader(item, index) {
      this.localheaders.splice(index, 1)
    },
    /**
     * 添加默认头
     */
    addDefaultHeader() {
      if (this.localheaders.length === 0) {
        this.addHeader()
      }
    },

    /**
     * 添加头
     */
    addHeader() {
      const temp = {
        select: true,
        key: '',
        value: '',
        type: 'text'
      }
      this.localheaders.push(temp)
    },
    /**
     * 移出所有
     */
    removeAll() {
      this.localheaders = []
      this.addDefaultHeader()
    },
    /**
     * 子组件更改header
     * 基本为form raw都使用
     */
    headerDialogSave() {
      const tempheaders = []
      if (this.headerdialog.raw !== undefined && this.headerdialog.raw !== '' && this.headerdialog.raw !== null) {
        // 解析val
        const valarray = this.headerdialog.raw.split('\n')
        valarray.forEach(element => {
          // 解析element
          const elearray = element.split(':')
          const temp = {
            select: true,
            key: elearray[0],
            value: elearray[1],
            type: 'text'
          }
          tempheaders.push(temp)
        })
      }
      // headers变更后向外部发送事件通知
      this.$emit('on-headers-change', tempheaders)

      // 关闭
      this.headerdialog.raw = ''
      this.headerdialog.isshow = false
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
