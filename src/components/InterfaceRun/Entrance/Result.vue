<template>
  <v-card class="d-flex flex-row">
    <div class="col-12">
      <v-card outlined>
        <v-card-text>
          <v-card shaped>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <div class="rounded-r-xl pa-1 text-left blue lighten-1 ">
                    <p class="mt-3 text-h6 white--text has-text-weight-bold">任务名称:{{ localitem.name }}</p>
                  </div>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col>
                      <v-chip
                        class="mb-n6 mt-n4"
                        color="deep-orange accent-2"
                        text-color="white"
                      >
                        <v-avatar left class="indigo accent-4">
                          ID
                        </v-avatar>
                        {{ localitem.id }}
                      </v-chip>
                    </v-col>
                    <v-col>
                      <v-chip
                        color="deep-orange accent-2"
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-backup-restore
                        </v-icon>
                        {{ localitem.config.retry.retrycount }}
                      </v-chip>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5" class="pt-0">
                      <v-chip
                        color="deep-orange accent-2"
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-camera-timer
                        </v-icon>
                        {{ localitem.config.taskdatetime.taskdate.toString() }} {{ localitem.config.taskdatetime.tasktimehour }}:{{ localitem.config.taskdatetime.tasktimemins }}
                      </v-chip>
                    </v-col>
                    <v-col class="pt-0">
                      <v-chip
                        color="deep-orange accent-2"
                        text-color="white"
                      >
                        <v-icon left>
                          mdi-check-circle
                        </v-icon>
                        {{ localsimpleresult.completedatetime }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col>
                      <v-progress-linear
                        :value="localsimpleresult.process"
                        color="deep-purple lighten-2"
                        height="25"
                        buffer-value="0"
                        stream
                      >
                        <template v-slot:default="{ value }">
                          <strong>{{ Math.ceil(value) }}%</strong>
                        </template>
                      </v-progress-linear>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3" class="pt-0">
                      <v-chip
                        label
                        :color="resetResult(localsimpleresult.status).color"
                      >
                        {{ resetResult(localsimpleresult.status).str }}
                      </v-chip>
                    </v-col> <v-col cols="3" class="pt-0">
                      <v-chip
                        label
                        :color="resetResult(localsimpleresult.tresult).color"
                      >
                        {{ resetResult(localsimpleresult.tresult).str }}
                      </v-chip>
                    </v-col>
                    <v-col class="pt-0">
                      <v-btn
                        color="green accent-4"
                        fab
                        x-small
                        dark
                        class="mr-2"
                      >
                        <v-icon>mdi-sync</v-icon>
                      </v-btn>
                      <v-btn
                        color="indigo lighten-1"
                        fab
                        x-small
                        dark
                        class="mr-2"
                      >
                        <v-icon>mdi-swap-vertical</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card>
                    <v-card-title>
                      执行结果
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
                      :items="localitem.config.selectstep"
                      :search="search"
                    >
                      <template v-slot:item.name="{ item }">
                        <v-tooltip right>
                          <template v-slot:activator="{ on, attrs }">
                            <p class="mt-3 text-subtitle-2" v-bind="attrs" v-on="on">
                              {{ returnLongName(item.name) }}...
                            </p>
                          </template>
                          <p>编号:{{ item.id }}</p>
                          <p>名称:{{ item.name }}</p>
                        </v-tooltip>
                      </template>
                      <template v-slot:item.expandtype="{ item }">
                        <v-chip
                          small
                          label
                          class="mt-3"
                          color="deep-purple accent-4"
                          outlined
                        >
                          <v-icon left>
                            mdi-wrench
                          </v-icon>
                          {{ item.expandtype }}
                        </v-chip>
                      </template>
                      <template v-slot:item.expandlogic="{ item }">
                        <p class="mt-3">
                          {{ returnExpandlogicStr(item.expandlogic) }}
                        </p>
                      </template>
                      <template v-slot:item.expandvalue="{ item }">
                        <p class="mt-3">
                          {{ item.expandvalue }}
                        </p>
                      </template>
                      <template v-slot:item.afterexec="{ item }">
                        <p class="mt-3">
                          {{ returnAfterexecStr(item.afterexec) }}
                        </p>
                      </template>
                      <template v-slot:item.actualvalue="{ item }">
                        <p class="mt-3">
                          {{ getTestResultDetail(item.id).actualvalue }}
                        </p>
                      </template>
                      <template v-slot:item.execstatus="{ item }">
                        <v-chip
                          class="mt-3"
                          small
                          text-color="white"
                          label
                          :color="resetStatus(getTestResultDetail(item.id).status).color"
                        >
                          <p class="font-weight-bold mt-4">{{ resetStatus(getTestResultDetail(item.id).status).str }}</p>
                        </v-chip>
                      </template>
                      <template v-slot:item.execresult="{ item }">
                        <v-chip
                          class="mt-3"
                          small
                          text-color="white"
                          label
                          :color="resetResult(getTestResultDetail(item.id).tresult).color"
                        >
                          <p class="font-weight-bold mt-4">{{ resetResult(getTestResultDetail(item.id).tresult).str }}</p>
                        </v-chip>
                      </template>
                      <template v-slot:item.usetime="{ item }">
                        <p class="mt-3">
                          {{ getTestResultDetail(item.id).usetime }}
                        </p>
                      </template>
                      <template v-slot:item.extrainfo="{ item }">
                        <v-chip
                          class="mt-2"
                          color="success"
                          outlined
                          @click="openStepDetail(item,getTestResultDetail(item.id))"
                        >
                          <v-icon left>
                            mdi-server-plus
                          </v-icon>
                          更多信息
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </div>
    <v-dialog v-model="detaildialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <v-alert
                border="left"
                color="green"
                type="success"
                dense
              >
                {{ detaildialog.item.name }}
              </v-alert>
            </v-col>
          </v-row>
          <v-card-text>
            <v-row>
              <v-col>
                <v-textarea
                  outlined
                  disabled
                  label="详情:"
                  :value="getDetailStr"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="detaildialog.isshow = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { postFunc } from '../../../scripts/internal/httpFunc'

export default {
  name: 'Result',
  props: {
    /**
     * testrun
     */
    item: Object,
    /**
     * testrun result
     * */
    simpleresult: Object
  },
  data() {
    return {
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
       * 表头
       */
      tableheaders: [
        { text: '步骤名称', sortable: false, value: 'name', align: 'left', width: 120 },
        { text: '预期类型', sortable: false, value: 'expandtype', align: 'left', width: 80 },
        { text: '判断逻辑', sortable: false, value: 'expandlogic', align: 'left', width: 80 },
        { text: '预期值', sortable: false, value: 'expandvalue', align: 'left', width: 100 },
        { text: '完成后操作', sortable: false, value: 'afterexec', align: 'left', width: 150 },
        { text: '实际值', sortable: false, value: 'actualvalue', align: 'left', width: 100 },
        { text: '执行状态', sortable: false, value: 'execstatus', align: 'left', width: 80 },
        { text: '执行结果', sortable: false, value: 'execresult', align: 'left', width: 80 },
        { text: '耗时', sortable: false, value: 'usetime', align: 'left', width: 80 },
        { text: '其他信息', sortable: false, value: 'extrainfo', align: 'left', width: 100 }
      ],

      /*
      * 本地local testrun
      * */
      localitem: {},

      /*
     * 本地local testrun result
     * */
      localsimpleresult: {},

      search: '',

      /**
       *  详情 dialog
       */
      detaildialog: {
        isshow: false,
        item: {},
        result: {}
      },

      /**
       * 测试任务详情进度
       * 列表
       * */
      taskdetailprocess: [],

      /**
       *  定时器
       */
      timer: null
    }
  },
  computed: {
    /**
     *  改为字符串性质的详情
     */
    getDetailStr() {
      const extra = this.detaildialog.result.extra
      return String(extra)
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.localitem = val
        }
      },
      deep: true
    },

    simpleresult: {
      immediate: true,
      handler(val) {
        if (val != null) {
          this.localsimpleresult = val
        }
      },
      deep: true
    }
  },
  mounted() {
    this.queryTaskProcessDetail()
    // 再开始执行定时器任务
    this.$nextTick(
      () => {
        this.timer = setInterval(this.queryTaskProcessDetail, 1000 * 60 * 5)
      }
    )
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
     * 获取任务详情
     * @param id step的id
     */
    getTestResultDetail(id) {
      const index = this.taskdetailprocess.findIndex(item => item.id === id)
      if (index !== -1) {
        return this.taskdetailprocess[index]
      } else {
        return {
          id: id,
          usetime: 45.233,
          actualvalue: '200',
          extra: '风吹过我的头发\n' +
              '淋着雨我就站在你家楼下\n' +
              '迫不及待地拨通你的电话\n' +
              '一整个夏天所有和你的画面\n',
          status: 4,
          tresult: 0
        }
      }
    },

    /**
     * 打开步骤执行详情
     *  @param item step本身
     *  @param result 依赖step的id获取的结果
     */
    openStepDetail(item, result) {
      this.detaildialog.item = item
      this.detaildialog.result = result
      this.detaildialog.isshow = true
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
     * 返回预期逻辑判断的字符展示
     * @param logic
     */
    returnExpandlogicStr(logic) {
      const index = this.expandlogicselect.findIndex(item => item.logic === logic)
      if (index !== -1) {
        const desc = this.expandlogicselect[index].desc
        return desc
      }
    },

    /**
     * 返回步骤完毕后的操作字符展示
     * @param afterexec
     * @returns {*|string}
     */
    returnAfterexecStr(after) {
      const index = this.afterexecselect.findIndex(item => item.after === after)
      if (index !== -1) {
        const desc = this.afterexecselect[index].desc
        return desc
      }
    },

    /**
     * 查询任务进度
     * 详情
     * 定时器任务
     */
    queryTaskProcessDetail() {
      const list = []
      this.localitem.config.selectstep.forEach(item => { list.push(item.id) })
      postFunc('/testrun/craft/queryprocessdetail', { parentid: this.localitem.id, ids: list
      }).then(result => {
        if (result.resstatus === true) {
          this.taskdetailprocess = result.resbody
        } else {
          console.log(result.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }

  }

}
</script>

<style scoped></style>
