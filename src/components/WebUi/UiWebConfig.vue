<template>
  <v-card>
    <v-row>
      <v-col>
        <v-card elevation="0" outlined>
          <v-card-title>
            <v-alert
              dense
              border="left"
              color="indigo accent-4"
              dark
              class="ma-0"
            >
              {{ selectedroc.name }}
            </v-alert>
          </v-card-title>
          <v-card-text>
            <v-row class="ma-0 d-flex justify-end">
              <v-btn
                depressed
                color="indigo darken-1"
                class="white--text ma-2"
                small
                @click="addConfig()">添加</v-btn>
              <v-btn
                depressed
                color="green accent-4"
                class="ma-2"
                small
                @click="updateIntoStore()">更新</v-btn>
            </v-row>
            <v-card elevation="0">
              <v-col>
                <v-alert
                  v-for="(item, index) in selectedPageItem"
                  :key="index"
                  dense
                  rounded
                  border="left"
                  colored-border
                  color="deep-purple accent-4"
                  elevation="2"
                >
                  <v-row>
                    <v-col class="pb-0">
                      <v-text-field v-model="item.id">
                        <template v-slot:prepend>
                          <v-icon color="green accent-4">
                            mdi-identifier
                          </v-icon>
                        </template>
                        <template v-slot:label>
                          <p class="green--text text--accent-3">Id</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <v-text-field v-model="item.value">
                        <template v-slot:prepend>
                          <v-icon color="orange accent-4">
                            mdi-format-color-text
                          </v-icon>
                        </template>
                        <template v-slot:label>
                          <p class="orange--text text--accent-4">Value</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <v-text-field v-model="item.explain">
                        <template v-slot:prepend>
                          <v-icon color="blue accent-4">
                            mdi-tag-text
                          </v-icon>
                        </template>
                        <template v-slot:label>
                          <p class="blue--text text--accent-3">Explain</p>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="d-flex justify-end ma-0">
                    <v-btn
                      small
                      depressed
                      color="blue accent-4"
                      class="white--text"
                      @click="saveAndUpdate(item)"
                    >更新&保存</v-btn
                    >
                  </v-row>
                </v-alert>
              </v-col>
            </v-card>
            <v-footer padless>
              <v-col class="text-center" cols="12">
                <v-pagination
                  v-model="listconfig.page"
                  :length="listconfig.maxpage"
                  :total-visible="listconfig.visiblepage"
                  circle>
                </v-pagination>
              </v-col>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show" top>
      <p class="text-h6 ma-0">{{ snackbar.text }}</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar.show = false">
          <p class="text-h6 ma-0 font-weight-black">关闭</p>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import * as parser from 'fast-xml-parser'
import store from '../../store'
import { createGUID } from '../../scripts/internal'
import { analysisDefaultRoc } from '../../scripts/WebUi/WebConfig'
export default {
  name: 'UiWebConfig',
  props: {
    /**
     * @param {Object} configfile roc文件 对象
     */
    configfile: Object
  },
  data() {
    return {
      /* 选中的元素集,单个
      * NOTICE: REF回传至父节点
      *  */
      selectedroc: {},
      // list设置
      listconfig: {
        // 最大页, 分拆时会被更改
        maxpage: 5,
        // 当前页
        page: 1,
        // 展示数量
        visiblepage: 6,
        // 已点击选择项目下标值
        selectedItemIndex: 0,
        // 依赖于selectedroi.element的被分解ARRAY,
        spiltelementlist: []
      },
      // 消息条
      snackbar: {
        show: false,
        text: ''
      }
    }
  },

  computed: {
    /**
     * 选择的页内显示的item
     * @returns {*}
     */
    selectedPageItem() {
      return this.listconfig.spiltelementlist[this.listconfig.page - 1]
    }
  },
  watch: {
    /**
     * 被选择到roc文件变更，变更selectedrocelement
     */
    selectedroc: {
      immediate: true,
      handler(val) {
        // 解析元素
        this.splitItems(val.element)
      },
      deep: true
    },
    /**
     * 监听 props内的configfile参数
     * update 2022-02-24 E版本改为string格式了
     */
    configfile: {
      immediate: true,
      handler(val) {
        if (val !== null && val !== undefined) {
          this.propsReadRocFileFunc(val)
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 保存或更新
     * @param item 单个元素控件
     */
    saveAndUpdate(item) {
      // identify都是随机的GUID,所以都是唯一的
      const identify = item.identify
      // 1. 从下到上进行更新
      const index = this.selectedroc.element.findIndex(
        one => one.identify === identify
      )
      if (index !== -1) {
        // 标识存在
        this.selectedroc.element.splice(index, 1, item) // 替换

        this.snackbar = {
          show: true,
          text: '更新元素成功'
        }
      }
    },

    /**
     * 添加新的元素
     */
    addConfig() {
      const tempelement = {
        identify: createGUID(),
        name: '', // 名
        value: '', // 值
        explain: '' // 描述
      }
      // 添加
      this.selectedroc.element.push(tempelement)

      this.snackbar = {
        show: true,
        text: '添加元素成功'
      }
    },

    /**
     * 手动更新到前端的STORE内
     */
    updateIntoStore() {
      // console.log(this.roilist)
      store.commit('updateWebUiConfig', this.listconfig.selectedroc) // 提交更新VUEX
    },

    /**
     * 当PROPS内的files发生变化时，被调用
     * @param file
     */
    propsReadRocFileFunc(file) {
      new Promise(resolve => {
        setTimeout(() => {
          console.debug('正在处理' + file.name)
          // doc是string格式的xml,还需要解析处理
          const doc = file.doc
          this.readRocFileFunc(doc, file.name)
        }, 500)
        resolve()
      })
    },

    /**
     * 读取roc文件的func方法
     * @param {any} file roi文件
     * @param {string} name 文件名
     */
    readRocFileFunc(file, name) {
      const that = this
      // XML 读取的设置
      const options = {
        attributeNamePrefix: '', // attribute的前缀
        ignoreNameSpace: true, // 忽略命名空间
        ignoreAttributes: false // 忽略attireubte - 否
      }
      if (parser.validate(file) === true) {
        const jsonObj = parser.parse(file, options)
        that.selectedroc = analysisDefaultRoc(name, jsonObj) // 数据
      }
    },

    /**
     * 分拆
     * */
    splitItems(val) {
      if (val !== undefined) {
        // 判断如果不是数组(就没有length)，或者size没有传值，size小于1，就返回空数组
        if (
          !val.length ||
          !this.listconfig.visiblepage ||
          this.listconfig.visiblepage < 1
        ) {
          this.listconfig.spiltelementlist.push(val)
        } else {
          let [start, end] = [null, null]
          const result = []
          for (
            let i = 0;
            i < Math.ceil(val.length / this.listconfig.visiblepage);
            i++
          ) {
            start = i * this.listconfig.visiblepage
            end = start + this.listconfig.visiblepage
            result.push(val.slice(start, end))
          }
          this.listconfig.spiltelementlist = result
          this.listconfig.maxpage = this.listconfig.spiltelementlist.length
        }
      }
    }
  }
}
</script>

<style scoped></style>
