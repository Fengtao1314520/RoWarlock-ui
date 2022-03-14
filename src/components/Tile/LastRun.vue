<template>
  <v-card>
    <v-list-item-group v-model="selectedItem" class="mt-n3">
      <v-list-item v-for="(item, i) in items" :key="i" v-model="selectedItem" dense disabled class="pa-0">
        <v-col class="pa-1">
          <v-alert
            dense
            rounded
            :color="item.type"
            border="left"
            colored-border
            class="ma-0">
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="4" class="pa-0 ml-2">
                    <p class="text-h6 mt-2 mb-2">{{ item.name }}</p>
                  </v-col>
                  <v-col cols="2" class="pa-0 mt-3 ml-n4">
                    <v-chip
                      color="deep-purple lighten-1"
                      x-small
                      outlined
                      label
                    >
                      <v-icon left>
                        mdi-account-circle-outline
                      </v-icon>
                      {{ item.status }}
                    </v-chip>
                  </v-col>
                  <v-col class="pa-0 mt-3">
                    <v-chip
                      color="grey lighten-3"
                      label
                      x-small
                      text-color="black"
                    >
                      <v-icon left>
                        mdi-label
                      </v-icon>
                      By admin
                    </v-chip>
                  </v-col>
                  <v-col class="pa-0 mt-3">
                    <v-chip
                      color="grey lighten-3"
                      label
                      x-small
                      text-color="black"
                    >
                      <v-icon left>
                        mdi-clock-outline
                      </v-icon>
                      {{ item.datetime }}
                    </v-chip>
                  </v-col>
                  <v-col class="pa-0 mt-3">
                    <v-chip
                      color="grey lighten-3"
                      label
                      x-small
                      text-color="black"
                    >
                      <v-icon left>
                        mdi-timer
                      </v-icon>
                      {{ item.completedatetime }}
                    </v-chip>
                  </v-col>
                  <v-col class="pa-0 mt-3">
                    <v-chip
                      color="grey lighten-3"
                      label
                      x-small
                      text-color="black"
                    >
                      <v-icon left color="indigo accent-4">
                        mdi-quality-high
                      </v-icon>
                      {{ item.stepcout }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-col>

            </v-row>
          </v-alert>
        </v-col>
      </v-list-item>
    </v-list-item-group>
  </v-card>
</template>

<script>
import { getLastRun } from '../../scripts/welcome'

export default {
  name: 'LastRun',
  data() {
    return {
      // 默认选择项
      selectedItem: -1,
      items: []

    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化
     * */
    init() {
      this.items = getLastRun()
      this.$nextTick(() => {
        // console.log(this.items)
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
