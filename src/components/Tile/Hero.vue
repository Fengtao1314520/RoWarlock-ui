<template>
  <v-card>
    <v-row>
      <v-col cols="9">
        <v-alert
          dense
          class="mb-0 mt-1 pr-0"
          border="left"
          colored-border
          color="deep-purple accent-4"
        >
          <p>
            欢迎回来:
            <span class="indigo--text">
              {{ heroinfo.name }}
            </span>
          </p>
          <p>时间:{{ heroinfo.lastlogintime }}</p>
        </v-alert>
      </v-col>
      <v-col>
        <v-avatar size="64" class="mt-3">
          <img src="../../../public/img/man.png" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-divider class="mt-1 mb-2"></v-divider>
    <v-row>
      <v-col>
        <v-alert type="success" shaped dense class="ma-2">
          <div class="text-h6 mt-n1 text--white">已完成</div>
          <div class="text-h4">{{ heroinfo.completed }}</div>
        </v-alert>
      </v-col>
      <v-col>
        <v-alert type="info" color="indigo" shaped dense class="ma-2">
          <div class="text-h6 mt-n1 text--white">待执行</div>
          <div class="text-h4">{{ heroinfo.exec }}</div>
        </v-alert>
      </v-col>
    </v-row>
    <v-divider class="mt-1  mb-2"></v-divider>
    <v-row>
      <v-col>
        <div id="dailyRecrod"></div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import * as G2Plot from '@antv/g2plot'
import { hero, personalactive } from '../../scripts/welcome'
import { nowdate } from '../../scripts/common.js'
export default {
  name: 'Hero',
  components: {},
  props: {},
  data() {
    return {

      heroinfo: {},
      nowdate: nowdate(),
      line: null,
      /**
       * 表数据
       **/
      linedata: [],
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
    }

  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 处理图表数据
     * 按照每日分拆新增改查
     * TODO: 数据从后端是全英文的，所以还需要再做二次处理
     */
    init() {
      let herotemplate
      hero()
        .then(result => {
          herotemplate = result
        })
        .catch(demo => {
          herotemplate = demo
        })
        .finally(() => {
          this.heroinfo = herotemplate
        })

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
    }

  }
}
</script>

<style scoped></style>
