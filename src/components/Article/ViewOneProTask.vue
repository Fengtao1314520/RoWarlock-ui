<template>
  <section>
    <div class="card is-cwhite-1">
      <div class="card-content padding-05">
        <div class="content">
          <b-table :data="data" :columns="columns" :show-header="true" :striped="true" :narrowed="true" @cellclick="cellClick($event)"></b-table>
        </div>
      </div>
      <!-- <footer class="card-footer">
        <a href="#" class="card-footer-item">保存</a>
      </footer> -->
    </div>
    <!--弹出的modal编辑控件-->
    <b-modal v-model="showeditmodal" @close="closeModal()">
      <b-message type="is-cgray-1">
        <div class="columns">
          <div class="column is-5">
            <b-field label="修改为你想要的值:" type="is-cblue-1">
              <b-input
                v-if="editmodalconf.modalisinput === true"
                v-model="editmodalconf.changevalue"
                :placeholder="editmodalconf.label"
                expanded
              ></b-input>
              <b-select v-else v-model="editmodalconf.changevalue" :placeholder="editmodalconf.label" expanded>
                <option v-for="(item, index) in editmodalconf.selectopts" :key="index" :value="item">{{ item }}</option>
              </b-select>
            </b-field>
          </div>
        </div>
      </b-message>
    </b-modal>
  </section>
</template>

<script>
export default {
  // 显示一个任务的详情
  name: 'ViewOneProTask',
  props: {
    task: {},
    /**
     * 是否保存
     */
    isshowsave: {
      default: false,
      type: Boolean
    },
    /**
     * 关闭显示
     */
    closearticle: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      disabled: true,
      // 数据与字段label
      data: [
        {
          type: '任务名称',
          value: this.task.taskname,
          label: 'taskname'
        },
        {
          type: '任务id',
          value: this.task.taskid,
          label: 'taskid'
        },
        {
          type: '任务类型',
          value: this.task.tasktype,
          label: 'tasktype'
        },
        {
          type: '创建时间',
          value: this.task.createdate,
          label: 'createdate'
        },
        {
          type: '创建者',
          value: this.task.createautor,
          label: 'createautor'
        },
        {
          type: '修改时间',
          value: this.task.modifydate,
          label: 'modifydate'
        },
        {
          type: '修改者',
          value: this.task.modifyautor,
          label: 'modifyautor'
        },
        {
          type: '任务执行人',
          value: this.task.assigner,
          label: 'assigner'
        },
        {
          type: '任务审核人',
          value: this.task.reviewautor,
          label: 'reviewautor'
        },
        {
          type: '任务审核状态',
          value: this.task.reviewstatus,
          label: 'reviewstatus'
        },
        {
          type: '任务状态',
          value: this.task.taskstatus,
          label: 'taskstatus'
        },

        {
          type: '绑定的case',
          value: this.task.case,
          label: 'case'
        },
        {
          type: '绑定的US',
          value: this.task.us,
          label: 'us'
        },
        {
          type: '使用的设备',
          value: this.task.devicelist,
          label: 'devicelist'
        },
        {
          type: '使用的脚本',
          value: this.task.scriptlist,
          label: 'scriptlist'
        },
        {
          type: '使用的配置项',
          value: this.task.configlist,
          label: 'configlist'
        }
      ],
      columns: [
        {
          field: 'type',
          label: '任务类别',
          width: '50'
        },
        {
          field: 'value',
          label: '任务值',
          width: '200'
        }
      ],
      /**
       * 修改编辑modal
       */
      showeditmodal: false,
      /**
       * 编辑modal的信息配置
       */
      editmodalconf: {
        /**
         * 原始数据
         */
        original: {},
        /**
         * modal内包含的是不是input
         */
        modalisinput: true,
        /**
         * 展示在b-field上的label字段
         */
        label: '',
        /**
         * 如果是select，则带入选项
         */
        selectopts: [],
        changevalue: '',
        /**
         * 默认值
         */
        defaultvalue: ''
      }
    }
  },
  watch: {
    task: {
      // immediate:true
      handler(newValue) {
        this.reloadTable()
      },
      deep: true
    }
  },
  methods: {
    /**
     * 分拆词组
     *
     */
    splitWord(text, index) {
      const splittext = text.split(' ')
      return splittext[index]
    },
    /**
     * 保存任务
     * 子组件方法
     *
     */
    saveTask() {
      if (this.closearticle) {
        this.$emit('update:task', this.task)
        this.closearticle()
      }
    },
    /**
     * 点击cell
     */
    cellClick(e) {
      this.editmodalconf.label = e.type
      if (e.label === 'tasktype' || e.label === 'assigner' || e.label === 'reviewautor' || e.label === 'reviewstatus' || e.label === 'taskstatus') {
        this.editmodalconf.modalisinput = false
        if (e.label === 'assigner' || e.label === 'reviewautor') {
          this.editmodalconf.selectopts = ['居溱', '刘凯', '冯涛', '李荧辉']
        } else if (e.label === 'tasktype') {
          this.editmodalconf.selectopts = ['develop', 'debug', 'review', 'running', 'release']
        } else if (e.label === 'taskstatus') {
          this.editmodalconf.selectopts = ['Active', 'Done', 'Block']
        } else if (e.label === 'reviewstatus') {
          this.editmodalconf.selectopts = ['need review', 'ready', 'done']
        }
      } else {
        this.editmodalconf.modalisinput = true
      }
      this.editmodalconf.changevalue = e.value
      this.editmodalconf.original = e
      this.showeditmodal = true
    },

    /**
     * 关闭modal,需要保存
     */
    closeModal() {
      this.task[this.editmodalconf.original.label] = this.editmodalconf.changevalue
      this.reloadTable()
      // update:更新数据
      this.$emit('update:task', this.task)
    },

    /**
     * 刷新表单
     */
    reloadTable() {
      // 刷新数据
      this.data = [
        {
          type: '任务名称',
          value: this.task.taskname,
          label: 'taskname'
        },
        {
          type: '任务id',
          value: this.task.taskid,
          label: 'taskid'
        },
        {
          type: '任务类型',
          value: this.task.tasktype,
          label: 'tasktype'
        },
        {
          type: '创建时间',
          value: this.task.createdate,
          label: 'createdate'
        },
        {
          type: '创建者',
          value: this.task.createautor,
          label: 'createautor'
        },
        {
          type: '修改时间',
          value: this.task.modifydate,
          label: 'modifydate'
        },
        {
          type: '修改者',
          value: this.task.modifyautor,
          label: 'modifyautor'
        },
        {
          type: '任务执行人',
          value: this.task.assigner,
          label: 'assigner'
        },
        {
          type: '任务审核人',
          value: this.task.reviewautor,
          label: 'reviewautor'
        },
        {
          type: '任务审核状态',
          value: this.task.reviewstatus,
          label: 'reviewstatus'
        },
        {
          type: '任务状态',
          value: this.task.taskstatus,
          label: 'taskstatus'
        },

        {
          type: '绑定的case',
          value: this.task.case,
          label: 'case'
        },
        {
          type: '绑定的US',
          value: this.task.us,
          label: 'us'
        },
        {
          type: '使用的设备',
          value: this.task.devicelist,
          label: 'devicelist'
        },
        {
          type: '使用的脚本',
          value: this.task.scriptlist,
          label: 'scriptlist'
        },
        {
          type: '使用的配置项',
          value: this.task.configlist,
          label: 'configlist'
        }
      ]
    }
  }
}
</script>

<style scoped>
.proinput {
  border-bottom: 1px solid #dbdbdb;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}

.margin-05 {
  margin: 0.5rem;
}

.padding-05 {
  padding: 0.5rem;
}
</style>
