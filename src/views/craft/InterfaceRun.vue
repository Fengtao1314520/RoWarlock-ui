<template>
  <v-app>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="purple darken-1"
        dark
        right
        icons-and-text
      >
        <v-tab href="#TestRun">
          TestRun
          <v-icon>mdi-expansion-card</v-icon>
        </v-tab>
        <v-tab href="#Execute">
          Execute
          <v-icon>mdi-run-fast</v-icon>
        </v-tab>
        <v-tab href="#Result">
          Result
          <v-icon>mdi-omega</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="TestRun">
          <test-run />
        </v-tab-item>
        <v-tab-item value="Execute">
          <execute @skipttoTestResult="skiptoTestResult" />
        </v-tab-item>
        <v-tab-item value="Result">
          <result :item="resultitem" :simpleresult="simpleresultitem" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import TestRun from '@/components/InterfaceRun/Entrance/TestRun'
import Execute from '@/components/InterfaceRun/Entrance/Execute'
import Result from '@/components/InterfaceRun/Entrance/Result'
export default {
  name: 'InterfaceRun',
  components: {
    TestRun,
    Execute,
    Result
  },
  data() {
    return {
      tab: null,
      resultitem: {},
      simpleresultitem: {}
    }
  },
  methods: {
    /**
     * 跳转至测试结果
     * @param item
     * @param simpleresult
     */
    skiptoTestResult(item, simpleresult) {
      // 跳转至result页面
      this.tab = 'Result'
      this.resultitem = item
      this.simpleresultitem = simpleresult
    }
  }
}
</script>

<style></style>
