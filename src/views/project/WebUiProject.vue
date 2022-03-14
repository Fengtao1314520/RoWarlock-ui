<template>
  <div>
    <v-row>
      <v-col cols="2">
        <!--左侧菜单导航-->
        <v-navigation-drawer absolute permanent>
          <template v-slot:prepend>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>项目管理</v-list-item-title>
                <v-list-item-subtitle>
                  <v-row>
                    <v-col class="pb-0">
                      <p class="mb-0 mt-2">
                        <span class="text-overline font-italic">项目:</span>
                        {{ leftmenuinfo.selectedproject.name }}
                      </p>
                    </v-col>
                    <v-spacer />
                    <v-col class="pb-0 d-flex justify-end">
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon color="indigo" v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(item, index) in leftmenuinfo.projectmenulist"
                            :key="index"
                            @click="handleLeftMenuClick(index)"
                          >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <v-btn icon depressed color="deep-purple" @click="leftmenuinfo.bottomdialog.isshow = true">
                        <v-icon>mdi-cloud-search</v-icon>
                      </v-btn>
                      <v-btn fab dark depressed x-small color="green accent-4" @click="overlay = true">
                        <v-icon>mdi-content-save-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider class="my-2" />
          <v-card v-for="(parent, index) in leftmenuinfo.functionmenulist" :key="index" elevation="0">
            <v-app-bar
              color="indigo lighten-1"
              dense
              dark
              elevation="0"
              class="mb-2">
              <v-icon>{{ parent.icon }}</v-icon>
              <v-toolbar-title>{{ parent.name }}</v-toolbar-title>
            </v-app-bar>
            <v-list-item v-for="(pchild, jndex) in parent.children" :key="jndex">
              <v-list-item-avatar>
                <v-icon color="orange accent-4">{{ pchild.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="pchild.name" />
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-btn icon>
                    <v-icon color="indigo accent-4" small @click="openParentFolder(pchild)">mdi-openid</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon color="purple accent-4" small>mdi-arrow-left</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-card>
          <input ref="uploader" webkitdirectory class="d-none" type="file" @change="onFilesUpload" />
        </v-navigation-drawer>
      </v-col>
      <v-col v-if="selectfile !== undefined && selectfile !== null && JSON.stringify(selectfile) !== '{}'">
        <!--右侧选择展示区域-->
        <ui-web-config v-if="selectfile.filetype === 'roc'" ref="webconfig" :configfile="selectfile.file" />
        <ui-web-element v-if="selectfile.filetype === 'roi'" ref="webelement" :uifile="selectfile.file" />
        <ui-web-script v-if="selectfile.filetype === 'ros'" ref="webscript" :scriptfile="selectfile.file" />
      </v-col>
      <v-col v-else>
        <ui-web-entrance :nodeitem="leftmenuinfo.selectchilditem"></ui-web-entrance>
      </v-col>
    </v-row>
    <v-dialog v-model="leftmenuinfo.bottomdialog.isshow" persistent width="400" height="800">
      <v-card>
        <v-btn
          class="mt-2 ml-2"
          text
          color="error"
          @click="leftmenuinfo.bottomdialog.isshow = !leftmenuinfo.bottomdialog.isshow"
        >
          关闭
        </v-btn>
        <v-row class="ma-0">
          <v-col cols="3" class="mr-4">
            <v-btn
              small
              depressed
              color="blue accent-4"
              class="white--text"
              @click="leftmenuinfo.bottomdialog.createnew = true"
            >
              <v-icon left>mdi-plus</v-icon>
              新建项目
            </v-btn>
          </v-col>
          <v-col>
            <v-card v-scroll.self="onScroll" class="overflow-y-auto" elevation="0" max-height="400">
              <v-card v-if="leftmenuinfo.bottomdialog.createnew === true" elevation="0" class="mt-4 mx-2">
                <v-text-field v-model="leftmenuinfo.bottomdialog.newprojectname" dense label="项目名称:"></v-text-field>
                <v-select
                  v-model="leftmenuinfo.bottomdialog.selectprojecttype"
                  dense
                  :items="leftmenuinfo.bottomdialog.projecttype"
                  label="项目类型:"
                ></v-select>
                <v-footer class="d-flex justify-end" elevation="0" color="primary lighten-2">
                  <v-btn depressed x-small text class="white--text" @click="createNewProject">添加</v-btn>
                </v-footer>
              </v-card>
              <v-list shaped>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(item, i) in allprojects" :key="i" @click="changeSelectProject(item)">
                    <v-list-item-content>
                      <v-row>
                        <v-btn text disabled>
                          <v-icon left>mdi-projector</v-icon>
                          {{ item.name }}
                        </v-btn>
                        <p class="font-italic text-caption mb-0 pt-2 indigo--text text-decoration-underline">
                          {{ item.description }}
                        </p>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="leftmenuinfo.finalsnackbar" multi-line top>
      <p class="text-subtitle-1">项目保存完成</p>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="leftmenuinfo.finalsnackbar = false">CLOSE</v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="createitemdialog.show" persistent max-width="300">
      <v-card outlined elevation="0">
        <v-card-title class="indigo white--text">创建</v-card-title>
        <v-card-text class="pt-4">
          <v-select
            v-model="createitemdialog.attribute"
            :items="createitemdialog.fileattribute"
            label="文件属性"
            dense
          ></v-select>
          <v-select
            v-model="createitemdialog.type"
            :items="createitemdialog.filetype"
            label="文件类型"
            dense
          ></v-select>
          <v-text-field v-model="createitemdialog.name" dense label="Name:"></v-text-field>
          <v-text-field v-model="createitemdialog.description" dense label="Description:"></v-text-field>
          <v-card-actions class="d-flex justify-end">
            <v-btn depressed color="green accent-3 white--text" @click="afterCreateNewItem()">保存</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { assistPathToMapTree, readFile } from '../../scripts/WebUi/WebEntrance'
import ChildListItem from './childcomp/ChildListItem'
import UiWebConfig from '../../components/WebUi/UiWebConfig'
import UiWebElement from '../../components/WebUi/UiWebElement'
import UiWebScript from '../../components/WebUi/UiWebScript'
import { createGUID } from '../../scripts/internal'
import { exportFile } from '../../scripts/fileFunc'
import UiWebEntrance from '../../components/WebUi/UiWebEntrance'
export default {
  name: 'WebUiProject',
  components: { UiWebEntrance, UiWebScript, UiWebElement, UiWebConfig, ChildListItem },
  data() {
    return {
      // 所有项目
      allprojects: [
        { identify: '', name: 'DEMO 1', description: 'by Nate 1', type: '' },
        { identify: '', name: 'DEMO 2', description: 'by Nate 2', type: '' },
        { identify: '', name: 'DEMO 3', description: 'by Nate 3', type: '' },
        { identify: '', name: 'DEMO 4', description: 'by Nate 4', type: '' },
        { identify: '', name: 'DEMO 5', description: 'by Nate 5', type: '' },
        { identify: '', name: 'DEMO 6', description: 'by Nate 6', type: '' },
        { identify: '', name: 'DEMO 7', description: 'by Nate 7', type: '' }
      ],
      /**
       * 左侧菜单项目信息
       */
      leftmenuinfo: {
        /**
         * 默认选择项目
         */
        selectedproject: { identify: '', name: 'DEMO', description: 'by Nate' },
        /**
         * 菜单项目
         */
        projectmenulist: [
          {
            title: '编辑',
            click() {}
          },
          {
            title: '删除',
            click() {}
          },
          {
            title: '新建',
            click() {
              this.beforeCreateNewItem()
            }
          },
          {
            title: '导入',
            click() {
              this.importFiles()
            }
          },
          {
            title: '导出',
            click() {
              this.exportFiles()
            }
          }
        ],
        /**
         * 新建dialog的弹窗设置
         */
        bottomdialog: {
          isshow: false,
          /**
           * 创建新的
           */
          createnew: false,
          newprojectname: '',
          projecttype: ['WebUI', 'PCUI', 'AppUI', 'Http Interface'],
          selectprojecttype: ''
        },
        /**
         * 下方菜单项目
         * important:直接保存这个
         */
        functionmenulist: [
          {
            filetype: 'ros',
            icon: 'mdi-language-typescript',
            name: '测试脚本集',
            children: []
          },
          {
            filetype: 'roi',
            icon: 'mdi-search-web',
            name: '测试元素集',
            children: []
          },
          {
            filetype: 'roc',
            icon: 'mdi-tune',
            name: '测试参数集',
            children: []
          }
        ],
        /**
         * 最终结果展示
         * snackbar
         */
        finalsnackbar: false,
        /**
         * 分类后，点击打开按钮时选择的子item
         */
        selectchilditem: {}
      },
      /**
       * 导入文件时使用
       * */
      isSelecting: false,
      /**
       * 展示在右侧区域的已选择的文件
       */
      selectfile: {},
      /**
       * 遮罩层 显示
       */
      overlay: false,
      /**
       * 创建新的item弹出框
       */
      createitemdialog: {
        fileattribute: ['file', 'folder'],
        filetype: ['脚本集(ROS)', '元素集(ROI)', '参数集(ROC)'],
        show: false,
        name: '',
        description: '',
        attribute: '',
        type: '',
        index: -1
      }
    }
  },
  watch: {
    // 监听选择的项目
    'leftmenuinfo.selectedproject': {
      immediate: true,
      handler(val) {
        // TODO 选择的项目被更改后，应该主动取获取项目内的数据，并重新生成对应的功能列内的内容
        // console.log(val)
      },
      deep: true
    },
    overlay(val) {
      val &&
      setTimeout(() => {
        this.saveAllInfosByProject()
        this.overlay = false
        // this.leftmenuinfo.finaldialog = false
      }, 3000)
    }
  },
  methods: {
    /**
     * 打开菜单ICON
     * @param index
     */
    handleLeftMenuClick(index) {
      this.leftmenuinfo.projectmenulist[index].click.call(this)
    },

    /**
     * 创建新的项目
     */
    createNewProject() {
      const tempproejct = {
        identify: createGUID(),
        name: this.leftmenuinfo.bottomdialog.newprojectname,
        description: '',
        type: this.leftmenuinfo.bottomdialog.selectprojecttype
      }
      const tempindex = this.allprojects.findIndex(item => item.identify === tempproejct.identify)
      if (tempindex === -1) {
        this.allprojects.push(tempproejct) // 添加
      } else {
        this.allprojects.splice(tempindex, 1, tempproejct) // 更新
      }
      // 恢复默认值
      this.leftmenuinfo.bottomdialog.createnew = false
      this.leftmenuinfo.bottomdialog.selectprojecttype = ''
      this.leftmenuinfo.bottomdialog.newprojectname = ''
    },

    /**
     * 更改选择的项目
     * UPDATE:2022-03-07 这边最好是切换项目时可以保存对应所有的信息
     * @param item
     */
    changeSelectProject(item) {
      this.leftmenuinfo.selectedproject = item
      this.leftmenuinfo.bottomdialog.isshow = !this.leftmenuinfo.bottomdialog.isshow
      /**
       * 下方菜单项目清空
       */
      this.selectfile = {}
      // console.log(this.functionmenulist)
      this.leftmenuinfo.functionmenulist[0].children = []
      this.leftmenuinfo.functionmenulist[1].children = []
      this.leftmenuinfo.functionmenulist[2].children = []
    },

    /**
     * 滚动条绑定事件,其实没有什么用,但又不能不要
     */
    onScroll() {},

    /**
     * 导入文件
     */
    importFiles() {
      // 借用一个INPUT进行文件夹的上传
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      // Trigger click on the FileInput
      this.$refs.uploader.click()
    },

    /**
     * 导出文件
     */
    exportFiles() {
      const tempallinfo = this.saveAllInfosByProject()
      exportFile(JSON.stringify(tempallinfo), this.leftmenuinfo.selectedproject.name)
      // this.leftmenuinfo.finaldialog = true
    },

    /**
     * 真导入文件功能
     * @param e
     */
    onFilesUpload(e) {
      const fileInfos = e.target.files
      const waitpromise = new Promise(resolve => {
        // 空白临时列表
        const templist = []
        // 绑定的已选择所有的文件进行分拆处理
        fileInfos.forEach(fileinfo => {
          // 读取文件
          readFile(fileinfo)
            .then(result => {
              templist.push(result)
            })
            .catch(() => {
              console.log('读取onFilesUpload出错了')
            })
        })
        resolve(templist)
      })
      // promise完毕后，进行筛选操作
      waitpromise.then(templist => {
        /**
         * update 2022-01-20 在最终或者说promise完毕后，释放的数据才是正确
         * update 2022-01-28 这里返回的值，需要根据不同的文件类型分拆给不同的文件夹
         **/
        assistPathToMapTree(templist).then(result => {
          setTimeout(() => {
            const defresult = result[0].children
            // debug
            const UIMapsIndex = defresult.findIndex(item => item.name === 'UIMaps')
            const ScriptsIndex = defresult.findIndex(item => item.name === 'Scripts')
            const ConfigIndex = defresult.findIndex(item => item.name === 'Config')
            if (UIMapsIndex !== -1) {
              const roiindex = this.leftmenuinfo.functionmenulist.findIndex(item => item.filetype === 'roi')
              this.leftmenuinfo.functionmenulist[roiindex].children = defresult[UIMapsIndex].children
            }
            if (ScriptsIndex !== -1) {
              const rosindex = this.leftmenuinfo.functionmenulist.findIndex(item => item.filetype === 'ros')
              this.leftmenuinfo.functionmenulist[rosindex].children = defresult[ScriptsIndex].children
            }
            if (ConfigIndex !== -1) {
              const rocindex = this.leftmenuinfo.functionmenulist.findIndex(item => item.filetype === 'roc')
              this.leftmenuinfo.functionmenulist[rocindex].children = defresult[ConfigIndex].children
            }
            // NOTICE: 已经根据不同类型进行分拆和处理了，但现在我完全看不懂 (─.─|||
            console.log(this.leftmenuinfo.functionmenulist)
          }, 1000)
        })
      })
    },

    /**
     * 子节点赋给父节点，打开roc/roi/ros文件
     * @param childitem
     */
    openFileItem(childitem) {
      setTimeout(() => {
        if (childitem.name.endsWith('.roc')) {
          this.selectfile = {
            file: childitem,
            filetype: 'roc'
          }
        } else if (childitem.name.endsWith('.roi')) {
          this.selectfile = {
            file: childitem,
            filetype: 'roi'
          }
        } else if (childitem.name.endsWith('.ros')) {
          this.selectfile = {
            file: childitem,
            filetype: 'ros'
          }
        }
      }, 200)
    },

    /**
     * 基于项目保存所有信息
     * NOTICE: 虽然在理论中，个人的项目是私有性质，且不同的项目应该保存不同的数据，但实际操作中，可能一个人存有不同的项目进行测试或执行
     */
    saveAllInfosByProject() {
      // 默认项目信息
      const tempallinfo = {
        project: this.leftmenuinfo.selectedproject,
        serialize: this.leftmenuinfo.functionmenulist
      }
      console.log(tempallinfo)
      this.leftmenuinfo.finalsnackbar = true
      // TODO: vuex store内保存
      return tempallinfo
    },

    /**
     * 新建ITEM
     * BEFORE
     */
    beforeCreateNewItem() {
      this.createitemdialog.show = true
    },

    /**
     * 新建ITEM
     * BEFORE
     */
    afterCreateNewItem() {
      let icon

      if (this.createitemdialog.attribute === 'folder') {
        icon = 'mdi-folder-settings-outline'
      } else {
        icon = 'mdi-code-greater-than-or-equal'
      }
      if (this.createitemdialog.type === '脚本集(ROS)') {
        this.createitemdialog.index = 0
      } else if (this.createitemdialog.type === '元素集(ROI)') {
        this.createitemdialog.index = 1
      } else {
        this.createitemdialog.index = 2
      }

      // 创建
      const tempitem = {
        ftype: this.createitemdialog.attribute,
        identify: createGUID(),
        name: this.createitemdialog.name,
        icon: icon,
        description: this.createitemdialog.description,
        children: []
      }
      // 推送
      this.leftmenuinfo.functionmenulist[this.createitemdialog.index].children.push(tempitem)

      // 恢复原值
      this.createitemdialog = {
        fileattribute: ['file', 'folder'],
        filetype: ['脚本集(ROS)', '元素集(ROS)', '参数集(ROS)'],
        show: false,
        name: '',
        description: '',
        attribute: '',
        type: '',
        index: -1
      }
    },

    /**
     * 打开二级根文件夹
     * @param childitem
     */
    openParentFolder(childitem) {
      this.leftmenuinfo.selectchilditem = childitem
    }
  }
}
</script>

<style scoped></style>
