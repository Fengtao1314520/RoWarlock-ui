<template>
  <div>
    <div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <b-button size="is-small" type="is-success" @click="addMapping()">添加绑定</b-button>
          </div>
        </div>
        <div class="level-right"></div>
      </div>
    </div>
    <hr class="margin-05" />
    <div>
      <b-field label="选取工作台" label-position="on-border" type="is-cblue-2">
        <b-select expanded @input="changeSelectValue">
          <option v-for="(item, index) in mapping" :key="index" :value="item">
            {{ item }}
          </option>
        </b-select>
      </b-field>
    </div>
    <hr class="margin-05" />
    <div>
      <b-table
        :data="tabledata"
        :columns="tablecolumns"
        :checked-rows.sync="checkedRows"
        checkable
        paginated
        :per-page="10"
        pagination-simple
        striped
        narrowed
        pagination-size="is-small"
      ></b-table>
    </div>
  </div>
</template>

<script>
import { getAllowMappingProject } from '@/scripts/welcome'
import { getFunc, postFunc } from '@/scripts/internal/httpFunc'

export default {
  name: 'MappingProject',
  components: {},
  props: {
    /**
     * 项目名称
     */
    projectname: String,
    /**
     * 项目排序
     */
    projectindex: Number
  },
  data() {
    return {
      /**
       * 可被映射的工作台
       */
      mapping: [],
      /**
       * 当前工作台
       */
      worktable: '',
      /**
       * table列展示
       */
      tablecolumns: [
        {
          field: 'name',
          label: 'Task名称',
          width: '300'
        }
      ],
      /**
       * table数据
       */
      tabledata: [],
      /**
       * 已选择row
       */
      checkedRows: []
    }
  },
  mounted() {
    this.getMapping()
  },
  methods: {
    /**
     * 获取映射项目
     */
    getMapping() {
      getAllowMappingProject()
        .then(result => {
          // 如果获取值不是''
          if (result !== '') {
            this.mapping = result.belong
          }
        })
        .catch(() => {})
        .finally(() => {
          // this.getDefaultTasks() // 项目初始化
        })
    },

    /**
     * 更改选择项目,并且获取信息
     */
    changeSelectValue(val) {
      this.worktable = val
      // 每做一次change都要做一次
      getFunc('/query/worktable/getall', {
        worktable: val
      })
        .then(result => {
          if (result.resstatus === false) {
            // 获取失败
            this.$buefy.snackbar.open({
              message: '获取失败!请检查后端、前台的工作台数据',
              type: 'is-cyellow-1',
              position: 'is-top'
            })
          } else {
            this.tabledata = [] // 初始化
            this.tabledata = JSON.parse(result.resbody)
          }
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message: '获取异常!请检查后端、前台的工作台数据、代码',
            type: 'is-cred-2',
            position: 'is-top'
          })
        })
    },

    /**
     * 添加绑定
     */
    addMapping() {
      // 创建数据
      const data = {
        tasklist: JSON.stringify(this.checkedRows),
        projectname: this.projectname,
        worktable: this.worktable,
        projectindex: this.projectindex
      }
      this.$store.commit('updateViewProject', data) // 提交更新VUEX
      // 给到后端
      postFunc('/craft/addbelongproject', data)
        .then(result => {
          this.$buefy.snackbar.open({
            message: result.meesage,
            type: 'is-cgreen-2',
            position: 'is-top'
          })
        })
        .catch(() => {
          this.$buefy.snackbar.open({
            message: '提交失败!数据无法保存至后端',
            type: 'is-cred-2',
            position: 'is-top'
          })
        })
    }
  }
}
</script>

<style scoped>
.margin-05 {
  margin: 0.5rem;
}
</style>
