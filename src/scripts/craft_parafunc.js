import store from '../store'
import { getFunc, postFunc } from './internal/httpFunc'

/**
 * 从数据库获取数据
 * 获取para&func
 */
const getAllDataToServer = () => {
  // 赋值
  return new Promise(function(resolve, reject) {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    const user = store.state.common.activeusers
    if (user.id === '') {
      user.id = localStorage.getItem('ro_token')
    }
    getFunc('/parafunc/getall', { userid: user.id }).then(res => {
      if (res.resstatus === true) {
        resolve(res.resbody)
      } else {
        reject(null)
      }
    })
  })
}

/**
 * 更新和升级parafunc
 * @param {object} onepackage 包信息
 */
const updateDataToServer = onepackage => {
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  const jsstr = JSON.stringify(onepackage)
  const fd = {
    userid: user.id,
    content: jsstr
  }
  postFunc('/parafunc/updatepackageinfo', fd)
  console.log('更新parafunc集合成功')
}

/**
 * 删除包
 * @param onepackage
 */
const deleteDataToServer = onepackage => {
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  postFunc('/parafunc/deletepackage', onepackage)
  console.log('删除parafunc集合成功')
}

export { getAllDataToServer, updateDataToServer, deleteDataToServer }
