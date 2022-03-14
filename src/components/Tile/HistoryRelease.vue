<template>
  <v-card class="mt-n2">
    <v-row class="ma-0">
      <v-col class="pa-0">
        <v-card shaped class="ma-2 pa-0">
          <v-card-title>
            详情
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="检索"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            dense
            :headers="headers"
            :items="desserts"
            :search="search"
          >
            <template v-slot:item.name="{ item }">
              <v-chip color="grey lighten-2" label class="mt-1">
                {{ item.name }}
              </v-chip>
            </template>
            <template v-slot:item.author="{ item }">
              <v-chip
                small
                outlined
                color="indigo darken-2"
                label
                class="mt-2"
              >
                {{ item.author }} ---> {{ item.assigner }}
              </v-chip>
            </template>
            <template v-slot:item.taskstatus="{ item }">
              <v-chip
                color="deep-purple lighten-1"
                label
                small
                outlined
                class="mt-2"
              >
                {{ LOCAL_TASKSTATUS_CN[item.taskstatus] }}
              </v-chip>
            </template>
            <template v-slot:item.more="{ item }">
              <v-btn
                small
                color="error"
                depressed
                outlined
                class="mt-2"
                @click.stop="openBasic(item)"
              >
                基本详情
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent width="500">
      <v-card outlined>
        <v-card-title class="text-h5 grey lighten-2">
          释放基本信息
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col>
              <v-text-field
                :value="selectbasic.product"
                label="产品:"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :value="selectbasic.type"
                label="类型:"
                outlined
                dense
                disabled
              ></v-text-field
              ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :value="selectbasic.relversion"
                label="释放版本:"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :value="selectbasic.configsvn"
                label="配置SVN号:"
                outlined
                dense
                disabled
              ></v-text-field
              ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :value="selectbasic.expectdate"
                label="预期释放日期:"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :value="selectbasic.acutaldate"
                label="实际释放日期:"
                outlined
                dense
                disabled
              ></v-text-field
              ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :value="selectbasic.uppack"
                label="是否包含升级包:"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :value="selectbasic.relphase"
                label="年内释放PHASE:"
                outlined
                dense
                disabled
              ></v-text-field
              ></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { makeEemu, TASKSTATUS_CN } from '../../scripts/internal'
import { getAllRelease } from '../../scripts/releasemanagement'

export default {
  name: 'HistoryRelease',
  data() {
    return {
      search: '',
      headers: [
        { text: '名称', align: 'start', value: 'name', width: 200 },
        { text: '创建/执行者', value: 'author', width: 220 },
        { text: '最终更新日期', value: 'updatedatetime', width: 150 },
        { text: '任务状态', value: 'taskstatus', width: 120 },
        { text: '更多', value: 'more', width: 120 }
      ],
      desserts: [],
      LOCAL_TASKSTATUS_CN: makeEemu(TASKSTATUS_CN),
      selectbasic: {},
      dialog: false
    }
  },
  computed: {},
  mounted() {
    this.init()
  },

  methods: {
    init() {
      getAllRelease()
        .then(result => {
          this.desserts = result
        })
        .catch(error => {
          this.desserts = error
        })
        .finally(() => {
          // console.log(this.desserts)
        })
    },
    /**
     * 打开释放基本信息
     * @param item {object}  后端回传包含basic的释放记录
     * */
    openBasic(item) {
      this.dialog = true
      this.selectbasic = item.basic
      // console.log(this.selectbasic)
    }
  }
}
</script>

<style scoped></style>
