<template>
  <v-card elevation="0">
    <v-alert class="my-1 ml-2" dense border="left" colored-border color="purple accent-4" elevation="0">
      <v-card elevation="0">
        <v-col cols="1" class="mr-4">
          <v-btn class="white--text rounded-r-xl" color="light-blue darken-3" depressed>
            <v-icon left>mdi-label</v-icon>
            Basic
          </v-btn>
        </v-col>
        <v-row>
          <v-col cols="3">
            <v-autocomplete v-model="step.ActionType" :items="optlist" auto-select-first dense class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">操作类型:</p>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.SwitchToFrame'" cols="3">
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
    <v-alert class="my-1 ml-2" dense border="left" colored-border color="green accent-4" elevation="0">
      <v-card elevation="0">
        <v-row>
          <v-col cols="1" class="mr-4">
            <v-btn class="rounded-r-xl" color="yellow accent-4" depressed>
              <v-icon left>mdi-label</v-icon>
              More
            </v-btn>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.GoToUrl'" cols="8">
            <v-text-field v-model="step.Url" dense clearable class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">网址:</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.TakeSnapshot'" cols="3">
            <v-text-field v-model="step.ImageFile" clearable dense class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">截图名称:</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.SwitchToTab' || step.ActionType === 'Browser.CloseTab'" cols="3">
            <v-text-field v-model="step.TabName" dense clearable class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">Tab名称:</p>
              </template>
            </v-text-field>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.SwitchToFrame'" cols="1">
            <v-autocomplete v-model="step.SwitchToNew" :items="booleanlist" dense auto-select-first class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">切换iFrame:</p>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col
            v-if="
              step.ActionType === 'Browser.Back' ||
                step.ActionType === 'Browser.Forward' ||
                step.ActionType === 'Browser.Refresh' ||
                step.ActionType === 'Browser.Stop'
            "
            cols="1"
          >
            <v-autocomplete v-model="step.AutoStopLoad" :items="booleanlist" dense auto-select-first class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">自动停止刷新:</p>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col v-if="step.ActionType === 'Browser.ExecuteScript'" cols="4">
            <v-textarea v-model="step.JavaScript" clearable dense no-resize rows="3" class="pt-2">
              <template v-slot:label>
                <p class="indigo--text text--accent-4 my-1">输入JS:</p>
              </template>
            </v-textarea>
          </v-col>
        </v-row>

      </v-card>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: 'StepBrowserView',
  props: {
    step: Object
  },
  data() {
    return {
      // 操作列表
      optlist: [
        'Browser.Back',
        'Browser.Close',
        'Browser.CloseTab',
        'Browser.ExecuteScript',
        'Browser.Forward',
        'Browser.GoToUrl',
        'Browser.Refresh',
        'Browser.Stop',
        'Browser.SwitchFrame',
        'Browser.SwitchToTab',
        'Browser.TakeSnapshot'
      ],
      // boolean 列表
      booleanlist: [true, false]
    }
  },
  computed: {
    /**
     * 获取元素id
     * @return {*[]}
     */
    getElementId() {
      return []
    }
  },
  watch: {
    'step.ActionType': {
      immediate: true,
      handler(val) {
        // 更新Method
        this.step.Method.XEleName = val
        this.step.Method.MethodName = val.split('.')[1]
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
