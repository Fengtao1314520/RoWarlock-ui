<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <b-tabs type="is-boxed" size="is-medium">
        <b-tab-item label="Charts" icon="chart-scatter-plot-hexbin" :disabled="true">
          <div class="tile is-ancestor">
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification is-light">
                <chart-table :datarows="rows1" :chartset="set1" title="测试1" />
              </div>
              <div class="tile is-child notification is-light">
                <chart-table :datarows="rows1" :chartset="set2" title="测试2" ctype="line" />
              </div>
              <div class="tile is-child notification is-light">
                <chart-table :datarows="rows1" :chartset="set2" title="测试2" ctype="histogram" />
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification is-light">
                <chart-table :datarows="rows1" :chartset="set2" title="测试2" ctype="bar" />
              </div>
              <div class="tile is-child notification is-light">
                <chart-table :datarows="rows1" :chartset="set1" title="测试2" ctype="pie" />
              </div>
              <div class="tile is-child notification is-light"></div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child notification is-light"></div>
              <div class="tile is-child notification is-light"></div>
              <div class="tile is-child notification is-light"></div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import ChartTable from '@/components/Chart/ChartTable'
export default {
  name: 'Charts',
  components: {
    TitleBar,
    ChartTable
  },
  data() {
    return {
      rows1: [
        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
      ],
      set1: {
        dimension: '日期',
        metrics: '访问用户'
      },
      set2: {
        metrics: ['访问用户', '下单用户'],
        dimension: ['日期']
      }
    }
  },
  computed: {
    titleStack() {
      return ['RoWalock', '报表']
    }
  },
  mounted() {},

  methods: {}
}
</script>
