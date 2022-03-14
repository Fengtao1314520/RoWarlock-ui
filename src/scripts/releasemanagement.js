import store from '../store/index'
import { getFunc, postFunc } from './internal/httpFunc'
import { nowdate } from './common'
import { createGUID } from './internal'

/**
 * 获取全部的释放信息存档
 * update 2021-10-18 虚假的使用一下userid
 * */
const getAllRelease = () => {
  let tempvalue = []
  if (store.state.releasemanagement.allRelease.length === 0 || store.state.releasemanagement.allRelease === null || store.state.releasemanagement.allRelease === undefined) {
    for (let i = 0; i < 15; i++) {
      const tmp = createRelease()
      tmp.name = '释放测试abcDEF_' + i
      tmp.author = 'Nate'
      tmp.assigner = '法外狂徒'
      tmp.taskstatus = Math.ceil(Math.random() * 3)
      tempvalue.push(tmp)
    }
  } else {
    // 非空用store内的
    tempvalue = store.state.releasemanagement.allRelease
  }
  // 赋值
  return new Promise(function(resolve, reject) {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    const user = store.state.common.activeusers
    if (user.id === '') {
      user.id = localStorage.getItem('ro_token')
    }
    getFunc('/query/release/getall', { userid: user.id }).then(res => {
      if (res.resstatus === true) {
        const body = JSON.parse(res.resbody)
        resolve(body)
      } else {
        reject(tempvalue)
      }
    }).catch(() => {
      reject(tempvalue)
    })
  })
}

/**
 * 保存Release
 * @param item 单个item
 */
const saveRelease = (item) => {
  // 保存到VUEX内
  const index = store.state.releasemanagement.allRelease.findIndex(orgitem => orgitem.id === item.id)
  const data = {
    index: index,
    body: item
  }
  store.commit('saveRelease', data) // 提交更新VUEX
  // TODO 保存到数据库
}

/**
 * 保存 所有 Release
 * @param item 单个item
 */
const saveAllRelease = (items) => {
  store.commit('saveAllRelease', items) // 提交更新VUEX
}

/**
* 创建新的释放记录
* */
const createRelease = () => {
  const temp = {
    id: createGUID(),
    name: '',
    createdate: nowdate(),
    modifydate: nowdate(),
    author: '',
    assigner: '',
    tasktype: 'RELEASE',
    taskstatus: 'active',
    basic: {
      product: '',
      type: '',
      uppack: false,
      relphase: '',
      relversion: '',
      configsvn: '',
      expectdate: '',
      acutaldate: ''
    },
    trcase: [],
    email: {
      content: ''
    },
    check: {
      versionno: false,
      new: false,
      improve: false,
      fix: false,
      cod: false,
      updatepackage: false,
      license: false,
      regression: false,
      devlopreleasemail: true,
      testplan: true,
      releasedocument: true,
      use360: false,
      automatic: false,
      releasedocumentpath: '',
      version: '',
      codversion: '',
      skversion: ''
    }
  }
  // 返回值
  return temp
}

/**
 * 删除释放记录
 * @param item 单个item
 */
const deleteRelease = (item) => {
  // 保存到VUEX内
  const index = store.state.releasemanagement.allRelease.findIndex(orgitem => orgitem.id === item.id)
  if (index !== -1) {
    const data = {
      index: index,
      body: item
    }
    store.commit('deleteRelease', data) // 提交更新VUEX

    // TODO 保存到数据库
  }
}

// 导出
export { getAllRelease, createRelease, saveRelease, deleteRelease, saveAllRelease }
