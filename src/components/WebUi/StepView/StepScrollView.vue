<template>
  <v-card elevation="0">
    <v-alert class="my-1 ml-2" dense border="left" colored-border color="purple accent-4" elevation="0">
      <v-card elevation="0">
        <v-row>
          <v-col cols="1" class="mr-4">
            <v-btn class="white--text rounded-r-xl" color="light-blue darken-3" depressed>
              <v-icon left>mdi-label</v-icon>
              Basic
            </v-btn>
          </v-col>
          <v-col cols="3">
            <v-autocomplete v-model="step.ActionType" :items="optlist" auto-select-first dense class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">操作类型:</p>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="step.ElementId" dense clearable class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">元素Id:</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col>
                <v-text-field v-model="step.LineInfo" dense clearable class="pt-2">
                  <template v-slot:label>
                    <p class="indigo--text text--accent-4 my-1">执行序列:</p>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="step.TreatErrorsAsWarnings"
                  :items="booleanlist"
                  dense
                  auto-select-first
                  class="pt-2"
                >
                  <template v-slot:label>
                    <p class="indigo--text text--accent-4 my-1">失败作为警告:</p>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-text-field v-model="step.Timeout" dense clearable class="pt-2">
                  <template v-slot:label>
                    <p class="indigo--text text--accent-4 my-1">预设超时:</p>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: 'StepScrollView',
  props: {
    step: Object
  },
  data() {
    return {
      // 操作列表
      optlist: ['Scroll.Down', 'Scroll.Up'],
      // boolean 列表
      booleanlist: [true, false]
    }
  }
}
</script>

<style scoped></style>
