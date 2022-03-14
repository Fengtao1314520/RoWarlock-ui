/* Styles */
import '@/scss/main.scss'

/* 核心 */
import Vue from 'vue'
import Buefy from 'buefy'
import vuetify from '@/plugins/vuetify' // path to vuetify export

/* 路由和store */
import router from './router'
import store from './store'

/* 主组件 */
import App from './App.vue'

/* 附属组件 */
import VueApexCharts from 'vue-apexcharts'
import VueEllipseProgress from 'vue-ellipse-progress'

/* 网络 */
import VueCookies from 'vue-cookies'
import Layout from './views/layout/Layout'
import Blank from './views/layout/Blank'

/* 使用*/
Vue.use(Buefy)

// Vue.use(Bulma)
Vue.use(VueApexCharts)
Vue.use(VueEllipseProgress)
Vue.use(VueCookies)

/* 组件*/
Vue.component('apexchart', VueApexCharts)
Vue.component('layout', Layout)
Vue.component('blank', Blank)

window.$cookies.config('1d') // 保存cookie时间 保持为1天

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断当前的token是否存在;登录存入的token
    if (localStorage.ro_token) {
      next() // 继续
    } else {
      // 跳转到登陆界面
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
