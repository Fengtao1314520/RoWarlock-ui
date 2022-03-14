<template>
  <div>
    <section>
      <b-table :data="alldata" :bordered="bordered" :striped="striped" :narrowed="narrowed" :hoverable="hoverable">
        <b-table-column v-slot="props" field="tasktype" label="任务类型" :width="width" centered>
          <b-message :type="props.row.tagcolor" size="is-small">
            <strong>{{ props.row.tasktype }}</strong>
          </b-message>
        </b-table-column>
        <b-table-column v-slot="props" field="totaltask" label="任务总数" :width="width" centered>
          <p class="mt-2">{{ props.row.total }}</p>
        </b-table-column>
        <b-table-column v-slot="props" field="completetask" label="已完成" :width="width" centered>
          <p class="mt-2">{{ props.row.completed }}</p>
        </b-table-column>
        <b-table-column v-slot="props" field="exectask" label="执行中" :width="width" centered>
          <p class="mt-2">{{ props.row.exec }}</p>
        </b-table-column>
        <b-table-column v-slot="props" field="holdtask" label="挂起" :width="width" centered>
          <p class="mt-2">{{ props.row.hold }}</p>
        </b-table-column>
        <b-table-column v-slot="props" field="holdtask" label="冻结" :width="width" centered>
          <p class="mt-2">{{ props.row.block }}</p>
        </b-table-column>
        <b-table-column v-if="showprocess === true" v-slot="props" field="covers" label="进度">
          <b-progress type="is-cblue-3" :value="props.row.covers" class="margin-top-bottom" size="is-small" />
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>

<script>
import { getAllTaskByProjectAndUser, getReleaseTaskByBasic } from '@/scripts/welcome'
export default {
  /**
   * NOTICE: 一个table,展示数据
   * 主页展示
   * 展示对应项目的相应数据
   * 根据任务类型展示
   */
  name: 'ProjectTotalTable',
  props: {
    projectname: String,
    /**
     * 条纹
     */
    striped: {
      type: Boolean,
      default: false
    },
    /**
     * 格式略小
     */
    narrowed: {
      type: Boolean,
      default: true
    },
    /**
     * 鼠标焦点高亮
     */
    hoverable: {
      type: Boolean,
      default: false
    },
    /**
     * 表框线条
     */
    bordered: {
      type: Boolean,
      default: false
    },
    /**
     * 宽度
     */
    width: {
      type: Number,
      default: 100
    },
    /**
     * 是否展示进度条
     */
    showprocess: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      /**
       * 全数据
       */
      alldata: []
    }
  },

  watch: {
    projectname: {
      immediate: true,
      handler(val) {
        this.getAllData(val)
      },
      deep: true
    }
  },
  methods: {
    getAllData(projectname) {
      getAllTaskByProjectAndUser(projectname.toLowerCase())
        .then(result => {
          this.alldata = result
          // UPDATE: 2021-06-21 还要获取释放任务，这是一个单独的，但依然在WELCOME内展示
          getReleaseTaskByBasic()
            .then(relresult => {
              this.alldata.push(relresult)
            })
            .catch(() => {})
        })
        .catch(err => {
          this.alldata = err
        })
    }
  }
}
</script>

<style scoped>
.margin-top-bottom >>> progress {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.margin-top-bottom >>> p {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.message.is-small {
  font-size: 0.6rem;
}
</style>
