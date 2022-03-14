<template>
  <v-container class="d-flex align-center justify-center">
    <v-spacer />
    <v-col>
      <v-card>
        <v-card-title>Welcome to RoWarlock</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="3" class="pa-0">
              <v-subheader class="text-h6 mt-2">账号:</v-subheader>
            </v-col>
            <v-col cols="8" class="pa-0">
              <v-text-field
                v-model="loginuser.uname"
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
                v-model="loginuser.upsd"
                class="mt-0"
                prepend-icon="mdi-lock"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pa-0">
              <v-checkbox
                class="mt-0 ml-3"
                label="是否记住密码"
                color="success"
                :value="true"
                hide-details
              ></v-checkbox>
            </v-col>
            <v-spacer />
            <v-col class="pa-0">
              <a href="#" class="text-decoration-underline text-button">忘记密码</a>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn block color="primary" @click="login()">登陆</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>
                没有账号? 点击
                <a @click="openRegister()">
                  这里
                </a>
                创建账号
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-spacer />
  </v-container>
</template>

<script>
import { allprojects } from '../../scripts/common'
import { postFunc } from '../../scripts/internal/httpFunc'
export default {
  name: 'Login',
  data() {
    return {
      /**
       * 用户账号和id
       */
      loginuser: {
        uname: '',
        upsd: ''
      }
    }
  },

  methods: {
    /**
     * 登陆用户
     */
    login: function() {
      const that = this
      postFunc('/user/login', this.loginuser).then(result => {
        // 获取数据
        const data = result
        if (data.resstatus === true) {
          // 用户等验证成功
          that.$store.commit('updateUserInfo', data.resbody) // 提交
          //  UPDATE: 2021-08-11 绑定的项目 直接在数据库内读取
          const plist = []
          const tfp = JSON.parse(data.resbody.ufpobj)
          const tsp = JSON.parse(data.resbody.uspobj)
          if (data.resbody.ufpobj.toString().substr(0, 1) === '{') {
            // console.log('走这里')
            plist.push(tfp)
            plist.push(tsp)
          } else {
            // UPDATE: 兼容0.12
            allprojects()
              .then(result => {
                const ufp = data.resbody.ufpobj
                const usp = data.resbody.uspobj
                result.forEach(element => {
                  if (element.name === ufp) {
                    plist.push(element)
                  }
                })
                result.forEach(element => {
                  if (element.name === usp) {
                    plist.push(element)
                  }
                })
              })
          }
          that.$store.commit('uploadDefaultTwoProjs', plist) // 提交更新展示项目
          // UPDATE: 这里添加一处localStorage,因为登陆需要使用
          localStorage.setItem('ro_token', data.resbody.id)
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
    openRegister() {
      this.$router.push('/register') // 跳转
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
