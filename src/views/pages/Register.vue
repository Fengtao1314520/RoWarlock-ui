<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-col>
        <v-card>
          <v-card-title>
            RoWarlock starts here
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="3" class="pa-0">
                <v-subheader class="text-h6 mt-2">账号:</v-subheader>
              </v-col>
              <v-col cols="8" class="pa-0">
                <v-text-field
                  v-model="registerinfo.uname"
                  class="mt-0"
                  prepend-icon="mdi-account"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-0">
                <v-subheader class="text-h6  mt-2">密码:</v-subheader>
              </v-col>
              <v-col cols="8" class="pa-0">
                <v-text-field
                  v-model="registerinfo.upsd"
                  class="mt-0"
                  prepend-icon="mdi-lock"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-0">
                <v-subheader class="text-h6  mt-2">昵称:</v-subheader>
              </v-col>
              <v-col cols="8" class="pa-0">
                <v-text-field
                  v-model="registerinfo.unickname"
                  class="mt-0"
                  prepend-icon="mdi-textbox"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-0">
                <v-subheader class="text-h6  mt-2">邮箱:</v-subheader>
              </v-col>
              <v-col cols="8" class="pa-0">
                <v-text-field
                  v-model="registerinfo.uemail"
                  class="mt-0"
                  prepend-icon="mdi-email"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn block color="primary" @click="register()">注册</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>
                  已经有账号? 点击
                  <a @click="openLogin()">
                    这里
                  </a>
                  登陆
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import { postFunc } from '../../scripts/internal/httpFunc'
export default {
  name: 'Register',
  data() {
    return {
      /**
       * 注册用户数据
       */
      registerinfo: {
        uname: '',
        upsd: '',
        unickname: '',
        uemail: ''
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    /**
     * 用户注册
     */
    register() {
      const that = this
      postFunc('/user/register', this.registerinfo).then(result => {
        // 获取数据
        const data = result
        if (data.resstatus === true) {
          // 用户等验证成功
          that.$store.commit('updateUserInfo', data.resbody) // 提交
          that.$router.push('/') // 跳转
        } else {
          // 用户不存在或错误,弹窗展示
          that.$buefy.dialog.alert({
            title: '错误',
            type: 'is-cred-2',
            message: data.meesage
          })
        }
      })
    },
    openLogin() {
      this.$router.push('/login') // 跳转
    }
  }
}
</script>

<style scoped>
.margin-05 {
  margin: 0.5rem;
}

.padding-10 {
  padding: 10rem 1.5rem;
}
</style>
