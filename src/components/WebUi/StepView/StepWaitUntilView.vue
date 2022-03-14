<template>
  <v-card elevation="0">
    <v-alert class="my-1 ml-2" dense border="left" colored-border color="purple accent-4" elevation="0">
      <v-card elevation="0">
        <v-row>
          <v-col cols="1" class="mr-4">
            <v-btn class="mb-4 white--text rounded-r-xl" color="light-blue darken-3" depressed>
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
                <v-autocomplete v-model="step.TreatErrorsAsWarnings" class="pt-2" :items="booleanlist" dense auto-select-first>
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
    <v-alert
      v-if="step.ActionType !== 'WaitUntil.PageIsLoaded'"
      class="mt-2 ml-2"
      dense
      border="left"
      colored-border
      color="green accent-4"
      elevation="0"
    >
      <v-card elevation="0">
        <v-row>
          <v-col cols="1" class="mr-4">
            <v-btn class="rounded-r-xl" color="yellow accent-4" depressed>
              <v-icon left>mdi-label</v-icon>
              More
            </v-btn>
          </v-col>
          <v-col cols="2"> <v-btn depressed class="rounded-l-xl white--text" color="purple darken-1" @click.stop="moredialog.show = true">
            展示AreInfo信息列表
          </v-btn></v-col>
        </v-row>

        <v-dialog v-model="moredialog.show" width="800" persistent>
          <v-card>
            <v-card-title class="text-h5">
              Assert断言信息列表(AreInfo)
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-btn depressed color="grey lighten-2" @click="moredialog.show = false">CLOSE</v-btn>
              </v-card-actions>
            </v-card-title>
            <v-card-text>
              <div v-for="(areinfo, index) in step.AreInfo" :key="index">
                <v-alert dense class="mb-1" border="left" colored-border color="deep-purple accent-4" elevation="2">
                  <v-row class="ma-0">
                    <v-col class="pb-0">
                      <v-text-field v-model="areinfo.ElementId" dense clearable>
                        <template v-slot:label>
                          <p class="indigo--text text--accent-4 my-1">元素Id:</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <v-autocomplete v-model="areinfo.ActualType" :items="actuallist" dense auto-select-first>
                        <template v-slot:label>
                          <p class="indigo--text text--accent-4 my-1">实际值类型:</p>
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0">
                    <v-col class="pb-0">
                      <v-text-field v-model="areinfo.ExpectedValue" dense clearable>
                        <template v-slot:label>
                          <p class="indigo--text text--accent-4 my-1">预期值:</p>
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col v-if="areinfo.ActualType === 'RoWebElement.GetAttribute'">
                      <v-text-field v-model="areinfo.Name" dense clearable>
                        <template v-slot:label>
                          <p class="indigo--text text--accent-4 my-1">属性名称:</p>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card>
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: 'StepWaitUntilView',
  props: {
    step: Object
  },
  data() {
    return {
      // 操作列表
      optlist: [
        'WaitUntil.PageIsLoaded',
        'WaitUntil.StringLength',
        'WaitUntil.StringContains',
        'WaitUntil.AreEqual',
        'WaitUntil.AreNotEqual',
        'WaitUntil.IsTrue',
        'WaitUntil.IsFalse'
      ],
      // 实际值对应
      actuallist: [
        'Browser.IsPageLoaded',
        'Browser.Title',
        'Browser.Url',
        'RoWebElement.Displayed',
        'RoWebElement.Enabled',
        'RoWebElement.Selected',
        'RoWebElement.Text',
        'RoWebElement.GetAttribute'
      ],
      // boolean 列表
      booleanlist: [true, false],
      moredialog: {
        show: false
      }
    }
  },

  watch: {
    step: {
      immediate: true,
      handler(val) {
        // console.log(val)
      },
      deep: true
    },
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
