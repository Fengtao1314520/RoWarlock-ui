<template>
  <div>
    <ve-ring v-if="ctype == 'ring'" :data="chartdata" :settings="chartset" :colors="colors" />
    <ve-line v-if="ctype == 'line'" :data="chartdata" :settings="chartset" :colors="colors" />
    <ve-histogram v-if="ctype == 'histogram'" :data="chartdata" :settings="chartset" :colors="colors" />
    <ve-bar v-if="ctype == 'bar'" :data="chartdata" :settings="chartset" :colors="colors" />
    <ve-pie v-if="ctype == 'pie'" :data="chartdata" :settings="chartset" :colors="colors" />
    <ve-heatmap v-if="ctype == 'heatmap'" :data="chartdata" :settings="chartset" :colors="colors" />
  </div>
</template>

<script>
export default {
  name: 'ChartTable',
  props: {
    /**
     * 标题
     */
    title: {
      type: String,
      default: '标题'
    },
    /**
     * 图表设置
     */
    chartset: Object,
    /**
     * 数据
     */
    datarows: Array,
    /**
     * chart类型
     */
    ctype: {
      type: String,
      default: 'ring'
    },
    /**
     * 定义颜色
     */
    colors: {
      type: Array,
      default: function() {
        return ['#7579e7', '#ee9595', '#74c7b8', '#ffd66b', '#ffabe1', '#583d72']
      }
    }
  },
  data() {
    return {
      /**
       *总数据对象
       */
      chartdata: {
        /**
         * 数据
         */
        rows: []
      }
    }
  },

  watch: {
    /**
     * 数据监听
     * datarows
     */
    datarows(val) {
      this.chartdata.rows = val
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.chartdata.rows = this.datarows
    }
  }
}
</script>

<style></style>
