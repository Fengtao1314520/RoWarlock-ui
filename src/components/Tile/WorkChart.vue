<template>
  <v-card>
    <v-row class="ma-0">
      <v-col v-for="(item, index) in worktabletask" :key="index" class="pa-0">
        <v-card elevation="0">
          <v-card-title class="pt-0 pb-0">
            {{ item.type }}
          </v-card-title>
          <v-card-text class="pa-0">
            <div :id="`lquid_${index}`"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { worktabletask } from '../../scripts/welcome'
import * as G2Plot from '@antv/g2plot'

export default {
  name: 'WorkChart',
  data() {
    return {
      /**
       * 工作台任务简介
       */
      worktabletask: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取工作台内前三的大任务的完成总数比
      worktabletask()
        .then(result => {
          this.worktabletask = result
        })
        .catch(demo => {
          this.worktabletask = demo
        })
        .finally(() => {
          this.worktabletask.forEach((element, index) => {
            const lquid = new G2Plot.Liquid('lquid_' + index, {
              percent: element.value / element.total,
              outline: {
                border: 2,
                distance: 4
              },
              wave: {
                length: 64
              },
              width: 128,
              height: 128
            })
            lquid.render()
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
