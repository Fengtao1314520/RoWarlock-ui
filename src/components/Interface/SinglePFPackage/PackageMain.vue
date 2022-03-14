<template>
  <div>
    <v-row>
      <v-col></v-col>
      <v-col class="d-flex justify-end">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="save()">
              <v-icon left>
                mdi-content-save
              </v-icon>
              保存
            </v-list-item>
            <v-list-item @click="deleteParaFunc()">
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              删除
            </v-list-item>
            <v-list-item @click="showdialog.isshow = true">
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              重命名
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text color="pink" class="font-weight-black" @click="closeTab()">
          关闭此Tab
        </v-btn>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card outlined shaped>
              <v-card-title>
                Parament参数化
                <v-spacer></v-spacer>
                <v-btn icon color="primary" @click="paratable.dialog = true">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :items-per-page="10"
                  :headers="paratable.headers"
                  :items="localpackage.para"
                  dense
                  class="elevation-0"
                  :footer-props="{
                    disableItemsPerPage: true
                  }"
                >
                  <template v-slot:[`item.key`]="{ item }">
                    <v-chip label small class="mt-1 " outlined color="blue accent-4">
                      {{ item.key }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.value`]="{ item }">
                    <v-chip label small class="mt-1" outlined color="deep-purple accent-4">
                      {{ item.value }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2 mt-2" color="primary" @click="paraItem(item, true)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small class="mt-2" color="red" @click="paraItem(item, false)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card outlined shaped>
              <v-card-title>
                Function方法化
                <v-spacer></v-spacer>
                <v-btn icon color="primary" @click="functable.dialog = true">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :items-per-page="10"
                  :headers="functable.headers"
                  :items="localpackage.func"
                  dense
                  class="elevation-0"
                  :footer-props="{
                    disableItemsPerPage: true
                  }"
                >
                  <template v-slot:[`item.key`]="{ item }">
                    <v-chip label small class="mt-1" outlined color="deep-purple accent-4">
                      {{ item.key }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2 mt-2" color="primary" @click="funcItem(item, true)">
                      mdi-pencil
                    </v-icon>
                    <v-icon small class="mt-2" color="red" @click="funcItem(item, false)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div>
      <v-dialog v-model="paratable.dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="paratable.editedItem.key" label="参数名"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="paratable.editedItem.value" label="参数值"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" dark depressed @click="paraClose(true)">
              取消
            </v-btn>
            <v-btn color="green darken-1" dark depressed @click="paraSaveOrDelete(true)">
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="paratable.dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">是否删除相应参数项?</v-card-title>
          <v-card-text>
            *已映射的参数也将会被影响,请谨慎选择!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark depressed @click="paraClose(false)">取消</v-btn>
            <v-btn color="red lighten-1" dark depressed @click="paraSaveOrDelete(false)">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="functable.dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field v-model="functable.editedItem.key" label="方法名"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-select
                  v-model="selectedpara"
                  item-text="key"
                  :item-value="getSeleteItem"
                  dense
                  :items="localpackage.para"
                  label="选择参数"
                  multiple
                >
                  <template v-slot:prepend-item>
                    <v-list-item ripple @click="selectAllParaOnFunc()">
                      <v-list-item-action>
                        <v-icon :color="selectedpara.length > 0 ? 'indigo darken-4' : ''">
                          {{ icon }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          选择全部
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ item }">
                    <v-chip label x-small>
                      {{ item.key }}
                    </v-chip>
                  </template>
                </v-select>
              </v-row>
              <v-row>
                <p>*注意!,方法需要步骤非常简单，且使用的参数名不能与您勾选的参数名相同!</p>
              </v-row>
              <v-row>
                <v-col>
                  <small-editor ref="smalleditor"></small-editor>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" dark depressed @click="funcClose(true)">
              取消
            </v-btn>
            <v-btn color="green darken-1" dark depressed @click="funcSaveOrDelete(true)">
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="functable.dialogDelete" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">是否删除相应方法?</v-card-title>
          <v-card-text>
            *已使用的方法也将会被影响,请谨慎选择!
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" dark depressed @click="funcClose(false)">取消</v-btn>
            <v-btn color="red lighten-1" dark depressed @click="funcSaveOrDelete(false)">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="showdialog.isshow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">更改步骤名称</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="showdialog.name" label="名称" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*修改步骤名称</small>
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
  </div>
</template>

<script>
import SmallEditor from '../../Monaco/SmallEditor.vue'
export default {
  name: 'PackageMain',
  components: { SmallEditor },
  data() {
    return {
      /**
       *本地包
       */
      localpackage: {
        name: '',
        para: [],
        func: []
      },

      /**
       * para table参数
       */
      paratable: {
        dialog: false,
        dialogDelete: false,
        headers: [
          { text: '参数名', align: 'start', sortable: false, value: 'key' },
          { text: '参数值', align: 'start', sortable: false, value: 'value' },
          { text: '活动', align: 'center', sortable: false, value: 'actions' }
        ],
        editedItem: {
          key: '',
          value: undefined
        },
        defaultItem: {
          key: '',
          value: undefined
        },
        editedIndex: -1
      },

      /**
       * func table参数
       */
      functable: {
        dialog: false,
        dialogDelete: false,
        headers: [
          { text: '方法名', align: 'start', sortable: false, value: 'key' },

          { text: '活动', align: 'center', sortable: false, value: 'actions' }
        ],
        editedItem: {
          key: '',
          para: [],
          value: undefined
        },
        defaultItem: {
          key: '',
          para: [],
          value: undefined
        },
        editedIndex: -1
      },
      /**
       * 改名
       * dialog
       */
      showdialog: {
        isshow: false,
        /** 若新建suite
         * 名称
         */
        name: ''
      },
      /**
       * 方法使用的已选择的参数镜像
       */
      selectedpara: []
    }
  },
  computed: {
    formTitle() {
      return this.paratable.editedIndex === -1 ? '新建' : '编辑'
    },
    likesAllPara() {
      return this.selectedpara.length === this.localpackage.para.length
    },
    likesSomePara() {
      return this.selectedpara.length > 0 && !this.localpackage.para
    },
    icon() {
      if (this.likesAllPara) return 'mdi-close-box'
      if (this.likesSomePara) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    }
  },

  watch: {
    'functable.dialog'(val) {
      if (val === true) {
        setTimeout(() => {
          this.$refs.smalleditor.init()
        }, 100)
      }
    }
  },

  methods: {
    /**
     * 参数操作
     */
    paraItem(item, isedit) {
      this.paratable.editedIndex = this.localpackage.para.indexOf(item)
      this.paratable.editedItem = Object.assign({}, item)
      if (isedit === true) {
        this.paratable.dialog = true
      } else {
        this.paratable.dialogDelete = true
      }
    },

    /**
     * 关闭对话框
     */
    paraClose(isedit) {
      if (isedit === true) {
        this.paratable.dialog = false
      } else {
        this.paratable.dialogDelete = false
      }
      this.$nextTick(() => {
        this.paratable.editedItem = Object.assign({}, this.paratable.defaultItem)
        this.paratable.editedIndex = -1
      })
    },

    /**
     * 删除或保存操作
     */
    paraSaveOrDelete(isedit) {
      if (isedit) {
        if (this.paratable.editedIndex > -1) {
          this.localpackage.para.splice(this.paratable.editedIndex, 1, this.paratable.editedItem)
        } else {
          this.localpackage.para.push(this.paratable.editedItem)
        }
      } else {
        this.localpackage.para.splice(this.paratable.editedIndex, 1)
      }
      this.paraClose(isedit)
    },
    /**
     * 方法操作
     */
    funcItem(item, isedit) {
      this.functable.editedIndex = this.localpackage.func.indexOf(item)
      this.functable.editedItem = Object.assign({}, item)

      if (isedit === true) {
        this.functable.dialog = true
        this.$refs.smalleditor.updateContent(this.functable.editedItem.value)
      } else {
        this.functable.dialogDelete = true
      }
    },

    /**
     * 关闭对话框
     */
    funcClose(isedit) {
      if (isedit === true) {
        this.$refs.smalleditor.dispose()
        this.$nextTick(() => {
          this.functable.dialog = false
        })
      } else {
        this.functable.dialogDelete = false
      }
      this.$nextTick(() => {
        this.functable.editedItem = Object.assign({}, this.functable.defaultItem)
        this.functable.editedIndex = -1
        this.selectedpara = []
      })
    },

    /**
     * 删除或保存操作
     */
    funcSaveOrDelete(isedit) {
      if (isedit) {
        /**
         * 获取值
         */
        this.functable.editedItem.value = this.$refs.smalleditor.getContent()
        this.functable.editedItem.para = this.selectedpara
        // 判断是新增还是添加
        if (this.functable.editedIndex > -1) {
          this.localpackage.func.splice(this.functable.editedIndex, 1, this.functable.editedItem)
        } else {
          this.localpackage.func.push(this.functable.editedItem)
        }
      } else {
        this.localpackage.func.splice(this.functable.editedIndex, 1)
      }
      this.funcClose(isedit)
    },

    /**
     * 关闭此tab
     */
    closeTab() {
      this.$emit('close-tab')
    },

    /**
     *
     * 保存
     */
    save() {
      this.$store.commit('saveParaFunc', this.localpackage)
      this.$buefy.snackbar.open({
        duration: 3000,
        message: '保存成功!',
        type: 'is-cgreen-2',
        position: 'is-top',
        actionText: '关闭'
      })
    },

    /**
     * 删除步骤
     */
    deleteParaFunc() {
      this.$emit('delete-parafunc')
    },

    /**
     * dialog关闭保存
     */
    dialogSave() {
      this.localpackage.name = this.showdialog.name
      this.showdialog.name = ''
      this.showdialog.isshow = false
      console.log(this.localpackage)
    },

    /**
     * 远程传输数据
     * ref 父节点调用
     */
    remoteTransPackage(packageitem) {
      this.localpackage = packageitem
    },

    /**
     * 选择所有参数给方法
     */
    selectAllParaOnFunc() {
      this.$nextTick(() => {
        if (this.likesAllPara) {
          this.selectedpara = []
        } else {
          this.selectedpara = this.localpackage.para.slice()
        }
      })
    },
    /**
     * 返回选择的参数item
     */
    getSeleteItem(item) {
      return item
    }
  }
}
</script>

<style scoped></style>
