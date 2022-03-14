<template>
  <div v-if="JSON.stringify(localstep) != '{}'">
    <v-row>
      <v-col></v-col>
      <v-col>
        <div class="d-flex justify-end">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="save()">
                <v-icon left>
                  mdi-content-save
                </v-icon>
                保存
              </v-list-item>
              <v-list-item @click="deleteStep()">
                <v-icon left>
                  mdi-delete-outline
                </v-icon>
                删除
              </v-list-item>
              <v-list-item @click="showdialog.isshow = true">
                <v-icon left>
                  mdi-delete-outline
                </v-icon>
                重命名
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            text
            color="pink"
            class="font-weight-black"
            @click="closeTab()"
          >
            关闭此Tab
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-select
          v-model="localstep.request.method"
          :items="methodarray"
          label="METHOD"
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="returnUrl"
          dense
          label="URL"
          clearable
          outlined
          class="font-italic font-weight-medium"
        >
        </v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn depressed color="primary" tile @click="send()">
          Send
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col class="mt-n8">
        <query-params
          :params="localstep.request.url.query"
          @on-params-change="childChangeParams"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <request-headers
          :headers="localstep.request.header"
          @on-headers-change="childChangeHeaders"
        /></v-col>
      <v-col>
        <request-body
          :bodys="localstep.request.body"
          @on-bodys-change="childChangeBodys"
        /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <response-main :res="localstep.response" />
      </v-col>
    </v-row>
    <v-overlay :value="isloading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="showdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">更改步骤名称</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="showdialog.name"
                  label="名称"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*修改步骤名称</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="dialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { METHOD, makeEemu } from '../../../scripts/internal'
import { getContentType } from '../../../scripts/craft_interface'
import { httpRemoteEntrance } from '../../../scripts/internal/httpFunc'
import QueryParams from '@/components/Interface/SingleRequest/Query/QueryParams'
import RequestHeaders from '@/components/Interface/SingleRequest/Headers/RequestHeaders'
import RequestBody from '@/components/Interface/SingleRequest/Body/RequestBody'
import ResponseMain from '@/components/Interface/SingleRequest/ResponseMain'

export default {
  name: 'RequestMain',
  components: {
    QueryParams,
    RequestBody,
    RequestHeaders,
    ResponseMain
  },

  data() {
    return {
      /**
       * 改名
       * dialog
       */
      showdialog: {
        isshow: false,
        /** 若新建suite
         * 名称
         */
        name: ''
      },
      isloading: false,
      /**
       *本地步骤
       */
      localstep: {},
      /**
       * 方法列
       */
      methodarray: []
    }
  },

  computed: {
    /**
     * 监听param然后修改url
     * 返回一个带query param的url
     */
    returnUrl: {
      // getter
      get: function() {
        let tempurl
        if (this.localstep.request.url.query.length === 0) {
          tempurl = this.localstep.request.url.raw
          return tempurl
        } else {
          tempurl = this.localstep.request.url.raw + '?'
          this.localstep.request.url.query.forEach(element => {
            if (element.name !== '' && element.value !== '') {
              if (element.select === true) {
                tempurl += element.name + '=' + element.value + '&'
              }
            }
          })
          tempurl = tempurl.slice(0, tempurl.length - 1) // 去除最后一个&符号
          return tempurl
        }
      },
      // setter
      set: function(newValue) {
        // 如果包含?字符
        if (newValue.indexOf('?') !== -1) {
          const strsplit = newValue.split('?')
          this.localstep.request.url.raw = strsplit[0] // 绑定url
          const tempparams = strsplit[1].split('&') // 解析完毕获取的params数组
          this.localstep.request.url.query = [] // 初始化query数组
          tempparams.forEach(element => {
            const kv = element.split('=') // 继续分拆
            this.localstep.request.url.query.push({
              select: true,
              name: kv[0],
              value: kv[1],
              description: ''
            })
          })
        } else {
          // 如果不包含
          this.localstep.request.url.raw = newValue
        }
      }
    }
  },

  watch: {
    /**
     * 监听单独的localstep.request.url.raw 即网址
     */
    'localstep.request.url.raw'(newVal) {
      // 初始化
      this.localstep.request.url.protocol = ''
      this.localstep.request.url.host = []
      this.localstep.request.url.port = ''
      this.localstep.request.url.path = []

      // raw修改后,需要更新host/port/path
      const tempsplit = newVal.split('/')
      for (let index = 0; index < tempsplit.length; index++) {
        const element = tempsplit[index]
        if (index === 0) {
          this.localstep.request.url.protocol = element.split(':')[0] // 更改protocol
        }
        if (index === 2) {
          const tempelesplit = element.split(':')
          // 更改path
          tempelesplit[0].split('.').forEach(sighost => {
            this.localstep.request.url.host.push(sighost)
          })
          // 更改port
          this.localstep.request.url.port = tempelesplit[1]
        }
        // 更改path
        if (index > 2) {
          this.localstep.request.url.path.push(element)
        }
      }
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    /**
     * 初始化
     * 各类值
     */
    init() {
      this.methodarray = makeEemu(METHOD)
      this.localstep = {}
    },

    /**
     * 远程传输数据
     * ref 父节点调用
     */
    remoteTransStep(step) {
      this.localstep = step
    },

    /**
     * 发送
     * NOTICE: 非!常!重!要!
     */
    send() {
      this.isloading = true
      const that = this // 定义
      const dateStart = new Date() // 获取当前时间
      httpRemoteEntrance(this.localstep)
        .then(function(res) {
          const dateEnd = new Date() // 获取当前时间
          const dateDiff = dateEnd.getTime() - dateStart.getTime() // 时间差的毫秒数
          // 成功
          const tresponse = {
            statuscode: res.statuscode,
            statustext: res.statustext,
            body: res.body,
            completeres: res,
            usetime: dateDiff,
            requestoriginuri: res.requestoriginuri,
            authority: res.authority
          }
          if (res.headers !== '') {
            tresponse.headers = JSON.parse(res.headers)
          } else {
            tresponse.headers = {}
          }
          if (res.reqheaders !== '') {
            tresponse.reqheaders = JSON.parse(res.headers)
          } else {
            tresponse.reqheaders = {}
          }
          if (res.cookies !== '') {
            tresponse.cookies = JSON.parse(res.cookies)
          } else {
            tresponse.cookies = {}
          }
          that.localstep.response = tresponse
        })
        .catch(function(err) {
          console.log(err)
          // 失败
          const dateEnd = new Date() // 获取当前时间
          const dateDiff = dateEnd.getTime() - dateStart.getTime() // 时间差的毫秒数
          const tresponse = {
            headers: undefined,
            statuscode: 'NULL',
            statustext: undefined,
            body: err.toString(),
            reqheaders: undefined,
            completeres: err,
            usetime: dateDiff
          }
          that.localstep.response = tresponse
          that.$buefy.snackbar.open({
            duration: 3000,
            message: '发送失败!请检查console!',
            type: 'is-danger',
            position: 'is-top',
            actionText: '关闭'
          })
        })
        .finally(() => {
          this.isloading = false
        })
    },

    /**
     * method被更改
     * NOTICE: 本文件使用
     */
    methodChanged(value) {
      this.localstep.request.method = value
    },

    /**
     * 子组件更新了params
     * NOTICE: 子组件更新到父组件文件使用
     */
    childChangeParams(val) {
      this.localstep.request.url.query = val
    },

    /**
     * 子组件更新了header
     * NOTICE: 子组件更新到父组件文件使用
     */
    childChangeHeaders(val) {
      this.localstep.request.header = val
    },

    /**
     * 子组件更新了body
     * NOTICE: 子组件更新到父组件文件使用
     */
    childChangeBodys(val) {
      this.localstep.request.body = val
      const connecttype = getContentType(this.localstep.request.body.mode)
      const temp = {
        select: true,
        key: 'Content-Type',
        value: connecttype,
        type: 'text'
      }
      // NOTICE: 修改headers头
      const index = this.localstep.request.header.findIndex(
        element => element.key === 'Content-Type'
      )

      if (index === -1) {
        this.localstep.request.header.push(temp) // 不存在，添加
      } else {
        if (this.localstep.request.header[index].value !== temp.value) {
          this.localstep.request.header.splice(index, 1, temp) // 删除替换
        }
      }
    },

    /**
     * 保存所有
     */
    save() {
      this.$store.commit('saveStep', this.localstep)
      this.$buefy.snackbar.open({
        duration: 3000,
        message: '保存成功!',
        type: 'is-cgreen-2',
        position: 'is-top',
        actionText: '关闭'
      })
    },

    /**
     * 删除步骤
     */
    deleteStep() {
      this.$emit('delete-step')
    },

    /**
     * 关闭此tab
     */
    closeTab() {
      this.$emit('close-tab')
    },

    /**
     * 重命名
     * dialog
     */
    dialogSave() {
      this.localstep.name = this.showdialog.name
      this.showdialog.name = ''
      this.showdialog.isshow = false
    }
  }
}
</script>

<style scoped>
.columnpadding-025 {
  padding: 0.25rem;
}

.margin-05 {
  margin: 0.5rem;
}

.margin-0 {
  margin: 0rem;
}
</style>
