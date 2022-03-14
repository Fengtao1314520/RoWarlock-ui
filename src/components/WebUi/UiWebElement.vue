<template>
  <v-card>
    <v-card elevation="0" outlined>
      <v-card-title>
        <v-alert
          dense
          border="left"
          color="indigo accent-4"
          dark
          class="ma-0"
        >
          {{ selectedroi.name }}
        </v-alert>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 d-flex justify-end">
          <v-btn
            depressed
            color="indigo darken-1"
            class="white--text ma-2"
            small
            @click="addElement()"
          >添加</v-btn
          >
          <v-btn
            depressed
            color="green accent-4"
            class="ma-2"
            small
            @click="updateIntoStore()"
          >更新</v-btn
          >
        </v-row>
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
            <v-col class="pb-0" cols="3">
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
          </v-row>
          <v-row>
            <v-col class="py-0" cols="3">
              <v-text-field v-model="item.locator">
                <template v-slot:prepend>
                  <v-icon color="deep-purple accent-4">
                    mdi-label-percent-outline
                  </v-icon>
                </template>
                <template v-slot:label>
                  <p class="deep-purple--text text--accent-4">
                    Locator
                  </p>
                </template>
              </v-text-field>
            </v-col>
            <v-col class="py-0" cols="8">
              <v-text-field v-model="item.value" label="">
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
            <v-col class="py-0" cols="1">
              <v-text-field v-model="item.index">
                <template v-slot:prepend>
                  <v-icon color="red accent-3">
                    mdi-label-percent-outline
                  </v-icon>
                </template>
                <template v-slot:label>
                  <p class="red--text text--accent-3">Index</p>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0" cols="3">
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
            <v-col>
              <v-row class="d-flex justify-end pt-4 pr-4">
                <v-btn
                  small
                  depressed
                  color="blue accent-4"
                  class="white--text"
                  @click="saveAndUpdate(item)"
                >更新&保存</v-btn>
              </v-row>
            </v-col>

          </v-row>
        </v-alert>
        <v-footer padless>
          <v-col class="text-center" cols="12">
            <v-pagination
              v-model="listconfig.page"
              :length="listconfig.maxpage"
              :total-visible="listconfig.visiblepage"
              circle
            >
            </v-pagination>
          </v-col>
        </v-footer>
      </v-card-text>
    </v-card>
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
import { analysisDefaultRoi } from '../../scripts/WebUi/WebElement'
import store from '../../store'
import { createGUID } from '../../scripts/internal'
export default {
  name: 'UiWebElement',
  props: {
    /**
     * @param {Object} uifile ui文件,对象
     */
    uifile: Object
  },

  data() {
    return {
      /*
      * 双击被选中的元素集,单个
      * NOTICE: REF回传至父节点
      */
      selectedroi: {},
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
     * 被选择到roi文件变更，变更解析
     */
    'selectedroi': {
      immediate: true,
      handler(val) {
        // 解析元素
        this.splitItems(val.element)
      },
      deep: true
    },
    /**
     * 监听 props内的uifile参数
     * TODO: 好像这边有问题，直接没法监听到更新
     */
    uifile: {
      immediate: true,
      handler(val) {
        if (val !== null && val !== undefined) {
          this.propsReadRoiFileFunc(val)
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
      const index = this.selectedroi.element.findIndex(
        one => one.identify === identify
      )
      if (index !== -1) {
        // 标识存在
        this.selectedroi.element.splice(index, 1, item) // 替换
        // 弹窗
        this.snackbar = {
          show: true,
          text: '更新元素成功'
        }
      }
    },

    /**
     * 添加新的元素
     */
    addElement() {
      const tempelement = {
        identify: createGUID(),
        name: '', // 名
        locator: 'XPath', // 定位标定
        value: '', // 值
        explain: '', // 描述
        index: 0 // 默认0
      }
      // 添加
      this.selectedroi.element.push(tempelement)
      // 弹窗
      this.snackbar = {
        show: true,
        text: '添加元素成功'
      }
    },

    /**
     * 手动更新到前端的STORE内
     */
    updateIntoStore() {
      // todo 好像保存有问题???
      store.commit('updateWebUiElement', this.listconfig.selectedroi) // 提交更新VUEX
    },

    /**
     * 当PROPS内的files发生变化时，被调用
     * @param file 文件
     */
    propsReadRoiFileFunc(file) {
      new Promise((resolve) => {
        setTimeout(() => {
          // doc是string格式的xml,还需要解析处理
          const doc = file.doc
          this.readRoiFileFunc(doc, file.name)
        }, 500)
        resolve()
      })
    },

    /**
     * 读取roi文件的func方法
     * @param {any} file roi文件
     * @param {string} name 文件名
     */
    readRoiFileFunc(file, name) {
      // XML 读取的设置
      const options = {
        attributeNamePrefix: '', // attribute的前缀
        ignoreNameSpace: true, // 忽略命名空间
        ignoreAttributes: false // 忽略attireubte - 否
      }
      const validate = parser.validate(file) // 验证XML是否符合合规
      if (validate === true) {
        const jsonObj = parser.parse(file, options) // 解析
        this.selectedroi = analysisDefaultRoi(name, jsonObj) // 数据
      } else {
        console.log(validate)
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
