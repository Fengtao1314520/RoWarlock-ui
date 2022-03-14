<template>
  <v-card outlined class="pa-2">
    <v-row>
      <v-col cols="3">
        <v-card>
          <v-card-title>
            列表
          </v-card-title>
          <v-card-text>
            <v-row dense align="center" justify="space-around" class="mb-1">
              <v-col>
                <v-row dense>
                  <v-btn
                    shaped
                    small
                    depressed
                    class="mr-2 white--text"
                    color="green"
                    @click="createNewRelease()">
                    <v-icon left>
                      mdi-new-box
                    </v-icon>
                    新建
                  </v-btn>
                  <v-btn
                    shaped
                    small
                    depressed
                    class="mr-2 white--text"
                    color="blue accent-3"
                    @click="readAllRelease()">
                    <v-icon left>
                      mdi-book-open-variant
                    </v-icon>
                    读取
                  </v-btn>
                  <v-btn
                    shaped
                    small
                    depressed
                    class="mr-2 white--text"
                    color="blue accent-3">
                    <v-icon left>
                      mdi-import
                    </v-icon>
                    导入
                  </v-btn>
                  <v-btn
                    shaped
                    small
                    depressed
                    class="mr-2 white--text"
                    color="blue accent-3">
                    <v-icon left>
                      mdi-export
                    </v-icon>
                    导出
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="pa-0">
                <v-card outlined>
                  <v-list shaped dense>
                    <v-list-item-group v-model="leftlistconfig.selectedItemIndex" color="indigo">
                      <v-list-item
                        v-for="(item, i) in spiltreleaseitems[leftlistconfig.page - 1]"
                        :key="i"
                        @dblclick.native="dblclickItem(item)">
                        <v-list-item-icon>
                          <v-icon>mdi-reload-alert</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.name">
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                  <v-footer class="pa-0">
                    <v-pagination
                      v-model="leftlistconfig.page"
                      :length="leftlistconfig.maxpage"
                      :total-visible="leftlistconfig.visiblepage">
                    </v-pagination>
                  </v-footer>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card shaped>
          <v-banner single-line>
            <template v-slot:actions>
              <v-badge
                bordered
                :color="leftlockstatus.color"
                :icon="leftlockstatus.icon"
                overlap>
                <v-btn
                  text
                  class="white--text"
                  :color="leftlockstatus.color"
                  depressed
                  @click="lockReleaseCard()">
                  {{ leftlockstatus.text }}
                </v-btn>
              </v-badge>
            </template>
          </v-banner>
          <v-card v-if="JSON.stringify(selectitem)!='{}'" class="pa-3">
            <v-row dense>
              <v-col>
                <v-alert
                  border="left"
                  colored-border
                  color="deep-purple accent-4"
                  elevation="2">
                  <v-card class="d-flex justify-end" flat tile>
                    <v-card tile elevation="0">
                      <v-btn
                        class="mr-2 white--text"
                        small
                        color="light-blue darken-2"
                        :disable="leftlockstatus.locked"
                        @click="resetRelease()">
                        <v-icon left>
                          mdi-lock-reset
                        </v-icon>
                        重置
                      </v-btn>
                      <v-btn
                        class="mr-2 white--text"
                        small
                        color="red accent-3"
                        :disable="leftlockstatus.locked"
                        @click="deleteRelease()">
                        <v-icon left>
                          mdi-delete
                        </v-icon>
                        删除
                      </v-btn>
                      <v-btn
                        class="mr-2 white--text"
                        small
                        color="green accent-4"
                        :disable="leftlockstatus.locked"
                        @click="saveRelease()">
                        <v-icon left>
                          mdi-content-save-outline
                        </v-icon>
                        保存
                      </v-btn>
                    </v-card>
                  </v-card>
                </v-alert>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-card shaped class="pa-1">
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.name"
                          :disabled="leftlockstatus.locked"
                          label="名称"
                          dense
                          clearable>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-rename-box
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field v-model="selectitem.id" disabled dense label="编号ID">
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-identifier
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.createdate"
                          color="purple darken-2"
                          disabled
                          label="创建时间"
                          dense>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-calendar-clock
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.author"
                          :disabled="leftlockstatus.locked"
                          label="创建人"
                          dense
                          clearable>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-account-circle-outline
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider inset light class="mt-3 mb-3" />
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="selectitem.basic.product"
                          :items="releaseoption.product"
                          label="产品类别"
                          :disabled="leftlockstatus.locked"
                          dense>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-math-tan
                            </v-icon>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="selectitem.basic.type"
                          :items="releaseoption.type"
                          label="产品类型"
                          :disabled="leftlockstatus.locked"
                          dense>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-vector-difference-ab
                            </v-icon>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col>
                        <v-select
                          v-model="releaseoption.tempuppack"
                          :items="releaseoption.uppack"
                          label="是否包含升级包"
                          :disabled="leftlockstatus.locked"
                          dense>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-package-up
                            </v-icon>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.basic.relphase"
                          :disabled="leftlockstatus.locked"
                          label="年度释放标识"
                          dense
                          clearable>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-link
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-divider inset light class="mt-3 mb-3" />
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.basic.relversion"
                          :disabled="leftlockstatus.locked"
                          label="释放版本号"
                          dense
                          clearable>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-counter
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="selectitem.basic.configsvn"
                          :disabled="leftlockstatus.locked"
                          label="高级配置适配版本号"
                          dense
                          clearable>
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-cogs
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-dialog
                          ref="expectdialog"
                          v-model="releaseoption.expectmodal"
                          :return-value.sync="releaseoption.expectdate"
                          persistent
                          width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="releaseoption.expectdate"
                              label="预期释放日期"
                              readonly
                              :disabled="leftlockstatus.locked"
                              dense
                              v-bind="attrs"
                              v-on="on">
                              <template slot="prepend">
                                <v-icon :color="returnColor">
                                  mdi-calendar
                                </v-icon>
                              </template>
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="releaseoption.expectdate"
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="releaseoption.expectmodal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.expectdialog.save(releaseoption.expectdate)">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col>
                        <v-dialog
                          ref="actualdialog"
                          v-model="releaseoption.actualmodal"
                          :return-value.sync="releaseoption.actualdate"
                          persistent
                          width="290px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="releaseoption.actualdate"
                              label="实际释放日期"
                              readonly
                              :disabled="leftlockstatus.locked"
                              dense
                              v-bind="attrs"
                              v-on="on">
                              <template slot="prepend">
                                <v-icon :color="returnColor">
                                  mdi-calendar
                                </v-icon>
                              </template>
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="releaseoption.actualdate"
                            scrollable>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="releaseoption.actualmodal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.actualdialog.save(releaseoption.actualdate)">
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-card shaped class="pa-1">
                  <v-card-title>检查点</v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-row dense>
                        <v-checkbox
                          v-for="(item, i) in tempcheck.point"
                          :key="i"
                          v-model="item.check"
                          dense
                          :label="item.content"
                          color="success"
                          class="ma-1"
                          hide-details
                          :disabled="leftlockstatus.locked">
                        </v-checkbox>
                      </v-row>
                      <v-row dense>
                        <v-checkbox
                          v-for="(item, i) in tempcheck.document"
                          :key="i"
                          v-model="item.check"
                          dense
                          :label="item.content"
                          color="success"
                          :value="item.value"
                          class="ma-1"
                          hide-details
                          :disabled="leftlockstatus.locked">
                        </v-checkbox>
                      </v-row>
                    </v-row>
                    <v-divider></v-divider>
                    <v-row dense>
                      <v-text-field
                        v-model="tempcheck.releasedocumentpath"
                        :disabled="leftlockstatus.locked"
                        dense
                        clearable
                        label="释放文档准备路径">
                        <template slot="prepend">
                          <v-icon :color="returnColor">
                            mdi-file-document-outline
                          </v-icon>
                        </template>
                      </v-text-field>
                    </v-row>
                    <v-row dense>
                      <v-col>
                        <v-text-field
                          v-model="tempcheck.version"
                          :disabled="leftlockstatus.locked"
                          clearable
                          dense
                          label="本体版本号">
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-paper-cut-vertical
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="tempcheck.codversion"
                          :disabled="leftlockstatus.locked"
                          dense
                          clearable
                          label="COD包版本号">
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-paper-cut-vertical
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="tempcheck.skversion"
                          :disabled="leftlockstatus.locked"
                          dense
                          clearable
                          label="Scale Key版本号">
                          <template slot="prepend">
                            <v-icon :color="returnColor">
                              mdi-paper-cut-vertical
                            </v-icon>
                          </template>
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-card shaped>
                  <v-card-title>需求&用例</v-card-title>
                  <v-alert
                    class="mt-0 mb-0 mr-2 ml-2"
                    border="left"
                    colored-border
                    color="green accent-4"
                    elevation="2">
                    <v-row>
                      <v-col class="pb-0">
                        <v-row>
                          <v-col cols="3" class="pr-0">
                            <v-checkbox
                              v-model="tempnewtrcase.iscase"
                              :disabled="leftlockstatus.locked"
                              dense
                              label="CASE标识"
                              color="success"
                              value="Case"
                              hide-details>
                            </v-checkbox>
                          </v-col>
                          <v-col cols="3" class="pr-0">
                            <v-text-field
                              v-model="tempnewtrcase.no"
                              :disabled="leftlockstatus.locked"
                              dense
                              label="编号">
                            </v-text-field>
                          </v-col>
                          <v-col class="pr-0">
                            <v-text-field
                              v-model="tempnewtrcase.content"
                              :disabled="leftlockstatus.locked"
                              dense
                              label="标题&内容">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="2">
                        <v-btn
                          :disabled="leftlockstatus.locked"
                          class="white--text"
                          color="green accent-4"
                          depressed
                          @click="addNewTrCase()">
                          ADD
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                  <v-list shaped dense class="mr-2 ml-2">
                    <v-list-item-group color="primary">
                      <v-list-item
                        v-for="(item, i) in temptrcaselist"
                        :key="i"
                        dense>
                        <v-col class="pa-0">
                          <v-row dense>
                            <v-col cols="1">
                              <v-icon
                                color="blue accent-4"
                                class="mt-1">
                                mdi-brightness-auto
                              </v-icon>
                            </v-col>
                            <v-col cols="2">
                              <v-chip
                                small
                                outlined
                                color="primary"
                                label
                                class="mt-1">
                                <v-icon left>mdi-identifier</v-icon>
                                {{ item.no }}
                              </v-chip>
                            </v-col>
                            <v-col>
                              <p class="text-overline ma-0">
                                {{ item.content }}
                              </p>
                            </v-col>
                          </v-row>
                          <v-divider inset class="mt-0 mb-0"></v-divider>
                        </v-col>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
              <v-col>
                <v-card shaped>
                  <v-card-title>
                    更新详情&邮件内容
                  </v-card-title>
                  <v-card-text class="pa-0">
                    <v-textarea
                      v-model="tempemail"
                      :disabled="leftlockstatus.locked"
                      class="pl-2 pr-2"
                      outlined
                      clearable
                      :rules="maxtextarea">
                    </v-textarea>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { createRelease, deleteRelease, getAllRelease, saveAllRelease, saveRelease } from '../../scripts/releasemanagement'

export default {
  name: 'ReleaseEntrance',
  components: {},
  data() {
    return {
      // 原始数据
      releaseitems: [],
      // 勾选的item release
      selectitem: {},
      // 依赖visiblepage的分组的分组
      spiltreleaseitems: [],
      // 左侧的list设置
      leftlistconfig: {
        // 最大页
        maxpage: 6,
        // 当前页
        page: 1,
        // 展示数量
        visiblepage: 6,
        // 已点击选择项目下标值
        selectedItemIndex: 0
      },
      // 右侧锁状态
      leftlockstatus: {
        icon: 'mdi-lock',
        text: 'LOCKED',
        color: 'error',
        locked: true
      },
      // 富文本长度限制提示
      maxtextarea: [v => v.length <= 1200 || '最大1200字符限制'],
      // 释放的选项
      releaseoption: {
        product: ['Scale Manager', 'MTStar(JAVA)'],
        type: [
          'Store',
          'Store-License',
          'HQ',
          'HQ-License',
          'Multi-Store',
          'Multi-Store-License'
        ],
        uppack: ['包含', '不包含'],
        tempuppack: '',
        expectdate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        expectmodal: false,
        actualdate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        actualmodal: false
      },
      // 临时 新 trcase对象
      tempnewtrcase: {
        iscase: false,
        no: undefined,
        content: ''
      },
      // 临时 trcase列表
      temptrcaselist: [],
      // 临时邮件 textarea
      tempemail: '',
      // 释放临时 检查点
      tempcheck: {
        point: [
          {
            check: false,
            content: '版本号验证',
            value: 'versionno'
          },
          {
            check: false,
            content: '新功能验证',
            value: 'new'
          },
          {
            check: false,
            content: '改进功能验证',
            value: 'improve'
          },
          {
            check: false,
            content: '修复功能验证',
            value: 'fix'
          },
          {
            check: false,
            content: 'COD功能验证',
            value: 'cod'
          },
          {
            check: false,
            content: '升级包功能验证',
            value: 'updatepackage'
          },
          {
            check: false,
            content: 'license验证',
            value: 'license'
          },
          {
            check: false,
            content: '回归测试验证',
            value: 'regression'
          }
        ],
        document: [
          {
            check: false,
            content: '开发释放邮件',
            value: 'devlopreleasemail'
          },
          {
            check: false,
            content: '测试计划文档',
            value: 'testplan'
          },
          {
            check: false,
            content: '正式释放文档',
            value: 'releasedocument'
          },
          {
            check: false,
            content: '是否提交360验证',
            value: 'use360'
          },
          {
            check: false,
            content: '是否包含自动化测试',
            value: 'automatic'
          }
        ],
        releasedocumentpath: '',
        version: '',
        codversion: '',
        skversion: ''
      }
    }
  },

  computed: {
    // 返回颜色
    returnColor() {
      if (this.leftlockstatus.locked) {
        return 'grey darken-1'
      } else {
        return 'blue accent-2'
      }
    }
  },

  watch: {
    releaseitems: {
      immediate: false,
      handler(val) {
        this.splitItems(val)
      },
      deep: true
    }
  },

  methods: {
    /**
     * 分拆
     * */
    splitItems(val) {
      if (val !== undefined) {
        // console.log(val)
        // 判断如果不是数组(就没有length)，或者size没有传值，size小于1，就返回空数组
        if (!val.length || !this.leftlistconfig.visiblepage || this.leftlistconfig.visiblepage < 1) {
          this.spiltreleaseitems.push(val)
        } else {
          let [start, end] = [null, null]
          const result = []
          for (let i = 0; i < Math.ceil(val.length / this.leftlistconfig.visiblepage); i++) {
            start = i * this.leftlistconfig.visiblepage
            end = start + this.leftlistconfig.visiblepage
            result.push(val.slice(start, end))
          }
          this.spiltreleaseitems = result
          // console.log(this.spiltitems)
          this.leftlistconfig.maxpage = this.spiltreleaseitems.length
        }
      }
    },
    /**
     * 读取所有释放
     * update 2021-10-19 不管是历史还是当前
     * */
    readAllRelease() {
      getAllRelease()
        .then(result => {
          this.releaseitems = result
        })
        .catch(error => {
          this.releaseitems = error
        })
        .finally(() => {
          saveAllRelease(this.releaseitems)
        })
    },

    /**
     * 添加一个新的释放记录
     * */
    createNewRelease() {
      const newtemp = createRelease()
      const tindex = this.releaseitems.findIndex((item) => item.id === newtemp.id)
      if (tindex === -1) {
        this.releaseitems.push(newtemp)
        // update 2021-10-22 新增的默认选中
        this.selectitem = newtemp
        this.$nextTick(() => {
          this.leftlistconfig.page = this.spiltreleaseitems.length
          const tlenght = this.spiltreleaseitems[this.leftlistconfig.page - 1].length
          // console.log(tlenght)
          this.leftlistconfig.selectedItemIndex = tlenght - 1
        })
      }
    },
    /**
     * 重置Release
     * */
    resetRelease() {
      const newtemp = createRelease() // 创建新的
      const id = this.selectitem.id // 提取ID
      // 重置
      this.selectitem = newtemp
      this.selectitem.id = id
    },
    /**
     * 删除 Release
     */
    deleteRelease() {
      // 查找index是否存在
      const tindex = this.releaseitems.findIndex((item) => item.id === this.selectitem.id)
      if (tindex !== -1) {
        deleteRelease(this.releaseitems[tindex]) // 提交给后端
        this.releaseitems.splice(tindex, 1)
        // 恢复默认值
        this.selectitem = {}
        // 还要继续调整
        this.leftlistconfig.page = 1
        this.leftlistconfig.selectedItemIndex = -1
      }
    },

    /**
     * 保存 Release
     */
    saveRelease() {
      // 部分数据依赖本VUE内的
      this.selectitem.basic.expectdate = this.releaseoption.expectdate.toString()
      this.selectitem.basic.acutaldate = this.releaseoption.actualdate.toString()
      this.selectitem.assigner = this.selectitem.author
      this.selectitem.check.releasedocumentpath = this.tempcheck.releasedocumentpath
      this.selectitem.check.version = this.tempcheck.version
      this.selectitem.check.codversion = this.tempcheck.codversion
      this.selectitem.check.skversion = this.tempcheck.skversion
      this.selectitem.trcase = this.temptrcaselist
      this.selectitem.email.content = this.tempemail

      // UPPACK 调整
      if (this.releaseoption.tempuppack === '包含') {
        this.selectitem.basic.uppack = true
      } else {
        this.selectitem.basic.uppack = false
      }

      this.tempcheck.point.forEach(item => {
        const temparg = item.value
        // 判断存在，则复制
        if (temparg in this.selectitem.check) {
          this.selectitem.check[temparg] = item.check
        }
      })
      this.tempcheck.document.forEach(item => {
        const temparg = item.value
        // 判断存在，则复制
        if (temparg in this.selectitem.check) {
          this.selectitem.check[temparg] = item.check
        }
      })
      // console.log(this.selectitem)
      // TODO 这里需要提交给STORE/后台
      saveRelease(this.selectitem) // 保存到后端

      // 恢复默认值
      this.selectitem = {}
      // 还要继续调整
      this.leftlistconfig.page = 1
      this.leftlistconfig.selectedItemIndex = -1
    },

    /**
     * 双击打开一个已存在的Release
     * @param item {Object} Release对象
     */
    dblclickItem(item) {
      this.selectitem = item // 赋值
      // 转赋值

      // 1. 部分数据依赖本VUE内的，需要重新赋值
      this.releaseoption.expectdate = this.selectitem.basic.expectdate
      this.releaseoption.actualdate = this.selectitem.basic.acutaldate
      this.tempcheck.releasedocumentpath = this.selectitem.check.releasedocumentpath
      this.tempcheck.version = this.selectitem.check.version
      this.tempcheck.codversion = this.selectitem.check.codversion
      this.tempcheck.skversion = this.selectitem.check.skversion
      this.temptrcaselist = this.selectitem.trcase
      this.tempemail = this.selectitem.email.content

      // UPPACK 调整
      if (this.selectitem.basic.uppack === true) {
        this.releaseoption.tempuppack = '包含'
      } else {
        this.releaseoption.tempuppack = '不包含'
      }

      for (const key in this.selectitem.check) {
        this.tempcheck.point.forEach(item => {
          if (item.value === key) {
            item.check = this.selectitem.check[key]
          }
        })
        this.tempcheck.document.forEach(item => {
          if (item.value === key) {
            item.check = this.selectitem.check[key]
          }
        })
      }
    },

    /**
     * 解锁、加锁
     */
    lockReleaseCard() {
      if (this.leftlockstatus.locked === true) {
        this.leftlockstatus = {
          icon: 'mdi-lock-open-variant',
          text: 'LOCK',
          color: 'green accent-4',
          locked: false
        }
      } else {
        this.leftlockstatus = {
          icon: 'mdi-lock',
          text: 'UNLOCK',
          color: 'error',
          locked: true
        }
      }
    },

    /**
     * 添加新trcase
     */
    addNewTrCase() {
      this.temptrcaselist.push(this.tempnewtrcase)
      // 刷新
      this.tempnewtrcase = {
        iscase: false,
        no: undefined,
        content: ''
      }
    }

  }
}
</script>

<style scoped></style>
