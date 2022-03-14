<template>
  <v-card>
    <v-row>
      <v-col cols="2">
        <v-card elevation="0" rounded>
          <p class="mb-0 ml-2 text-h6">导入文件(ROS)</p>
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
                  @click="addTestSuite()"
                >新增</v-btn
                >
              </v-row>
            </v-card-title>
            <v-list dense link shaped>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>脚本集&ROS文件</v-list-item-title>
              </v-list-item>
              <v-list-group
                v-for="(testsuite, index) in roslist"
                :key="index"
                dense
                link
                shaped
                class="pl-2"
                prepend-icon="mdi-alpha-i-box-outline"
                @click="changeSelectedRos(testsuite)"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ testsuite.name }}</v-list-item-title>
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon color="indigo">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="addCase()">添加case</v-list-item>
                    </v-list>
                  </v-menu>
                </template>
                <v-list-item
                  v-for="(testcase, i) in testsuite.element.tests"
                  :key="i"
                  dense
                  link
                  shaped
                  class="pl-6"
                  @dblclick.native="openCase(testcase)"
                >
                  <v-list-item-icon class="mr-2">
                    <v-icon
                      color="green accent-4"
                    >mdi-format-letter-case-upper</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-title>{{ testcase.id }}</v-list-item-title>
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
              ROS/{{ listconfig.selectedros.name }}
            </v-alert>
          </v-card-title>
          <v-card-text>
            <v-row class="ma-0 d-flex justify-start">
              <v-btn
                depressed
                color="amber darken-4"
                class="white--text ma-2"
                small
                @click="editCase()"
              >编辑本Case</v-btn
              >
              <v-btn
                depressed
                color="red accent-3"
                class="ma-2"
                small
                @click="removeCase()"
              >删除本Case</v-btn
              >
            </v-row>
            <v-row class="ma-0 d-flex justify-end">
              <v-btn
                depressed
                color="indigo darken-1"
                class="white--text ma-2"
                small
                @click="addStep()"
              >添加Step</v-btn
              >
              <v-btn
                depressed
                color="green accent-4"
                class="ma-2"
                small
                @click="updateStep()"
              >编辑Step</v-btn
              >
            </v-row>
            <v-card elevation="0">
              <v-card
                v-for="(step, index) in selectedPageItem"
                :key="index"
                dense
                outlined
                elevation="3"
                class="ma-2"
              >
                <div
                  v-if="
                    step.ActionType &&
                      step.ActionType.startsWith('RoWebElement')
                  "
                >
                  <step-element-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Launch')
                  "
                >
                  <step-launch-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Alert')
                  "
                >
                  <step-alert-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Browser')
                  "
                >
                  <step-browser-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Mouse')
                  "
                >
                  <step-mouse-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Scroll')
                  "
                >
                  <step-scroll-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Sleep')
                  "
                >
                  <step-sleep-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('Update')
                  "
                >
                  <step-update-view :step.sync="step" />
                </div>
                <div
                  v-else-if="
                    step.ActionType && step.ActionType.startsWith('WaitUntil')
                  "
                >
                  <step-wait-until-view :step.sync="step" />
                </div>
                <div v-else>
                  <macro-view :step.sync="step" />
                </div>
                <v-row class="d-flex justify-end ma-0">
                  <v-btn
                    small
                    depressed
                    color="blue accent-4"
                    class="white--text mx-2 mb-2"
                    @click="saveStep(step)"
                  >更新&保存</v-btn
                  >
                </v-row>
              </v-card>
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
    <v-dialog v-model="casedialog.show" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">
          创建/编辑
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="casedialog.id"
            outlined
            label="Id:"
            prepend-icon="mdi-puzzle"
          ></v-text-field>
          <v-text-field
            v-model="casedialog.annotation"
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
            @click="casedialog.show = false"
          >关闭</v-btn
          >
          <v-btn color="green darken-1" text @click="CaseDialogClose()">
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
import { createGUID } from '../../../scripts/internal'
import { analysisDefaultRos } from '../../../scripts/WebUi/WebScript'
import StepElementView from '../StepView/StepElementView'
import StepLaunchView from '../StepView/StepLaunchView'
import StepAlertView from '../StepView/StepAlertView'
import StepBrowserView from '../StepView/StepBrowserView'
import StepMouseView from '../StepView/StepMouseView'
import StepScrollView from '../StepView/StepScrollView'
import StepSleepView from '../StepView/StepSleepView'
import StepUpdateView from '../StepView/StepUpdateView'
import StepWaitUntilView from '../StepView/StepWaitUntilView'
import MacroView from '../StepView/MacroView'
export default {
  name: 'UiWebScript',
  components: {
    MacroView,
    StepWaitUntilView,
    StepUpdateView,
    StepSleepView,
    StepScrollView,
    StepMouseView,
    StepBrowserView,
    StepAlertView,
    StepLaunchView,
    StepElementView
  },
  props: {
    /**
     * @param {Object} configfile ros文件已完成解析的
     */
    scriptfile: Object
  },
  data() {
    return {
      // 文件
      fileInfo: null,
      // 元素集 完整体，每一个文件就是一个对象存入该ARRAY内
      roslist: [],
      // list设置
      listconfig: {
        // 最大页, 分拆时会被更改,默认 5
        maxpage: 5,
        // 当前页
        page: 1,
        // 展示数量,默认6
        visiblepage: 6,

        // item-group展开、缩进后的钻中的ros(testsuite)
        selectedros: {},
        // 双击被选中的case对象
        slectedcase: {},
        // slectedcase.teststeps的被分解ARRAY,
        spiltelementlist: []
      },
      // case的新建、编辑
      casedialog: {
        isnew: false, // 新建true, 编辑false
        show: false, // 是否展示
        id: null,
        annotation: null
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
     * 被选择的testcase被更改了，自动开始解析
     */
    'listconfig.slectedcase': {
      immediate: true,
      handler(val) {
        // 解析元素
        this.splitItems(val.teststeps)
      },
      deep: true
    },
    /**
     * 监听 props内的scriptfile参数
     */
    scriptfile: {
      immediate: true,
      handler(val) {
        if (val !== null && val !== undefined) {
          // console.log('干活')
          setTimeout(() => {
            this.roslist.push(val) // 推入
          }, 500)
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 文件更改,or添加文件
     * update: 2021-12-07 Done 完整态的ros正常读取
     */
    fileChange() {
      const that = this
      if (this.fileInfo !== null) {
        const name = this.fileInfo.name.split('.')[0] // 去除后缀
        const reader = new FileReader()
        // 回调函数
        reader.onload = function() {
          const filecontent = reader.result
          const parser = new DOMParser()
          const doc = parser.parseFromString(filecontent, 'application/xml')
          const ros = analysisDefaultRos(name, doc) // 解析ros
          that.roslist.push(ros) // 推入
        }
        reader.readAsText(this.fileInfo) // 作为TEXT读取
      }
    },

    /**
     * 双击
     * 打开case对象
     * @param testcase
     */
    openCase(testcase) {
      this.listconfig.slectedcase = testcase
      // 重置
      // 最大页, 分拆时会被更改,默认 5
      this.listconfig.maxpage = 5
      // 当前页
      this.listconfig.page = 1
      // 展示数量,默认6
      this.listconfig.visiblepage = 6
    },

    /**
     * 添加testsuite
     * TODO 大工程,除去默认值，很多还需要自行填写
     */
    addTestSuite() {},

    /**
     * 添加 testcase
     */
    addCase() {
      this.casedialog.isnew = true
      this.casedialog.show = true
    },

    /**
     * case的dialog关闭后操作
     * TODO
     * @constructor
     */
    CaseDialogClose() {
      const tempelement = {
        annotation: this.casedialog.annotation,
        id: this.casedialog.id
      }
      // 查询是否存在
      const index = this.listconfig.selectedros.element.findIndex(
        item => item.identify === tempelement.identify
      )
      if (index === -1) {
        tempelement.identify = createGUID()
        tempelement.teststeps = []
        // 新增
        this.listconfig.selectedros.element.tests.push(tempelement)
      }
      // 消息传播
      this.snackbar = {
        show: true,
        text: '添加/修改TestCase成功'
      }
    },

    /**
     * 更改选择的ROS
     * @param testsuite
     */
    changeSelectedRos(testsuite) {
      // 两次选择的ROS 是否一致，一致不处理，不一致才会进行做操作
      const tsidentify = testsuite.identify
      const sridentify = this.listconfig.selectedros.identify
      if (tsidentify !== sridentify) {
        this.listconfig.selectedros = testsuite
      }
    },

    /**
     * 分拆case内的steps,切割为一个个的分页
     * TODO 估计要重写或加点新的
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
