<template>
  <v-card>
    <v-row>
      <v-col>
        <div id="dailyRecrod"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div id="timelinechart"></div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { personalactive } from '../../scripts/welcome'
import { getYestdayTaskInfo } from '../../scripts/welcome'
import * as G2Plot from '@antv/g2plot'
export default {
  name: 'Activation',
  data() {
    return {
      line: null,
      bar: null,
      /**
       * 表数据
       **/
      linedata: [],
      /**
       * 表数据
       * */
      bardata: [],
      /**
       * 表配置
       * */
      lineconfig: {
        legend: {
          flipPage: false
        },
        xAxis: {
          tickLine: {
            visible: false
          }
        },
        smooth: true,
        forceFit: false,
        width: 400,
        height: 220,
        xField: 'x',
        yField: 'y',
        seriesField: 'series',
        lineStyle: {
          lineWidth: 4
        },
        color: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A']
      },
      /**
       * 表设置
       * */
      barconfig: {
        legend: {
          visible: false,
          flipPage: false
        },
        xAxis: {
          line: {
            visible: true
          },
          label: {
            visible: true
          }
        },
        label: {
          position: 'right'
        },
        forceFit: false,
        width: 440,
        height: 300,
        xField: 'y',
        yField: 'x',
        seriesField: 'type',
        barSize: 16,
        color: [
          '#42A5F5',
          '#FF80AB',
          '#FFF59D'
        ]
      }
    }
  },
  watch: {
    linedata: {
      immediate: true,
      handler(val) {
        if (this.line != null) {
          this.line.changeData(val)
          this.line.render()
        }
      },
      deep: true
    },
    bardata: {
      immediate: false,
      handler(val) {
        if (this.bar != null) {
          this.bar.changeData(val)
          this.bar.render()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 处理数据
      personalactive()
        .then(result => {
          this.linedata = result
        })
        .catch(demo => {
          this.linedata = demo
        })
        .finally(() => {
          // 临时值
          const defaultvalue = this.linedata

          this.line = new G2Plot.Line('dailyRecrod', {
            defaultvalue,
            ...this.lineconfig
          })
          this.line.changeData(this.linedata)
          this.line.render()
        })

      getYestdayTaskInfo()
        .then(result => {
          this.bardata = result
        })
        .catch(demo => {
          this.bardata = demo
        })
        .finally(() => {
          // 更新数据
          // 临时值
          const defaultvalue = this.bardata
          this.bar = new G2Plot.Bar('timelinechart', {
            defaultvalue,
            ...this.barconfig
          })
          this.bar.changeData(defaultvalue)
          this.bar.render()
        })
    }
  }
}
</script>

<style></style>
