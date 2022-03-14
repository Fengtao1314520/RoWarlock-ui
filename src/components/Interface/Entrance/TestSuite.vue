<template>
  <v-card class="d-flex flex-row">
    <v-navigation-drawer :expand-on-hover="false" permanent class="d-flex pa-2 col-2">
      <div>
        <v-list dense>
          <v-list-item link>
            <v-list-item-content>
              <v-btn depressed color="indigo accent-3" dark @click="LoadTestSuite()">
                载入
              </v-btn>
              <v-btn color="pink accent-2" dark depressed @click="ExportTestSuite()">
                导出
              </v-btn>
              <v-file-input v-model="selectedfile" truncate-length="15" accept="file,.json" label="导入testsuite文件" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card loading outlined>
          <v-card-title>
            <v-btn icon color="indigo" @click.native="addNew(-1, -1)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            TestSuite
          </v-card-title>
          <v-list dense link shaped>
            <v-list-group v-for="(suiteitem, i) of localtestsuite" :key="i" prepend-icon="mdi-menu-open">
              <template v-slot:activator>
                <v-list-item-title>{{ suiteitem.name }}</v-list-item-title>
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon color="indigo">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="addNew(i, -1)">添加</v-list-item>
                    <v-list-item @click="renameItem(suiteitem.name, i, -1)">修改名称</v-list-item>
                    <v-list-item @click="removeOld(i, -1)">删除</v-list-item>
                  </v-list>
                </v-menu>
              </template>
              <v-list-group
                v-for="(caseitem, j) of suiteitem.cases"
                :key="j"
                sub-group
                no-action
                prepend-icon="mdi-counter"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ caseitem.name }}</v-list-item-title>
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon color="indigo">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item @click="addNew(i, j)">添加</v-list-item>
                      <v-list-item @click="renameItem(caseitem.name, i, j)">修改名称</v-list-item>
                      <v-list-item @click="removeOld(i, j)">删除</v-list-item>
                    </v-list>
                  </v-menu>
                </template>
                <v-list-item
                  v-for="(stepitem, k) of caseitem.steps"
                  :key="k"
                  dense
                  link
                  shaped
                  class="pl-6"
                  @dblclick="clickStepElement(stepitem)"
                >
                  <v-list-item-title>{{ stepitem.name }}</v-list-item-title>
                  <v-chip small :color="returnTagColor(stepitem.request.method)" label text-color="white">
                    <p class="mr-3 mt-4">{{ stepitem.request.method }}</p>
                  </v-chip>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </div>
    </v-navigation-drawer>
    <div class="col-10">
      <v-tabs v-model="tabindex" color="deep-purple accent-4" @change="changeTab">
        <v-tab v-for="(item, index) in activesteps" :key="index">
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabindex">
        <v-tab-item v-for="(item, index) in activesteps" :key="index">
          <v-card flat>
            <request-main ref="reqMain" @close-tab="closeTab" @delete-step="deleteStep" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="showdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">更改设置</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="showdialog.name" label="名称" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>新增或修改 suite/case/step时，请输入名称</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="showdialog.isshow = false">
            关闭
          </v-btn>
          <v-btn color="green darken-1" text @click="dialogSave()">
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { METHOD } from '@/scripts/internal'
import RequestMain from '@/components/Interface/SingleRequest/RequestMain'
import { exportFile, AssistTestSuite } from '../../../scripts/fileFunc'
import { getAllDataToServer } from '../../../scripts/craft_interface'
export default {
  name: 'TestSuite',
  components: {
    RequestMain
  },
  data() {
    return {
      /**
       * suite
       * dialog
       */
      showdialog: {
        isshow: false,
        changename: false,
        /** 若新建suite
         * 名称
         */
        name: '',
        /**
         * 当添加suite,case时为-2
         * 当添加step时，X为suite的index
         */
        indexX: -2,
        /**
         * 当添加step时，Y为case的index
         */
        indexY: -2
      },
      /**
       * 本地的testsuite
       */
      localtestsuite: [],

      /**
       * 已选择的文件
       */
      selectedfile: null,
      /**
       * 绑定的活动tab index值
       * 默认0
       */
      tabindex: -1,
      /**
       * 活动的步骤
       */
      activesteps: []
    }
  },
  watch: {
    selectedfile: {
      immediate: false,
      handler(val) {
        if (val != null) {
          this.ImportTestSuite(val)
        }
      },
      deep: true
    }
  },

  methods: {
    /**
     * 导入TestSuite
     */
    ImportTestSuite(file) {
      const that = this // 定义
      // 新建一个FileReader
      const reader = new FileReader()
      // 读取文件
      reader.readAsText(file, 'UTF-8')
      // 读取完文件之后会回来这里
      reader.onload = function(e) {
        // 读取文件内容(赋值)
        const importcontent = e.target.result
        // 接下来可对文件内容进行处理

        that.$store.commit('importTestSuite', {
          content: importcontent,
          save: true
        }) // 提交
        // UPDATE: 2021-03-31 使用导入的数据
        that.localtestsuite = that.$store.state.testsuite.testsuite
      }
    },

    /**
     * 导出testsuite
     */
    ExportTestSuite() {
      const testsuite = this.$store.state.testsuite.testsuite
      // UPDATE: 2021-04-08需要删除部分不必要的内容
      const newtestsuite = AssistTestSuite(testsuite)
      const str = JSON.stringify(newtestsuite)
      exportFile(str, 'testsuite')
    },

    /**
     * 读取数据库相应数据
     */
    LoadTestSuite() {
      const that = this
      getAllDataToServer()
        .then(content => {
          if (content !== null) {
            // 接下来可对文件内容进行处理
            this.$store.commit('importTestSuite', {
              content: content,
              save: false
            }) // 提交
            that.localtestsuite = that.$store.state.testsuite.testsuite
          }
        })
        .catch(() => {
          that.$buefy.toast.open({
            duration: 3000,
            message: '获取数据失败!您的个人ID没有生成',
            type: 'is-cred-2'
          })
        })
    },

    /**
     * 添加新的一个suite/case/step
     */
    addNew(indexX, indexY) {
      this.showdialog.indexX = indexX
      this.showdialog.indexY = indexY
      this.showdialog.isshow = true
    },

    /**
     * 删除一个suite/case/step
     */
    removeOld(indexX, indexY) {
      /**
       * 临时赋值
       */
      const temp = {
        // name: this.showmodal.name,
        indexX: indexX,
        indexY: indexY
      }
      this.$store.commit('removeOldTestSuite', temp)
    },

    /**
     * 重命名
     */
    renameItem(name, indexX, indexY) {
      this.showdialog.changename = true
      this.showdialog.indexX = indexX
      this.showdialog.indexY = indexY
      this.showdialog.name = name
      this.showdialog.isshow = true
    },

    /**
     * 关闭dialog且保存
     */
    dialogSave() {
      if (this.showdialog.changename === true) {
        // 修改
        this.$store.commit('changeNameTestSuite', this.showdialog)
      } else {
        // 添加
        this.$store.commit('addNewTestSuite', this.showdialog)
      }
      // 恢复默认值
      this.showdialog.isshow = false
      this.showdialog.changename = false
      this.showdialog.name = ''
      this.showdialog.indexX = -2
      this.showdialog.indexY = -2
      // NOTICE: 非严格模式也能更改
      this.localtestsuite = this.$store.state.testsuite.testsuite
    },

    /**
     * 返回tag颜色
     */
    returnTagColor(method) {
      let color = ''
      if (method === METHOD.POST) {
        color = 'deep-orange darken-1'
      } else if (method === METHOD.GET) {
        color = 'green'
      } else if (method === METHOD.PUT) {
        color = 'blue'
      } else if (method === METHOD.DELETE) {
        color = 'red'
      } else if (method === METHOD.PATCH) {
        color = 'gray'
      }
      return color
    },

    /**
     * 双击step元素
     * NOTICE:右侧展示整个step信息
     */
    clickStepElement(element) {
      const diff = this.checkStepDiff(element, this.activesteps) // 主要对比id
      if (diff !== true) {
        // 属于新增的打开步骤,添加进入到活动的步骤Array内，然后更改活动tab
        this.activesteps.push(element)
      }
    },

    /**
     * 检查两个step是否一致
     */
    checkStepDiff(stepVal, activeVal) {
      let result = false
      activeVal.forEach(element => {
        if (element.id === stepVal.id) {
          result = true
        }
      })
      return result
    },

    /**
     *更改tab时写入reqMain
     */
    changeTab(val) {
      if (val !== undefined) {
        setTimeout(() => {
          this.$refs.reqMain[val].remoteTransStep(this.activesteps[val])
        }, 10)
      }
    },

    /**
     * 关闭tab
     */
    closeTab() {
      this.activesteps.splice(this.tabindex, 1)
      this.tabindex - 1
    },

    deleteStep() {
      // 组件内对值变更后向外部发送事件通知
      this.$store.commit('deleteStep', this.activesteps[this.tabindex])
      this.closeTab()
    }
  }
}
</script>

<style></style>
