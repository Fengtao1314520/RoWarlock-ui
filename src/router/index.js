/**
 * https://www.cnblogs.com/hello9102/p/13440518.html
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 仪表盘
const Home = () => import('../views/Home')

// profile
const Settings = () => import('../views/profile/Settings')
const Messages = () => import('../views/profile/Messages')

// pages
const Login = () => import('../views/pages/Login')
const Register = () => import('../views/pages/Register')
const P404 = () => import('../views/pages/Page404.vue')

/**
 * UPDATE: 2021-02-23
 * NOTICE: 后续项目应该只有默认第一个和默认第二展示
 */
// project
const FirstProject = () => import('../views/project/FirstProject')
const SecondProject = () => import('../views/project/SecondProject')
// UPDATE: 2022-03-04 不用了
// const WebUiProject = () => import('../views/project/WebUiProject')
const WebUiProject = () => import('../views/project/WebUiProject')

// craft
const Interface = () => import('../views/craft/Interface')
const InterfaceRun = () => import('../views/craft/InterfaceRun')

/**
 * UPDATE: 2021-10-28
 * NOTICE: 只保留释放管理
 */
// release
const ReleaseManagement = () => import('../views/release/ReleaseManagement')

// doc
const Course = () => import('../views/docs/Course')
const Apis = () => import('../views/docs/Apis')

// 关于
const About = () => import('../views/docs/About')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard'
  },
  {
    path: '*',
    redirect: 'error-404'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home,
    meta: {
      label: '仪表盘',
      requireAuth: false
    }
  },
  {
    path: '/profile/settings',
    name: 'settings',
    component: Settings,
    meta: {
      label: '个人设置',
      requireAuth: false
    }
  },
  {
    path: '/profile/messages',
    name: 'messages',
    component: Messages,
    meta: {
      label: '对话',
      requireAuth: false
    }
  },
  {
    path: '/release/releasemanagement',
    name: 'releasemanagement',
    component: ReleaseManagement,
    meta: {
      label: '释放管理',
      requireAuth: false
    }
  },
  {
    path: '/project/first',
    name: 'first',
    component: FirstProject,
    meta: {
      label: '预展示第一项目',
      requireAuth: false
    }
  },
  {
    path: '/project/second',
    name: 'second',
    component: SecondProject,
    meta: {
      label: '预展示第二项目',
      requireAuth: false
    }
  },
  /*
  {
    path: '/project/webui',
    name: 'webui',
    component: WebUiProject,
    meta: {
      label: 'Web UI Test',
      requireAuth: false
    }
  },
  */
  {
    path: '/project/webui',
    name: 'webui',
    component: WebUiProject,
    meta: {
      label: 'Web UI Test',
      requireAuth: false
    }
  },
  {
    path: '/craft/interface',
    name: 'interface',
    component: Interface,
    meta: {
      label: '接口测试(Web)',
      requireAuth: false
    }
  },
  {
    path: '/craft/interfacerun',
    name: 'interfacerun',
    component: InterfaceRun,
    meta: {
      label: '接口测试(Web)执行',
      requireAuth: false
    }
  },

  {
    path: '/docs/course',
    name: 'course',
    component: Course,
    meta: {
      label: 'Course',
      requireAuth: false
    }
  },
  {
    path: '/docs/apis',
    name: 'apis',
    component: Apis,
    meta: {
      label: 'Apis',
      requireAuth: false
    }
  },
  {
    path: '/docs/about',
    name: 'about',
    component: About,
    meta: {
      label: 'About',
      requireAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      label: '登陆',
      layout: 'blank'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      label: '注册',
      layout: 'blank'
    }
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: P404,
    meta: {
      label: '挂了',
      layout: 'blank'
    }
  }
]

const router = new VueRouter({
  mode: 'history', // github需要关闭
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
