<template>
  <v-card>
    <v-row>
      <v-col cols="2">
        <v-card elevation="0" rounded>
          <p class="mb-0 ml-2 text-h6">导入文件(ROI)</p>
          <v-file-input
            v-model="fileInfo"
            class="mt-0 pt-0"
            clearable
            show-size
            truncate-length="20"
            @change="fileChange"
          />
        </v-card>
        <v-divider />
        <v-card elevation="0" outlined>
          <v-card elevation="0" rounded>
            <v-card-title>
              <v-row>
                <v-btn
                  small
                  depressed
                  class="mr-2"
                  @click="newroidialog.show = true"
                >新增</v-btn
                >
              </v-row>
            </v-card-title>
            <v-list dense link shaped>
              <v-list-group prepend-icon="mdi-function-variant" no-action>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>元素集&ROI文件</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(child, index) in roilist"
                  :key="index"
                  dense
                  link
                  shaped
                  class="pl-6"
                  @dblclick.native="openRoiFile(child)"
                >
                  <v-list-item-icon>
                    <v-icon
                      color="green accent-4"
                    >mdi-alpha-i-box-outline</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="child.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon color="indigo">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="addElement()">添加</v-list-item>
                      <v-list-item
                        @click="editroidialog.show = true"
                      >修改名称</v-list-item
                      >
                      <v-list-item @click="removeRoi()">删除</v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item>
              </v-list-group>
            </v-list>
          </v-card>
        </v-card>
      </v-col>
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
              ROI/{{ listconfig.selectedroi.name }}
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
            <v-card elevation="0">
              <v-col cols="9">
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
                    <v-col class="pb-0">
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
                    <v-col class="pb-0">
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
                  </v-row>
                  <v-row>
                    <v-col class="pt-0">
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
                  circle
                >
                </v-pagination>
              </v-col>
            </v-footer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="newroidialog.show" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          创建
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newroidialog.name"
            outlined
            label="Name:"
            prepend-icon="mdi-puzzle"
          ></v-text-field>
          <v-text-field
            v-model="newroidialog.annotation"
            outlined
            label="Annotation:"
            prepend-icon="mdi-tag-text-outline"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="newroidialog.show = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="saveNewRoiDialog()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editroidialog.show" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          编辑
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editroidialog.name"
            outlined
            label="Name:"
            prepend-icon="mdi-puzzle"
          ></v-text-field>
          <v-text-field
            v-model="editroidialog.annotation"
            outlined
            label="Annotation:"
            prepend-icon="mdi-tag-text-outline"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="editroidialog.show = false"
          >
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="editRoiDialog()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import { analysisDefaultRoi } from '../../../scripts/WebUi/WebElement'
import store from '../../../store'
import { createGUID } from '../../../scripts/internal'
export default {
  name: 'UiWebElement',
  props: {
    /**
     * @param {Array} uifile ui文件队列，以fileinfo存储,
     */
    uifile: Array
  },

  data() {
    return {
      // 文件
      fileInfo: null,
      // 元素集 完整体，每一个文件就是一个对象存入该ARRAY内
      roilist: [],
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
        // 双击被选中的元素集,单个
        selectedroi: {},
        // 依赖于selectedroi.element的被分解ARRAY,
        spiltelementlist: []
      },
      // 创建新的roi dialog
      newroidialog: {
        show: false,
        name: '', // 名
        annotation: '' // 文件描述
      },
      // 编辑roi dialog
      editroidialog: {
        show: false,
        name: '', // 名
        annotation: '' // 文件描述
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
    'listconfig.selectedroi': {
      immediate: true,
      handler(val) {
        // console.log('动了')
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
        // console.log(val)
        if (val !== null && val !== undefined && val.length > 0) {
          this.propsReadRoiFileFunc(val)
        }
      },
      deep: true
    }
  },

  methods: {
    /**
     * 文件更改,or添加文件
     */
    fileChange() {
      const that = this
      if (this.fileInfo !== null) {
        const name = this.fileInfo.name.split('.')[0] // 去除后缀
        const reader = new FileReader()
        // 回调函数
        reader.onload = function() {
          const filecontent = reader.result
          that.readRoiFileFunc(filecontent, name)
        }
        reader.readAsText(this.fileInfo) // 作为TEXT读取
      }
    },

    /**
     * 打开roi文件
     * @param element
     */
    openRoiFile(element) {
      // update: 2021-11-29 切换roi文件时，也要自动更新到vuex
      this.updateIntoStore()
      // 重置 list设置
      this.listconfig = {
        // 最大页, 分拆时会被更改
        maxpage: 5,
        // 当前页
        page: 1,
        // 展示数量
        visiblepage: 6,
        // 已点击选择项目下标值
        selectedItemIndex: 0,
        // 双击被选中的元素集,单个
        selectedroi: element,
        // 依赖于selectedroi.element的被分解ARRAY,
        spiltelementlist: []
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
    },

    /**
     * 保存或更新
     * @param item 单个元素控件
     */
    saveAndUpdate(item) {
      // identify都是随机的GUID,所以都是唯一的
      const identify = item.identify
      // 1. 从下到上进行更新
      const index = this.listconfig.selectedroi.element.findIndex(
        one => one.identify === identify
      )
      if (index !== -1) {
        // 标识存在
        this.listconfig.selectedroi.element.splice(index, 1, item) // 替换
        // 2.再更新roilist
        const rlindex = this.roilist.findIndex(
          item => item.identify === this.listconfig.selectedroi.identify
        )
        if (rlindex !== -1) {
          this.roilist.splice(rlindex, 1, this.listconfig.selectedroi) // 直接替换
          // todo 也许性能受损
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
      this.listconfig.selectedroi.element.push(tempelement)

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
     * 保存新建new roi的 dailog
     * 创建ROI
     */
    saveNewRoiDialog() {
      const temproi = {
        identify: createGUID(),
        name: this.newroidialog.name, // 名
        annotation: this.newroidialog.annotation, // 文件描述
        element: [] // 赋值元素列表
      }
      this.roilist.push(temproi)

      // 初始化
      this.newroidialog = {
        show: false,
        name: '', // 名
        annotation: '' // 文件描述
      }

      this.snackbar = {
        show: true,
        text: '新建ROI成功'
      }
    },

    /**
     * 编辑ROI 更新信息
     */
    editRoiDialog() {
      this.listconfig.selectedroi.name = this.editroidialog.name // 名
      this.listconfig.selectedroi.annotation = this.editroidialog.annotation // 描述

      // 继续更新roilist
      const index = this.roilist.findIndex(
        item => item.identify === this.listconfig.selectedroi.identify
      )
      if (index !== -1) {
        // console.log(this.roilist[index])
        this.roilist[index].name = this.editroidialog.name // 名
        this.roilist[index].annotation = this.editroidialog.annotation // 描述
      }

      // 初始化
      this.editroidialog = {
        show: false,
        name: '', // 名
        annotation: '' // 文件描述
      }
      this.snackbar = {
        show: true,
        text: '编辑ROI成功'
      }
    },
    /**
     * 删除ROI
     */
    removeRoi() {
      // 删除roilist内的
      // 继续更新roilist
      const index = this.roilist.findIndex(
        item => item.identify === this.listconfig.selectedroi.identify
      )
      if (index !== -1) {
        this.roilist.splice(index, 1) // 删除
      }
      // 重置listconfig
      this.listconfig = {
        // 最大页, 分拆时会被更改
        maxpage: 5,
        // 当前页
        page: 1,
        // 展示数量
        visiblepage: 6,
        // 已点击选择项目下标值
        selectedItemIndex: 0,
        // 双击被选中的元素集,单个
        selectedroi: {},
        // 依赖于selectedroi.element的被分解ARRAY,
        spiltelementlist: []
      }

      this.snackbar = {
        show: true,
        text: '删除ROI成功'
      }
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
        const elearray = analysisDefaultRoi(name, jsonObj) // 数据
        // 填充进入ROILIST 数组
        const index = this.roilist.findIndex(
          element => element.identify === elearray.identify
        )
        if (index === -1) {
          this.roilist.push(elearray) // 添加
        } else {
          this.roilist.splice(index, 1, elearray) // 替换
        }
      } else {
        console.log(validate)
      }
    },

    /**
     * 当PROPS内的files发生变化时，被调用
     * @param files
     */
    propsReadRoiFileFunc(files) {
      new Promise((resolve) => {
        setTimeout(() => {
          files.forEach(item => {
            // doc是string格式的xml,还需要解析处理
            const doc = (new XMLSerializer()).serializeToString(item.doc.documentElement)
            this.readRoiFileFunc(doc, item.name)
          })
        }, 500)
        resolve()
      })
    }
  }
}
</script>

<style scoped></style>
