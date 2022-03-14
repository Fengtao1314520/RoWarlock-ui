<template>
  <v-card class="d-flex flex-row">
    <v-navigation-drawer
      :expand-on-hover="false"
      permanent
      class="d-flex pa-2 col-2"
    >
      <div>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col class="pa-1">
                <v-btn
                  depressed
                  block
                  color="pink lighten-2"
                  dark
                  @click="loadAllStep()"
                >
                  读取所有可被执行的步骤
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-1">
                <v-btn
                  block
                  depressed
                  color="green lighten-1"
                  dark
                  @click="loadTestRun()"
                >
                  载入
                </v-btn>
              </v-col>
              <v-col class="pa-1">
                <v-btn
                  block
                  depressed
                  color="blue accent-4"
                  dark
                  @click="exportTestRun()"
                >
                  导出
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card loading outlined>
          <v-card-title>
            Set TestRun
            <v-spacer></v-spacer>
            <v-btn color="primary" icon @click="newdialog.isshow = true">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-list dense link shaped>
            <v-list-group prepend-icon="mdi-function-variant" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Execute Logic</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, index) in localtestrun"
                :key="index"
                dense
                link
                shaped
                class="pl-6"
                @dblclick="openTestRun(child)"
              >
                <v-list-item-icon>
                  <v-icon color="primary">mdi-test-tube</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="child.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card>
      </div>
    </v-navigation-drawer>
    <div class="col-10">
      <div v-if="JSON.stringify(activetestrun) !== '{}'">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col>
                <span class="text-h4 indigo--text">
                  {{ activetestrun.name }}
                </span>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-row>
                  <v-col>
                    <v-btn
                      small
                      depressed
                      color="success"
                      @click="saveTestRun()"
                    >
                      <v-icon left>mdi-content-save-outline</v-icon>
                      Save
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="8">
                <v-autocomplete
                  v-model="activetestrunconfig.selectstep"
                  dense
                  :items="returnAPIAll"
                  item-text="name"
                  :item-value="getSeleteItem"
                  label="绑定步骤:"
                  outlined
                  chips
                  multiple
                  clearable
                  deletable-chips
                  @change="stepchange"
                  @input="stepinput"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-divider class="mt-4 mb-4"></v-divider>
            <v-row>
              <v-col cols="8">
                <v-card outlined elevation="2">
                  <v-card-title class="pb-0">
                    <v-alert
                      border="left"
                      colored-border
                      color="green accent-4"
                      dense
                    >
                      <p class="text-h5 mt-4">
                        基本设定
                      </p>
                    </v-alert>
                  </v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col class="pt-0 pb-0" cols="2">
                        <p class="text-h6 pt-4">预置条件:</p>
                      </v-col>
                      <v-col class="pt-0 pb-0" cols="6">
                        <v-autocomplete
                          v-model="activetestrunconfig.selectprestep"
                          dense
                          :items="returnAPIAll"
                          item-text="name"
                          :item-value="getSeleteItem"
                          label="前置条件:"
                          chips
                          multiple
                          clearable
                          deletable-chips
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4" class="pt-0 pb-0">
                        <v-menu
                          v-model="
                            activetestrunconfig.taskdatetime.opentaskdate
                          "
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="
                                activetestrunconfig.taskdatetime.taskdate
                              "
                              dense
                              label="任务起始日期"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="activetestrunconfig.taskdatetime.taskdate"
                            @input="
                              activetestrunconfig.taskdatetime.opentaskdate = false
                            "
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="3" class="pt-0 pb-0">
                        <v-row>
                          <v-col cols="1" sm="6">
                            <v-text-field
                              v-model="
                                activetestrunconfig.taskdatetime.tasktimehour
                              "
                              dense
                              clearable
                              :rules="[rules.maxnumvalue]"
                              label="时"
                              maxlength="2"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1" sm="6">
                            <v-text-field
                              v-model="
                                activetestrunconfig.taskdatetime.tasktimemins
                              "
                              dense
                              clearable
                              :rules="[rules.maxnumvalue]"
                              label="分"
                              maxlength="2"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="5">
                        <v-row align="center" class="ml-0">
                          <v-checkbox
                            v-model="activetestrunconfig.retry.isretry"
                            hide-details
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                          <v-text-field
                            v-model="activetestrunconfig.retry.retrycount"
                            :disabled="!activetestrunconfig.retry.isretry"
                            label="是否重试"
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col cols="5">
                        <v-row align="center">
                          <v-checkbox
                            v-model="activetestrunconfig.machine.isauto"
                            hide-details
                            class="shrink mr-2 mt-0"
                          >
                          </v-checkbox>
                          <v-text-field
                            v-model="activetestrunconfig.machine.machineid"
                            :disabled="activetestrunconfig.machine.isauto"
                            label="是否自动分配设备"
                            :rules="[rules.ipvalue]"
                          ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
                <v-card outlined shaped>
                  <v-card-title>
                    <v-alert
                      border="left"
                      colored-border
                      color="deep-purple accent-4"
                      dense
                    >
                      <p class="text-h5 mt-4">
                        步骤执行逻辑设置
                      </p>
                    </v-alert>
                  </v-card-title>
                  <v-card-text>
                    <v-divider class="mt-n6"></v-divider>
                    <v-alert
                      dense
                      outlined
                      icon="mdi-alert-outline"
                      color="pink"
                    >
                      注意:预期值将会与实际response返回的内容进行对比或截取!
                    </v-alert>
                    <v-alert
                      v-for="(item, index) in activetestrunconfig.selectstep"
                      :key="index"
                      dense
                      colored-border
                      icon="mdi-code-greater-than-or-equal"
                      :color="radomColorForStep(index)"
                      border="left"
                      elevation="2"
                    >
                      <v-row>
                        <v-col>
                          <v-chip
                            :color="radomColorForStep(index)"
                            label
                            text-color="white"
                          >
                            <v-icon left>
                              mdi-label
                            </v-icon>
                            {{ item.name }}
                          </v-chip>
                        </v-col>
                        <v-col>
                          <v-chip label small class="mt-1">
                            {{ item.id }}
                          </v-chip>
                        </v-col>

                        <v-spacer></v-spacer>
                        <v-col>
                          <v-row>
                            <v-spacer></v-spacer>
                            <v-col>
                              <v-btn
                                icon
                                large
                                color="indigo"
                                class="ml-10 mt-n2"
                                @click="openSingleStepExpand(item)"
                              >
                                <v-icon
                                >mdi-dots-horizontal-circle-outline</v-icon
                                >
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-row class="mt-n4 pt-n4 mb-n5">
                        <v-col>
                          <v-alert outlined dense color="purple">
                            <v-row>
                              <v-col class="ml-2">
                                <v-text-field
                                  v-model="item.desc"
                                  dense
                                  outlined
                                  clearable
                                  label="备注描述:"
                                  class="mt-2"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col class="ma-1 pa-1" cols="3">
                                <v-subheader
                                  class="subtitle-1"
                                >步骤失败后:</v-subheader
                                >
                              </v-col>
                              <v-col class="ma-1 pa-1">
                                <v-select
                                  v-model="expanddialog.singlestep.afterexec"
                                  color="indigo darken-4"
                                  :items="afterexecselect"
                                  item-text="desc"
                                  item-value="after"
                                  dense
                                  label="预期值计算逻辑"
                                  class="mt-4"
                                ></v-select>
                              </v-col>
                            </v-row>
                          </v-alert>
                        </v-col>
                      </v-row>
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </div>
    </div>
    <v-dialog v-model="newdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">创建 testrun</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="newdialog.name"
                  label="testrun 名称"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>新增testrun,请输入名称</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="newdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="newDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="expanddialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">预期值与预期值类型选择</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-select
                  v-model="expanddialog.singlestep.expandtype"
                  :items="expandtypeselect"
                  dense
                  label="预期值类型"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  v-model="expanddialog.singlestep.expandlogic"
                  :items="expandlogicselect"
                  item-text="desc"
                  item-value="logic"
                  dense
                  label="预期值计算逻辑"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="expanddialog.singlestep.expandvalue"
                  dense
                  clearable
                  label="预期值"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*默认预期值类型为 RESPONSE CODE值,预期值为 '200'</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="expanddialog.isshow = false"
          >
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="expandDialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { createGUID } from '../../../scripts/internal'
import { getAllDataToServer } from '../../../scripts/craft_interface'
import { loadTestRun } from '../../../scripts/craft_testrun'
export default {
  name: 'TestRun',
  data() {
    return {
      expandtypeselect: ['code', 'status', 'json body', 'response header'],
      expandlogicselect: [
        {
          logic: '=',
          desc: '等于'
        },
        {
          logic: '>=',
          desc: '包含以下值'
        },
        {
          logic: '<',
          desc: '不包含以下值'
        },
        {
          logic: '!=',
          desc: '不等于'
        }
      ],
      afterexecselect: [
        {
          after: 0,
          desc: '无论成功或失败均继续执行'
        },
        {
          after: 1,
          desc: '只有成功继续执行'
        },
        {
          after: 2,
          desc: '允许失败后执做警告,继续执行'
        },
        {
          after: 3,
          desc: '失败后结束整个执行'
        }
      ],

      /**
       * 左侧
       * 本地的testrun
       */
      localtestrun: [],

      /**
       * 右侧整个
       * 活动的testrun
       */
      activetestrun: {},

      /**
       * 活动的testrun配置
       */
      activetestrunconfig: this.resetConfigDefault(),

      /**
       * 新建
       * dialog
       */
      newdialog: {
        isshow: false,
        /**
         * 名称
         */
        name: ''
      },

      /**
       * 预期值dialog
       */
      expanddialog: {
        isshow: false,
        singlestep: this.resetStepDefault()
      },

      /**
       * 输入规则
       */
      rules: {
        maxnumvalue: value => {
          const pattern = /^[0-9]$|^[0-2][0-9]$|^5[0-9]$/
          return pattern.test(value) || '无效时间.'
        },
        ipvalue: value => {
          const pattern = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
          return pattern.test(value) || '无效ip地址.'
        }
      }
    }
  },
  computed: {
    /**
     * 返回所有的API的name/id
     */
    returnAPIAll() {
      const steplist = []
      const testsuite = this.$store.state.testsuite.testsuite
      testsuite.forEach(sigsuite => {
        sigsuite.cases.forEach(sigcase => {
          sigcase.steps.forEach(sigstep => {
            const step = {
              name: sigstep.name,
              id: sigstep.id,
              desc: '',
              expandvalue: '200',
              expandtype: 'code',
              expandlogic: '=',
              afterexec: 0
            }
            steplist.push(step)
          })
        })
      })
      return steplist
    }

  },

  methods: {
    /**
     * TODO: TEST绑定,不然还要取interface里面再点一次
     * */
    loadAllStep() {
      const that = this
      getAllDataToServer()
        .then(content => {
          if (content !== null) {
            // 接下来可对文件内容进行处理
            this.$store.commit('importTestSuite', {
              content: content,
              save: false
            }) // 提交
            // that.localtestsuite = that.$store.state.testsuite.testsuite
          }
        })
        .catch(() => {
          that.$buefy.toast.open({
            duration: 3000,
            message: '获取数据失败!您的个人ID没有生成',
            type: 'is-cred-2'
          })
        })
    },

    /**
     * 读取testrun
     * */
    loadTestRun() {
      const that = this
      loadTestRun()
        .then(result => {
          if (result !== 'empty1') {
            this.$store.commit('loadTestRun', result)
            this.localtestrun = that.$store.state.testrun.testrun
          }
        })
        .catch(() => {
          that.$buefy.toast.open({
            duration: 3000,
            message: '远程获取Craft TestRun/Step失败',
            type: 'is-cred-2'
          })
        })
    },

    /**
     * 导出testrun
     * */
    exportTestRun() {},

    /**
     * 创建新testrun
     * Dialog关闭后创建
     */
    newDialogSave() {
      const temptestrun = {
        name: this.newdialog.name,
        id: createGUID()
      }
      this.localtestrun.push(temptestrun)
      this.newdialog.isshow = false
      this.newdialog.name = ''
    },

    /**
     * 预期值dialog
     * */
    expandDialogSave() {
      // 修改和赋值
      const fi = this.activetestrunconfig.selectstep.findIndex(
        item => item.id === this.expanddialog.singlestep.id
      )
      if (fi !== -1) {
        this.activetestrunconfig.selectstep.splice(
          fi,
          1,
          this.expanddialog.singlestep
        )
      }
      this.expanddialog.isshow = false
      this.expanddialog.singlestep = this.resetStepDefault()
      // console.log(this.activetestrunconfig);
    },

    /**
     * 打开一个testrun
     * */
    openTestRun(child) {
      this.activetestrun = child
      if (Object.prototype.hasOwnProperty.call(child, 'config')) {
        this.activetestrunconfig = child.config // config 赋值
      } else {
        this.activetestrunconfig = this.resetConfigDefault() // config 重置
      }
      // console.log(this.activetestrunconfig)
    },

    /**
     * 保存测试步骤
     * */
    saveTestRun() {
      console.log(this.activetestrunconfig)

      // 1.保存当前的, 活动到testrun保存配置信息
      this.activetestrun.config = this.activetestrunconfig
      const index = this.localtestrun.findIndex(
        item => item.id === this.activetestrun.id
      )
      if (index !== -1) {
        this.localtestrun.splice(index, 1, this.activetestrun)
        // 2.给到中间到state
        this.$store.commit('updateTestRun', this.activetestrun)
      }
    },

    /**
     * 打开单独的步骤，并给定预期值
     * */
    openSingleStepExpand(item) {
      this.expanddialog.singlestep = item
      this.expanddialog.isshow = true
    },

    /**
     * 重置设置testrun的配置
     * */
    resetConfigDefault() {
      /**
       * 这是一个testrun,包含一些预置条件
       * 所以prestep是数组
       * 同时绑定的步骤也是数组
       */
      const defualtconfig = {
        selectprestep: [], // 前置条件
        selectstep: [], // 绑定的步骤
        taskdatetime: {
          // 执行时间
          tasktimehour: '12',
          tasktimemins: '00',
          taskdate: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          opentaskdate: false
        },
        retry: {
          // 是否重试
          isretry: false,
          retrycount: 3
        },
        machine: {
          // 自动分配机器
          isauto: true,
          machineid: ''
        }
      }
      return defualtconfig
    },

    /**
     * 重置设置config 内step的默认配置
     * */
    resetStepDefault() {
      const tempstep = {
        name: '',
        id: '',
        desc: '',
        expandvalue: '200',
        expandtype: 'code',
        expandlogic: '=',
        afterexec: 0
      }
      return tempstep
    },

    /**
     * 返回选择的参数item
     */
    getSeleteItem(item) {
      // console.log('ganhuo')
      return item
    },

    /**
     * 随机步骤展示的颜色
     * */
    radomColorForStep(index) {
      if (index % 2 === 0) {
        return 'green accent-4'
      } else {
        return 'indigo darken-1'
      }
    },

    stepchange(val) {
      console.log(val)
    },
    stepinput(val) {
      console.log(val)
    }

  }
}
</script>

<style scoped></style>
