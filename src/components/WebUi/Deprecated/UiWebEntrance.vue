<template>
  <div>
    <v-card>
      <v-card-text class="pa-1">
        <v-card>
          <v-banner color="amber accent-4" single-line>
            <v-row class="ma-0">
              <v-col class="mt-2" cols="2">
                <v-btn depressed disabled class="text-h5 rounded-r-xl">
                  <v-icon left>
                    mdi-fast-forward
                  </v-icon>
                  极速模式
                </v-btn>
              </v-col>
              <v-spacer />
              <v-col cols="3" class="py-1">
                <v-file-input
                  v-model="fileInfos"
                  show-size
                  webkitdirectory
                  multiple
                  class="mt-0 pt-0"
                  clearable
                  dense
                  truncate-length="20"
                  @change="fileChange"
                >
                </v-file-input>
                <p class="mb-0 text-caption">
                  根据ROS文件执行和导入依赖的ROC/ROI文件,请选取根目录
                </p>
              </v-col>
            </v-row>
          </v-banner>
          <v-row class="pa-4" justify="space-between">
            <v-col cols="3">
              <v-card
                v-scroll.self="onScroll"
                class="overflow-y-auto"
                max-height="600"
                elevation="0"
              >
                <v-treeview
                  rounded
                  activatable
                  return-object
                  open-on-click
                  dense
                  :items="leftfilesitems"
                  item-key="name"
                  color="warning"
                  :open.sync="open"
                  :active.sync="active"
                >
                </v-treeview>
              </v-card>
            </v-col>
            <v-divider vertical />
            <v-col class="d-flex text-center">
              <v-skeleton-loader
                v-if="leftfilesitems.length <= 0"
                type="article, actions" />
              <v-row v-if="leftfilesitems.length > 0">
                <v-col>
                  <v-card elevation="0">
                    <v-row dense>
                      <v-col>
                        <v-card elevation="3" shaped>
                          <v-card-title>
                            <v-row>
                              <v-col class="pt-0 d-flex justify-start">
                                <p class="my-2">详细信息:</p>
                              </v-col>
                              <v-col class="pt-0">
                                <v-row class="ma-0 d-flex justify-end">
                                  <v-btn
                                    depressed
                                    small
                                    color="blue accent-3"
                                    class="ma-2 white--text"
                                    @click="readRosDependent()">读取依赖</v-btn>
                                  <v-btn
                                    depressed
                                    small
                                    color="grey lighten-1"
                                    class="ma-2"
                                    @click="showcode = true">预览代码</v-btn>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card-title>
                          <v-card-text>
                            <v-row dense>
                              <v-col cols="2">
                                <p class="mt-3 text-left">文件名:</p>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  class="text-left"
                                  disabled
                                  dense
                                  :value="selectfileitem.name"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col cols="2">
                                <p class="mt-3 text-left">文件路径:</p>
                              </v-col>
                              <v-col>
                                <v-text-field
                                  class="text-left"
                                  disabled
                                  dense
                                  :value="selectfileitem.filepath"></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row dense>
                              <v-col>
                                <p class="my-0 text-left text-caption red--text">
                                  注意:导入和读取依赖时，前置需用户全载入对应文件!
                                </p>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                      <v-col>
                        <v-card elevation="3" shaped>
                          <v-card-title>操作:</v-card-title>
                          <v-card-text>
                            <v-row class="ma-0 d-flex justify-end">
                              <v-btn
                                depressed
                                :disabled="!loadedselectitem"
                                color="pink lighten-2"
                                class="ma-2 white--text"
                                @click="showcode = true">编辑脚本</v-btn>
                              <v-btn
                                depressed
                                :disabled="!loadedselectitem"
                                color="yellow darken-2"
                                class="ma-2 white--text"
                                @click="showcode = true">编辑元素集</v-btn>
                              <v-btn
                                depressed
                                :disabled="!loadedselectitem"
                                color="deep-purple darken-2"
                                class="ma-2 white--text"
                                @click="showcode = true">编辑参数集</v-btn>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showcode" persistent max-width="800">
      <v-card>
        <!-- 使用双向绑定修饰符 -->
        <v-btn
          class="ma-2"
          color="success"
          @click="showcode = false"
        >关闭</v-btn
        >
        <mavon-editor
          style="min-width: 600px"
          codeStyle="atom-one-dark"
          :value="itemdocstr"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
        ></mavon-editor>
        <v-btn
          class="ma-2"
          color="success"
          @click="showcode = false"
        >关闭</v-btn
        >
      </v-card>
    </v-dialog>
    <v-snackbar
      timeout="3000"
      :value="showsnackbar.show"
      absolute
      centered
      top
      color="deep-purple accent-4"
      elevation="24"
    >
      <strong class="white--text">{{ showsnackbar.text }}</strong>
    </v-snackbar>
  </div>
</template>

<script>
import { readFile } from '../../../scripts/WebUi/WebEntrance'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { analysisDefaultRos } from '../../../scripts/WebUi/WebScript'

export default {
  name: 'UiWebEntrance',
  components: {
    mavonEditor
  },
  data() {
    return {
      // 极速模式下的选择的多个文件,默认初始的
      fileInfos: [],
      // 初始默认的文件列表
      defaultfilesitems: [],
      // 极速模式下的选择的多个文件,文件夹的结构
      leftfilesitems: [],
      // 已选择的roX文件
      selectfileitem: {},
      active: [],
      open: [],
      // 富文本编辑器使用的value string类型
      itemdocstr: '',
      // 代码展示dialog
      showcode: false,
      // todo 只有ros才可以这样,读取已选择项目的依赖，
      loadedselectitem: false,
      // 消息条
      showsnackbar: {
        show: false,
        text: ''
      }
    }
  },
  computed: {},
  watch: {
    active: {
      immediate: false,
      handler(val) {
        // 标准的roX格式文件
        if (val[0].filepath.toString().includes('.ro')) {
          this.selectfileitem = val[0]
          const temp = new XMLSerializer().serializeToString(
            this.selectfileitem.doc.documentElement
          )
          this.itemdocstr = '```xml\n' + temp + '\n' + '```'
        }
      },
      deep: true
    }
  },
  methods: {

    /**
     * 极速模式下，Get整个ROS和对应的依赖ROC/ROI
     * 读取文件夹
     */
    fileChange() {
      if (this.fileInfos.length > 0) {
        const waitpromise = new Promise(resolve => {
          // 空白临时列表
          const templist = []
          this.defaultfilesitems = []
          // 绑定的已选择所有的文件进行分拆处理
          this.fileInfos.forEach(fileinfo => {
            // 读取文件
            readFile(fileinfo)
              .then(result => {
                templist.push(result)
              })
              .catch(() => {
                console.log('fileChange->readFile 出错了')
              })
          })
          resolve(templist)
        })
        // promise完毕后，进行筛选操作
        waitpromise.then(templist => {
          // update 2022-01-20 在最终或者说promise完毕后，释放的数据才是正确的
          this.defaultfilesitems = templist
          this.assistPathToMapTree(this.defaultfilesitems).then(result => {
            setTimeout(() => {
              this.leftfilesitems = result[0].children
            }, 1000)
          })
        })
      }
    },

    /**
     * 读取依赖
     */
    readRosDependent() {
      // 使用 this.selectfileitem.doc.documentElement
      const temp = new XMLSerializer().serializeToString(
        this.selectfileitem.doc.documentElement
      )
      const parser = new DOMParser()
      const doc = parser.parseFromString(temp, 'application/xml')
      /* update 2022-01-10 完成, 正常读取*/
      const ros = analysisDefaultRos(this.selectfileitem.name, doc) // 解析ros
      this.$emit('changescriptfile', ros) // 单一提交
      /**
       * 包含了 roi和roc两部分的内容，
       * 需要直接给定到UiWebElement,UiWebConfig
       * 借用两个组件，实现组件的复用
      {imports: [], properties: []}
       */
      /** @type {Array}*/
      const srcimports = ros.element.testconfig.imports
      /** @type {Array}*/
      const srcproperties = ros.element.testconfig.properties

      if (srcimports.length > 0) {
        // 只有长度大于0，才执行,读取roi文件
        this.readDependentRoi(srcimports)
          .then(roilists => {
            this.$emit('changeuifile', roilists) // 单一提交
            if (srcproperties.length > 0) {
              // 只有长度大于0，才执行,读取roc文件
              this.readDependentRoc(srcproperties).then(roclists => {
                this.$emit('changeconfigfile', roclists) // 单一提交
              })
            }
          })
          .finally(() => {
            this.showsnackbar.text = '已完成ROI/ROC导入'
            this.showsnackbar.show = true
          })
      }
    },

    /**
     *读取依赖 ROI文件列表
     * @param srcimports
     */
    readDependentRoi(srcimports) {
      // 树结构
      const templist = []
      return new Promise(resolve => {
        setTimeout(() => {
          srcimports.forEach(item => {
            /* update 2022-01-10 要根据name/filepath进行对比获得doc*/
            const name = item.id // 文件名
            // fixed: 这里有个issue，Line:264内已解决,对this的赋值也要放到then里面
            const ffile = this.defaultfilesitems.find(
              dfiitem => dfiitem.name === name
            )
            // 说明找到了
            if (ffile !== undefined) {
              templist.push(ffile)
            } else {
              console.log('读取roi的依赖失败')
            }
          })
        }, 1000)
        resolve(templist)
      })
    },

    /**
     *读取依赖 ROC文件列表
     * @param srcproperties
     */
    readDependentRoc(srcproperties) {
      // 树结构
      const templist = []
      return new Promise(resolve => {
        setTimeout(() => {
          srcproperties.forEach(item => {
            const name = item.id // 文件名
            // fixed: 这里有个issue，Line:264内已解决,对this的赋值也要放到then里面
            const ffile = this.defaultfilesitems.find(
              dfiitem => dfiitem.name === name
            )
            // 说明找到了
            if (ffile !== undefined) {
              templist.push(ffile)
            } else {
              console.log('读取roc的依赖失败')
            }
          })
        }, 1000)
        resolve(templist)
      })
    },

    /**
     *  解析list内的文件路径转为一个maptree，树结构
     * @param {Array} lists 单个文件的对应所有信息
     */
    assistPathToMapTree(lists) {
      // 树结构
      const tree = []
      return new Promise(resolve => {
        // single 为单个文件,对单个文件进行归档至一个文件夹的treeview内
        setTimeout(() => {
          lists.forEach(single => {
            const path = single.filepathlist // 给定路径的list sample->['mtstar','ui','ros']
            let currentLevel = tree
            for (let j = 0; j < path.length; j++) {
              const part = path[j] // sample->'mtstar'
              const existingPath = this.findWhere(currentLevel, 'name', part)
              if (existingPath) {
                // 如果已存在，则复制为子节点
                currentLevel = existingPath.children
              } else {
                // 如果不存在，创建为一个根节点
                const newPart = {
                  ftype: 'folder',
                  identify: single.identify,
                  name: part,
                  icon: ' mdi-folder-settings-outline',
                  children: []
                }
                // UPDATE 2022-01-04 包含'.'的则为子节点内的内容
                if (part.includes('.')) {
                  newPart.filepath = single.filepath
                  newPart.doc = single.doc
                  newPart.icon = 'mdi-code-greater-than-or-equal'
                  newPart.ftype = 'file'
                }
                currentLevel.push(newPart)
                currentLevel = newPart.children
              }
            }
          })
        }, 1000)
        resolve(tree)
      })
    },

    /**
     * 检索
     * @param array
     * @param key
     * @param value
     * @returns {boolean|*}
     */
    findWhere(array, key, value) {
      // t is used as a counter
      let t = 0
      // find the index where the id is the as the aValue
      while (t < array.length && array[t][key] !== value) {
        t++
      }
      if (t < array.length) {
        return array[t]
      } else {
        return false
      }
    },

    /**
     * 滚动条绑定事件,其实没有什么用,但又不能不要
     */
    onScroll() {}
  }
}
</script>

<style scoped></style>
