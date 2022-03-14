<template>
  <v-card class="mt-n2">
    <v-row class="ma-0">
      <v-col class="pa-0">
        <v-card shaped class="ma-2 pa-0">
          <v-card>
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
                <v-chip color="grey lighten-2" label class="mt-2" small>
                  {{ item.name }}
                </v-chip>
              </template>

              <template v-slot:item.tasktype="{ item }">
                <v-chip
                  color="blue accent-3"
                  label
                  small
                  class="mt-2"
                  text-color="white"
                >
                  {{ item.tasktype.toLowerCase() }}
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
            </v-data-table>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { getAllTaskWithoutAny } from '../../scripts/viewproject'
import { TASKSTATUS_CN, makeEemu } from '../../scripts/internal.js'
export default {
  /**
   * 主页 dashboard内展示
   */
  name: 'TaskTile',
  components: {},
  data() {
    return {
      search: '',
      headers: [
        { text: '名称', align: 'start', value: 'name', width: 220 },
        { text: '创建日期', value: 'datetime', width: 150 },
        { text: '更新日期', value: 'updatedatetime', width: 150 },
        { text: '任务类型', value: 'tasktype', width: 100 },
        { text: '任务状态', value: 'taskstatus', width: 100 }
      ],
      desserts: [],
      LOCAL_TASKSTATUS_CN: makeEemu(TASKSTATUS_CN)
    }
  },
  computed: {},
  mounted() {
    this.init()
  },

  methods: {
    init() {
      getAllTaskWithoutAny()
        .then(result => {
          this.desserts = JSON.parse(result)
        })
        .catch(error => {
          this.desserts = error
        })
        .finally()
    }
  }
}
</script>

<style scoped></style>
