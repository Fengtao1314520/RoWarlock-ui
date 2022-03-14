import { AssistTestSuite } from '../scripts/fileFunc'
import store from '../store/index'
import { BODYMODE, createGUID, METHOD } from './internal'
import { getFunc, postFunc } from './internal/httpFunc'

/**
 * 返回一个空的新的testsuite
 */
const returnEmptyTestSuite = name => {
  const suite = {
    name: name,
    cases: [],
    // 工具使用
    show: false
  }
  return suite
}

/**
 * 返回一个空的新的testsuite
 */
const returnEmptyTestCase = name => {
  const tcase = {
    name: name,
    steps: [],
    // 工具使用
    show: false
  }
  return tcase
}

/**
 * 返回一个空的新的teststep
 */
const returnEmptyTestStep = name => {
  const tempstep = {
    id: createGUID(),
    name: name,
    request: {
      method: METHOD.GET
    }
  }
  tempstep.request.body = {
    mode: BODYMODE.FORMDATA,
    formbody: [],
    raw: ''
  }
  tempstep.request.header = []
  tempstep.request.url = {
    raw: 'http://127.0.0.1:8090/mtstar',
    protocol: '',
    host: [],
    port: '',
    path: [],
    query: []
  }
  tempstep.response = {}
  return tempstep
}

/**
 * 根据body模式更改CONTENTTYPE
 * @param {*} bodymode body模式
 */
const getContentType = bodymode => {
  let conntenttype
  switch (bodymode) {
    case 'formdata':
      conntenttype = 'multipart/form-data'
      break
    case 'urlencoded':
      conntenttype = 'application/x-www-form-urlencoded'
      break
    case 'JSON':
      conntenttype = 'application/json'
      break
    case 'Text':
      conntenttype = 'text/plain'
      break
    case 'XML':
      conntenttype = 'application/XML'
      break
    case 'HTML':
      conntenttype = 'text/html'
      break
    default:
      conntenttype = 'application/json'
      break
  }
  return conntenttype
}

/**
 * 更新数据到数据库
 * @param {Array|Object} data
 * STATUS: 完成修改
 */
const updateDataToServer = data => {
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  const ats = AssistTestSuite(data)
  if (data.constructor === Array) {
    const jsstr = JSON.stringify(ats)
    const fd = {
      userid: user.id,
      content: jsstr
    }
    postFunc('/craft/interface/multi', fd)
    console.log('更新testsuite集合成功')
  } else {
    const jsstr = JSON.stringify(data)
    const fd = {
      userid: user.id,
      content: jsstr
    }
    postFunc('/craft/interface/single', fd)
    console.log('更新testsuite成功')
  }
}

/**
 * 从数据库获取数据
 * STATUS: 完成修改
 */
const getAllDataToServer = () => {
  // 赋值
  return new Promise(function(resolve, reject) {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    const user = store.state.common.activeusers
    if (user.id === '') {
      user.id = localStorage.getItem('ro_token')
    }
    getFunc('/craft/interface/getall', { userid: user.id }).then(res => {
      if (res.resstatus === true) {
        resolve(res.resbody.content)
      } else {
        reject(null)
      }
    })
  })
}

export {
  returnEmptyTestSuite,
  returnEmptyTestCase,
  returnEmptyTestStep,
  getContentType,
  updateDataToServer,
  getAllDataToServer
}
