<template>
  <div>
    <v-card elevation="0" outlined>
      <v-card-title>
        <v-alert dense border="left" color="indigo accent-4" dark class="ma-0">
          {{ localcaseobj.annotation.description }}
        </v-alert>
      </v-card-title>
      <v-card-text>
        <v-row class="ma-0 d-flex justify-end">
          <v-btn depressed color="indigo darken-1" class="white--text ma-2" small @click="addStep()">添加Step</v-btn>
          <v-btn class="mx-2" fab dark small color="blue accent-2" @click="backToCase()">
            <v-icon dark>mdi-backup-restore</v-icon>
          </v-btn>
        </v-row>
        <v-card elevation="0">
          <v-card v-for="(step, index) in selectedPageItem" :key="index" dense outlined elevation="3" class="ma-2">
            <div v-if="step.ActionType && step.ActionType.startsWith('RoWebElement')">
              <step-element-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Launch')">
              <step-launch-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Alert')">
              <step-alert-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Browser')">
              <step-browser-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Mouse')">
              <step-mouse-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Scroll')">
              <step-scroll-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Sleep')">
              <step-sleep-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('Update')">
              <step-update-view :step.sync="step" />
            </div>
            <div v-else-if="step.ActionType && step.ActionType.startsWith('WaitUntil')">
              <step-wait-until-view :step.sync="step" />
            </div>
            <div v-else>
              <macro-view :step.sync="step" />
            </div>
            <v-row class="d-flex justify-end ma-0">
              <v-btn small depressed color="blue accent-4" class="white--text mx-2 mb-2" @click="saveStep(step,index)">
                更新&保存
              </v-btn>
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
            ></v-pagination>
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
  </div>
</template>

<script>
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
import { nowdate } from '../../../scripts/common'
export default {
  name: 'TestCaseDetail',
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
    caseobj: Object
  },
  data() {
    return {
      localcaseobj: {},
      // list设置
      listconfig: {
        // 最大页, 分拆时会被更改,默认 5
        maxpage: 5,
        // 当前页
        page: 1,
        // 展示数量,默认6
        visiblepage: 6,
        // slectedcase.teststeps的被分解ARRAY,
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
    caseobj: {
      immediate: true,
      handler(val) {
        if (val !== null && val !== undefined && JSON.stringify(val) !== '{}') {
          console.log(val)
          this.localcaseobj = val
        }
      },
      deep: true
    },
    /**
     * 被选择的testcase被更改了，自动开始解析
     */
    localcaseobj: {
      immediate: true,
      handler(val) {
        // 解析元素
        this.splitItems(val.teststeps)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 分拆case内的steps,切割为一个个的分页
     * TODO 估计要重写或加点新的
     * */
    splitItems(val) {
      if (val !== undefined) {
        // 判断如果不是数组(就没有length)，或者size没有传值，size小于1，就返回空数组
        if (!val.length || !this.listconfig.visiblepage || this.listconfig.visiblepage < 1) {
          this.listconfig.spiltelementlist.push(val)
        } else {
          let [start, end] = [null, null]
          const result = []
          for (let i = 0; i < Math.ceil(val.length / this.listconfig.visiblepage); i++) {
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
     * 保存步骤
     * @param step
     * @param index
     */
    saveStep(step, index) {
      this.localcaseobj.teststeps.splice(index, 1, step)
      this.localcaseobj.annotation.lastupdate.date = nowdate()
      this.snackbar = {
        show: true,
        text: '修改步骤成功!'
      }
    },
    /**
     * 返回case页面
     */
    backToCase() {
      this.$emit('backToCase', this.localcaseobj)
    }
  }
}
</script>
