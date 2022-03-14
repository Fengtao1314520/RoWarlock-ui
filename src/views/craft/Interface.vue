<template>
  <v-app>
    <v-card>
      <v-tabs v-model="tab" background-color="indigo accent-4" dark icons-and-text>
        <v-tab href="#Interface">
          Interface
          <v-icon>mdi-expansion-card</v-icon>
        </v-tab>
        <v-tab href="#Para&Func">
          Para&Func
          <v-icon>mdi-progress-wrench</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="Interface">
          <test-suite />
        </v-tab-item>
        <v-tab-item value="Para&Func">
          <para-func />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import TestSuite from '@/components/Interface/Entrance/TestSuite'
import ParaFunc from '@/components/Interface/Entrance/ParaFunc'
export default {
  name: 'Interface',
  components: {
    TestSuite,
    ParaFunc
  },
  data() {
    return {
      tab: null
    }
  },
  methods: {}
}
</script>

<style></style>
