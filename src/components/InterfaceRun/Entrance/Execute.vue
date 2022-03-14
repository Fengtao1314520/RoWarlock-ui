<template>
  <v-card class="d-flex flex-row">
    <v-navigation-drawer
      :expand-on-hover="false"
      permanent
      class="d-flex pa-2 col-1"
    >
    </v-navigation-drawer>
    <div class="col-11">
      <v-card>
        <v-card-title>
          TestRun 测试执行
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            dense
            append-icon="mdi-magnify"
            label="检索"
            single-line
            hide-details
            clearable
          ></v-text-field>
        </v-card-title>
        <v-data-table
          dense
          :items-per-page="5"
          :headers="tableheaders"
          :items="localtestrun"
          :search="search"
        >
          <template v-slot:item.name="{ item }">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <p class="mt-3 text-subtitle-2" v-bind="attrs" v-on="on">
                  {{ returnLongName(item.name) }}
                </p>
              </template>
              <p>编号:{{ item.id }}</p>
              <p>名称:{{ item.name }}</p>
            </v-tooltip>
          </template>
          <template v-slot:item.taskdate="{ item }">
            <p class="mt-3 ">
              {{ item.config.taskdatetime.taskdate }}
            </p>
          </template>
          <template v-slot:item.tasktime="{ item }">
            <p class="mt-3 ">
              {{ item.config.taskdatetime.tasktimehour }}:{{
                item.config.taskdatetime.tasktimemins
              }}
            </p>
          </template>
          <template v-slot:item.retry="{ item }">
            <p class="mt-3 ">
              {{ item.config.retry.isretry }}
            </p>
          </template>
          <template v-slot:item.machine="{ item }">
            <p class="mt-3 ">
              {{ item.config.machine.isauto }}
            </p>
          </template>
          <template v-slot:item.stepcount="{ item }">
            <p class="mt-3 ">
              {{ item.config.selectstep.length }}
            </p>
          </template>
          <template v-slot:item.donecove="{ item }">
            <v-progress-linear
              class="mt-3"
              :value="getTestRunProcess(item.id).process"
              color="yellow lighten-1"
              height="25"
            >
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </template>
          <template v-slot:item.nowdatetime="{ item }">
            <p class="mt-3">
              {{ getTestRunProcess(item.id).completedatetime }}
            </p>
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              class="mt-2"
              label
              :color="resetStatus(getTestRunProcess(item.id).status).color"
            >
              {{ resetStatus(getTestRunProcess(item.id).status).str }}
            </v-chip>
          </template>
          <template v-slot:item.tresult="{ item }">
            <v-chip
              class="mt-2"
              label
              :color="resetResult(getTestRunProcess(item.id).tresult).color"
            >
              {{ resetResult(getTestRunProcess(item.id).tresult).str }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="mt-3">
              <v-icon class="mr-2" color="red darken-1" @click="stopTestRun(item)">
                mdi-stop-circle-outline
              </v-icon>
              <v-icon class="mr-2" color="green darken-1" @click="restartTestRun(item)">
                mdi-restart
              </v-icon>
              <v-icon class="mr-2" @click="skiptoTestResult(item)">
                mdi-debug-step-over
              </v-icon>
              <v-icon class="mr-2">
                mdi-menu
              </v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar.isshow" top :multi-line="snackbar.multiline">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.isshow = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { postFunc } from '../../../scripts/internal/httpFunc'
import { nowdate } from '../../../scripts/common'
export default {
  name: 'Execute',
  data() {
    return {
      /**
       * 表头
       */
      tableheaders: [
        {
          text: '测试名称',
          sortable: false,
          value: 'name',
          align: 'center',
          width: 150
        },
        {
          text: '执行起始日期',
          sortable: false,
          value: 'taskdate',
          align: 'center',
          width: 90
        },
        {
          text: '执行时间',
          sortable: false,
          value: 'tasktime',
          align: 'center',
          width: 80
        },
        {
          text: '是否重试',
          sortable: false,
          value: 'retry',
          align: 'center',
          width: 80
        },
        {
          text: '自动分配',
          sortable: false,
          value: 'machine',
          align: 'center',
          width: 80
        },
        {
          text: '步骤数',
          sortable: false,
          value: 'stepcount',
          align: 'center',
          width: 80
        },
        {
          text: '当前进度',
          sortable: false,
          value: 'donecove',
          align: 'center',
          width: 100
        },
        {
          text: '完成时间',
          sortable: false,
          value: 'nowdatetime',
          align: 'center',
          width: 150
        },
        {
          text: '执行状态',
          sortable: false,
          value: 'status',
          align: 'center',
          width: 100
        },
        {
          text: '执行结果',
          sortable: false,
          value: 'tresult',
          align: 'center',
          width: 100
        },
        {
          text: '操作',
          sortable: false,
          value: 'actions',
          align: 'center',
          width: 160
        }
      ],

      /**
       * 本地testrun
       */
      localtestrun: [],

      /**
       * 检索
       */
      search: '',

      /**
       * 消息条
       */
      snackbar: {
        isshow: false,
        multiLine: true,
        color: 'red',
        text: ''
      },

      /**
       *  定时器
       */
      timer: null,

      /**
       * 任务进度
       */
      taskprocess: []
    }
  },
  mounted() {
    // 起步做一次执行
    this.getTestRun()
    this.queryTaskProcess()
    // 再开始执行定时器任务
    this.$nextTick(() => {
      this.timer = setInterval(this.queryTaskProcess, 1000 * 60 * 5)
    })
  },
  beforeDestroy() {
    /**
     * 销毁定时器
     */
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    /**
     * 获取testrun
     */
    getTestRun() {
      // 赋值
      this.localtestrun = this.$store.state.testrun.testrun
    },

    /**
     * 获取执行进度，依赖id,并获取时间
     * @param id
     * @returns {{tresult: number, process: number, completedatetime string, status: number}}
     */
    getTestRunProcess(id) {
      const index = this.taskprocess.findIndex(item => item.id === id)
      if (index !== -1) {
        return this.taskprocess[index]
      } else {
        return {
          process: 56,
          completedatetime: nowdate(),
          status: 0,
          tresult: 0
        }
      }
    },

    /**
     * 返回任务结果的颜色和字符串
     * @param result 结果int值
     * @returns {{str: string, color: string}}
     */
    resetResult(result) {
      if (result === 0) {
        // 未知
        return {
          color: 'grey lighten-1',
          str: 'UNKONW'
        }
      } else if (result === 1) {
        // 成功
        return {
          color: 'green accent-3',
          str: 'SUCCESS'
        }
      } else if (result === 2) {
        // 警告
        return {
          color: 'amber accent-2',
          str: 'WARN'
        }
      } else if (result === 3) {
        // 失败
        return {
          color: 'pink accent-3',
          str: 'ERROR'
        }
      } else if (result === 4) {
        // 异常
        return {
          color: 'red darken-4',
          str: 'EXCEPT'
        }
      }
    },
    /**
     * 返回任务状态的颜色和字符串
     * @param result 结果int值
     * @returns {{str: string, color: string}}
     */
    resetStatus(status) {
      if (status === 0) {
        // 新建
        return {
          color: 'grey lighten-1',
          str: 'NEW'
        }
      } else if (status === 1) {
        // 新建
        return {
          color: 'green accent-1',
          str: 'DOING'
        }
      } else if (status === 2) {
        // 新建
        return {
          color: 'light-green accent-3',
          str: 'READY'
        }
      } else if (status === 3) {
        // 新建
        return {
          color: 'blue darken-3',
          str: 'EXEC'
        }
      } else if (status === 4) {
        // 新建
        return {
          color: 'green accent-3',
          str: 'COMPLETED'
        }
      } else if (status === 5) {
        // 新建
        return {
          color: 'blue-grey darken-1',
          str: 'HOLD'
        }
      } else if (status === 6) {
        // 新建
        return {
          color: 'red darken-4',
          str: 'BLOCK'
        }
      }
    },

    /**
     * 返回过长的名称
     * @param name
     * @returns {*}
     */
    returnLongName(name) {
      if (name.length <= 9) {
        return name
      } else {
        const tempname = name.slice(0, 9)
        return tempname
      }
    },

    /**
     * 停止testrun
     * @param item
     */
    stopTestRun(item) {
      this.snackbar.text = '暂停' + item.name + '成功'
      this.snackbar.isshow = true
    },

    /**
     * 重新开始testrun
     * @param item
     */
    restartTestRun(item) {
      console.log(item)
      this.snackbar.text = '重启' + item.name + '成功'
      this.snackbar.isshow = true
    },

    /**
     * 跳转至测试结果
     * @param item
     */
    skiptoTestResult(item) {
      const simpleresult = this.getTestRunProcess(item.id)
      this.$emit('skipttoTestResult', item, simpleresult)
    },

    /**
     * 查询任务进度
     * 定时器任务
     */
    queryTaskProcess() {
      const list = []
      this.localtestrun.forEach(item => list.push(item.id))
      postFunc('/testrun/craft/queryprocess', { ids: list })
        .then(result => {
          if (result.resstatus === true) {
            this.taskprocess = result.resbody
          } else {
            console.log(result.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    timeToSec(hour, min, sec) {
      const s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
    }
  }
}
</script>

<style scoped></style>
