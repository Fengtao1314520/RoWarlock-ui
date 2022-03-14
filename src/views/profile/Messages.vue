<template>
  <v-row>
    <v-col cols="2" />
    <v-col>
      <v-card elevation="10" outlined>
        <v-app-bar dark flat shaped color="white" />
        <v-card elevation="0">
          <v-container class="pa-2">
            <v-row class="pa-0 ma-0">
              <v-navigation-drawer permanent>
                <v-list-item>
                  <v-list-item-content>
                    <p class="text-h5 mb-0">
                      联系人
                    </p>
                  </v-list-item-content>
                </v-list-item>
                <v-divider class="ma-1"></v-divider>
                <v-text-field
                  v-model="searchtext"
                  dense
                  hide-details="false"
                  label="检索"
                  append-outer-icon="mdi-magnify"
                  clearable
                  class="pa-1 pl-3 mt-4"
                  @click:append-outer="search()"
                ></v-text-field>
                <v-divider class="ma-1"></v-divider>
                <v-list-item-group v-model="selectedindex">
                  <v-list shaped dense>
                    <v-list-item
                      v-for="(item, i) in leftcontact"
                      :key="i"
                      dense
                      color="primary"
                      active-class="select-active"
                      @click="changeContact(item)"
                    >
                      <v-col class="pa-0 ma-0 mb-2 mt-2">
                        <v-row class="pa-0 ma-0">
                          <v-col cols="3" class="pa-0 ma-0">
                            <v-badge offset-x="10" offset-y="10" bottom bordered dot color="green">
                              <v-avatar size="32">
                                <img src="../../../public/img/avatar-1.png" />
                              </v-avatar>
                            </v-badge>
                          </v-col>
                          <v-col class="pa-0 ma-0">
                            <p class="pa-0 ma-0 pt-1 text-subtitle-1 font-italic has-text-grey-dark">
                              {{ item.reciver }}
                            </p>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-list-item>
                  </v-list>
                </v-list-item-group>
              </v-navigation-drawer>
              <v-main class="pa-0 ma-0">
                <v-card elevation="0">
                  <v-toolbar color="indigo darken-1">
                    <v-avatar class="mr-4">
                      <img src="../../../public/img/avatar-3.png" />
                    </v-avatar>
                    <v-toolbar-title>
                      <p class="white--text mb-0">{{ selectedcontact.reciver }}</p>
                      <p class="white--text mb-0">User/Designer</p>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon color="white">
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <v-btn icon color="white">
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon color="white">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card outlined elevation="0">
                    <v-col>
                      <v-alert v-for="(item, index) in contactmessagelist" :key="index" dense class="mb-0">
                        <v-alert
                          v-if="selectedcontact.reciver === item.reciver"
                          class="ma-0"
                          border="left"
                          colored-border
                          color="deep-purple accent-4"
                          elevation="0"
                        >
                          <v-row class="d-flex flex-row">
                            <v-avatar class="ml-6 mr-6">
                              <img src="../../../public/img/avatar-1.png" />
                            </v-avatar>
                            <v-alert class="pa-0 ma-0" d-inline-flex flex-column align-start>
                              <v-card
                                color="grey lighten-4"
                                elevation="0"
                                class="d-inline-flex flex-column align-start"
                              >
                                <p class="pa-4 mb-0">{{ item.content }}</p>
                              </v-card>
                              <p class="mt-2 mb-0 text-left">{{ item.datetime.split(' ')[1] }}</p>
                            </v-alert>
                          </v-row>
                        </v-alert>
                        <v-alert v-else class=" ma-0" border="right" color="red accent-3" colored-border elevation="0">
                          <v-row class="d-flex flex-row-reverse">
                            <v-avatar class="mr-6 ml-6">
                              <img src="../../../public/img/avatar-2.png" />
                            </v-avatar>
                            <v-alert class="pa-0 ma-0">
                              <v-card
                                color="indigo lighten-1"
                                elevation="0"
                                class="d-inline-flex flex-column align-end"
                              >
                                <p class="pa-4 mb-0 white--text">{{ item.content }}</p>
                              </v-card>
                              <p class="mt-2 mb-0 text-right">{{ item.datetime.split(' ')[1] }}</p>
                            </v-alert>
                          </v-row>
                        </v-alert>
                      </v-alert>
                      <v-card v-if="JSON.stringify(contactmessagelist) != '[]'" elevation="5">
                        <v-card-text class="pa-0">
                          <v-text-field label="输入内容" outlined single-line clearable hide-details>
                            <template v-slot:append>
                              <v-btn depressed color="primary" large class="mb-4" @click="sendMessage()">
                                <v-icon left>
                                  mdi-send
                                </v-icon>
                                发送
                              </v-btn>
                            </template>
                          </v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-card>
                </v-card>
              </v-main>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-col>
    <v-col cols="2" />
  </v-row>
</template>

<script>
import { getMessageByReciver } from '../../scripts/messages'

export default {
  name: 'Messages',
  data() {
    return {
      searchtext: '',
      /**
       * 左侧联系人
       */
      leftcontact: [],
      /**
       * 选择的联系人的INDEX值
       */
      selectedindex: -1,
      /**
       * 选择的联系人对象
       */
      selectedcontact: {},
      /**
       * 双击选择的联系人信息列表
       */
      contactmessagelist: [],
      /**
       * 发送者
       */
      mainauthor: {}
    }
  },
  watch: {
    selectedcontact: {
      immediate: false,
      handler(val) {
        // console.log(val)
        this.refreshContactMessage(val)
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.mainauthor = {
        name: 'Nate Ford',
        id: ''
      }
    },
    /**
     * 检索
     */
    search() {
      const temp = {
        reciver: this.searchtext,
        reciverid: ''
      }
      this.leftcontact.push(temp)
    },
    /**
     * 更改联系人
     * @param item
     */
    changeContact(item) {
      console.log(item)
      this.selectedcontact = item
    },
    /**
     * 刷新联系信息
     * 就是点击联系后，获取对应联系人的信息
     */
    refreshContactMessage(oldval) {
      // console.log(oldval)
      const reciver = oldval.reciver
      this.contactmessagelist = getMessageByReciver(this.mainauthor.name, reciver)
    },
    /**
     * 发送信息
     */
    sendMessage() {}
  }
}
</script>

<style lang="scss" scoped>
.select-active {
  background: linear-gradient(to right, #69f0ae, #81d4fa);
  color: white !important;
}
</style>
