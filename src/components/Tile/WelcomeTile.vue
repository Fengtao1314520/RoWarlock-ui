<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <card-component title="微型看板" icon="mdi-microwave">
            <hero />
          </card-component>
        </v-col>
        <v-col cols="6">
          <card-component title="最后执行" icon="mdi-run">
            <last-run />
          </card-component>
        </v-col>
        <v-col>
          <sample-messages />
        </v-col>
        <!--
        <v-col cols="3" class="pa-1">
          <card-component title="个人活跃度" icon="mdi-chart-arc">
            <activation />
          </card-component>
        </v-col>
        -->
      </v-row>
      <v-row>
        <v-col cols="6">
          <card-component title="工作详情" icon="mdi-run" class="mt-4">
            <work-chart />
          </card-component>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <card-component title="释放历史记录" icon="mdi-relative-scale">
            <history-release />
          </card-component>
        </v-col>
        <v-col>
          <card-component title="任务总览" icon="mdi-calendar-check">
            <task-tile />
          </card-component>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import CardComponent from '../Card/CardComponent.vue'
import Hero from './Hero'
import Activation from './Activation.vue'
import LastRun from './LastRun'
import TaskTile from './TaskTile'
import HistoryRelease from './HistoryRelease'
import WorkChart from './WorkChart'
import SampleMessages from './SampleMessages'

export default {
  name: 'WelcomeTile',
  components: {
    SampleMessages,
    WorkChart,
    HistoryRelease,
    TaskTile,
    LastRun,
    CardComponent,
    Hero,
    Activation
  },
  data() {
    return {
      /**
       * 默认显示tab
       */
      defaulttab: 0
    }
  },
  computed: {
    defaultProjectName() {
      return [
        this.$store.state.twoproject.defaulttwoprojs[0].to.toUpperCase(),
        this.$store.state.twoproject.defaulttwoprojs[1].to.toUpperCase()
      ]
    }
  },
  mounted() {},
  methods: {
  }
}
</script>

<style scoped></style>
