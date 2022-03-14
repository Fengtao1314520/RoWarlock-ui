<template>
  <v-app>
    <title-bar :title-stack="titleStack" />
    <v-card class="ma-3" shaped>
      <v-card-title>
        个人设置
      </v-card-title>
      <v-card>
        <v-col>
          <v-row>
            <v-col cols="1" />
            <v-col cols="1">
              <v-avatar size="128">
                <img src="../../../public/img/gamer.png" />
              </v-avatar>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="userinfo.uname" class="rounded-r-xl" filled label="账号:" disabled></v-text-field>
              <v-text-field v-model="userinfo.uemail" class="rounded-r-xl" filled label="邮箱:"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="userinfo.upsd" class="rounded-r-xl" filled label="密码:"></v-text-field>
              <v-text-field v-model="userinfo.unickname" class="rounded-r-xl" filled label="昵称:"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="selectedproject[0]"
                :items="allprojects"
                class="rounded-r-xl"
                filled
                item-text="name"
                :item-value="getSeleteItem"
                label="选择第一个默认项目"></v-select>
              <v-select
                v-model="selectedproject[1]"
                :items="allprojects"
                class="rounded-r-xl"
                filled
                item-text="name"
                :item-value="getSeleteItem"
                label="选择第二个默认项目"></v-select>
              <v-row>
                <v-col cols="7" />
                <v-col>
                  <v-btn color="green accent-4" class="white--text" @click="uploadNew()">
                    <v-icon left>mdi-content-save-move</v-icon>
                    保存
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import TitleBar from '@/components/TitleBar'

import { allprojects } from '../../scripts/common'
import { postFunc } from '@/scripts/internal/httpFunc'
export default {
  /**
   * 个人设置
   * 个人设置页面
   */
  name: 'Settings',
  components: {
    TitleBar
  },
  data() {
    return {
      /**
       * 用户信息
       */
      userinfo: {},
      headfile: '', // 头像图片
      /**
       * 所有后端的项目
       */
      allprojects: [],
      /**
       * 选择的两个项目对象
       */
      selectedproject: []
    }
  },
  computed: {
    titleStack() {
      return ['RoWalock', '个人设置']
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
      // 更新从远程获取的啥项目
      allprojects()
        .then(result => {
          this.allprojects = result
        })
        .catch(error => {
          this.allprojects = error
        })
        .finally(() => {
          this.userinfo = this.$store.state.common.activeusers
        })
    },

    /**
     *提交新的
     */
    uploadNew() {
      // + 改为JSON数据传输
      const postdata = {
        userinfo: this.userinfo,
        selectedproject: this.selectedproject
      }
      postFunc('/profile/setting/updateuser', postdata)
        .then(result => {
          if (result.resstatus === true) {
            this.$buefy.toast.open({
              duration: 3000,
              message: result.meesage,
              type: 'is-success'
            })
            this.$store.commit('updateUserInfo', result) // 提交更新
          } else {
            this.$buefy.toast.open({
              duration: 3000,
              message: '个人信息更新失败!请重试或检查信息',
              type: 'is-warning'
            })
          }
        })
        .catch(() => {
          this.$buefy.toast.open({
            duration: 3000,
            message: '个人信息更新失败!请检查填入信息和选择项目是否存在!',
            type: 'is-cred-2'
          })
        }).finally(() => {
          this.$store.commit('uploadDefaultTwoProjs', this.selectedproject) // 提交更新展示项目
          this.selectedproject = [] // 初始化
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

<style scoped>

</style>
