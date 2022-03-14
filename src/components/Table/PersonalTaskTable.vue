<template>
  <div>
    <b-table
      :data="localdata"
      :per-page="prepage"
      pagination-simple
      paginated
      focusable
      :selected.sync="selectdata"
      @dblclick="openTaskDetail()"
    >
      <template v-for="column in columns">
        <b-table-column :key="column.id" v-bind="column">
          <template v-if="column.searchable" #searchable="props">
            <b-input v-model="props.filters[props.column.field]" placeholder="检索" icon="magnify" size="is-small" />
          </template>
          <template v-slot="props">
            <div v-if="column.field === 'tasktype'">
              <b-tag type="is-cblue-2" size="is-meduim">
                <p class="is-size-6 has-text-weight-bold">{{ props.row[column.field] }}</p>
              </b-tag>
            </div>
            <div v-else-if="column.field === 'taskid'">
              <p class="is-size-7">{{ props.row[column.field] }}</p>
            </div>
            <div v-else>
              {{ props.row[column.field] }}
            </div>
          </template>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
/**
 * OBSOLETE: 2020-2-9 可能此方法会是一个过期的
 * 个人任务界面 一个单独任务类型的子table
 */

import ViewJson from '@/components/Article/ViewJson.vue'
export default {
  name: 'PersonalTaskTable',
  components: {},
  props: {
    /**
     * 每页默认显示
     */
    prepage: {
      type: Number,
      default: 5
    },
    /**
     * 所有数据,通过up方法更新
     */
    alldata: Array,
    width: {
      type: Number,
      default: 280
    },
    showtaskid: {
      type: Boolean,
      default: false
    },
    allowsearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * 当前选用的任务
       */
      selectdata: {},

      /**
       *  供以数据监听使用，本地数据,将上层数据与本层数据隔离开,仅在本地做数据的处理
       */
      localdata: [],

      /**
       * title头
       */
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
          centered: true,
          searchable: false
        },
        {
          field: 'taskid',
          label: '任务 id',
          width: this.width,
          visible: this.showtaskid,
          searchable: false
        },
        {
          field: 'taskname',
          label: '任务名称',
          width: this.width,
          searchable: true
        },
        {
          field: 'tasktype',
          label: '类型',
          width: '100',
          searchable: true
        },
        {
          field: 'taskstatus',
          label: '状态',
          width: '100',
          searchable: true
        }
      ]
    }
  },
  watch: {
    /**
     * 监听props的绑定数据
     */
    alldata: {
      immediate: false,
      handler(val) {
        this.localdata = val
      },
      deep: true
    }
  },
  mounted() {},
  methods: {
    /**
     * 双击弹出详情
     */
    openTaskDetail() {
      // 作为一个modal弹出任务详情
      this.$buefy.modal.open({
        parent: this,
        component: ViewJson,
        props: {
          item: this.selectdata
        },
        hasModalCard: false,
        trapFocus: true
      })
    }
  }
}
</script>

<style scoped>
.margin-0 {
  margin: 0rem;
}
</style>
