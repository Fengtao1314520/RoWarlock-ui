<template>
  <v-card elevation="0" outlined rounded>
    <v-app-bar
      dense
      dark
      flat
      color="indigo"
    >
      <v-app-bar-nav-icon>
        <template v-slot:default>
          <v-icon>
            mdi-email
          </v-icon>
        </template>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="pl-0">对话</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/profile/messages">
        VIEW ALL
      </v-btn>
    </v-app-bar>
    <v-container class="pa-2">
      <v-list>
        <v-list-item-group
          v-model="selectedmessage"
          color="primary">
          <v-list-item
            v-for="(item, i) in getMessages"
            :key="i"
            class="pa-0 ma-2"
            active-class="select-active"
            @click="readMessage(item,i)">
            <v-col class="pa-0 ma-0">
              <v-row class="pa-0 ma-0">
                <v-col cols="2" class="pa-0 ma-0">
                  <v-avatar>
                    <img src="../../../public/img/avatar-2.png" />
                  </v-avatar>
                </v-col>
                <v-col class="pa-0 ma-0">
                  <p class="pa-0 ma-0">{{ item.author }}</p>
                  <p class="pa-0 ma-0">{{ item.content }}</p>
                </v-col>
                <v-col cols="3" class="pa-0 ma-0">
                  <v-badge
                    offset-x="4"
                    offset-y="4"
                    :content="showBadge(item)"
                    :value="showBadge(item)"
                    color="green"
                    overlap
                  >
                    <p class="text-caption">{{ item.sendtime.split(' ')[0] }}</p>
                  </v-badge>
                </v-col>
              </v-row>
            </v-col>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
import { getAllMessage } from '../../scripts/messages'

export default {
  name: 'SampleMessages',
  data() {
    return {
      messages: [],
      selectedmessage: {}
    }
  },
  computed: {
    getMessages() {
      return this.messages.slice(0, 7)
    }

  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log('变化')
      this.messages = getAllMessage()
    },
    /**
     * 显示上标
     * @param item
     * @returns {number}
     */
    showBadge(item) {
      if (item.isread === true) {
        return 0
      } else {
        return 1
      }
    },
    /**
     * 读取信息操作
     * @param item
     * @param index
     */
    readMessage(item, index) {
      // console.log('干活')
      if (item.isread === false) {
        // console.log(index)
        this.messages[index].isread = true
      }
    }

  }
}
</script>

<style scoped lang="scss">
.select-active {
  background: linear-gradient(98deg, #536DFE, #304FFE);
  color : white !important;
}
</style>
