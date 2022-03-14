import axios from 'axios'

/*
! update 2021-08-11 更新为发送JSON数据，且暴露三个参数给使用
*/

/**
 * HTTP 方法入口
 * 远程执行api测试的
 * 远程
 * NOTICE: 在真实的操作中,仅暴露整个方法对外
 * @param {Object} stepinfo 步骤信息
 */
const httpRemoteEntrance = stepinfo => {
  // console.log(stepinfo)
  const content = {
    url: stepinfo.request.url.raw, // 提取网址
    method: stepinfo.request.method, // 提取方法 POST/GET/其他
    header: stepinfo.request.header, // request headers
    bodymode: stepinfo.request.body.mode, // 发送form / json或其他
    formbody: stepinfo.request.body.formbody, // 发送form数据
    formraw: stepinfo.request.body.raw, // 发送 json数据
    query: stepinfo.request.url.query // get的 query数据
  }
  const contentstr = JSON.stringify(content)
  return new Promise(function(resolve, reject) {
    postFunc('/AutoTest/apitest', contentstr)
      .then(res => {
        resolve(res.resbody)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * POST方法
 * @param {String} url 发送地址
 * @param {Object} body 发送实体  可为空
 * @param {String} userid 用户id 默认为空
 */
const postFunc = (url, body, userid = null) => {
  // 起步
  axios.defaults.baseURL = '/api'
  axios.defaults.withCredentials = true
  // 准备数据
  let bodyF = {}
  if (userid != null) {
    bodyF = {
      userid: userid,
      content: body
    }
  } else {
    bodyF = body
  }
  // const bodyF = qs.stringify(body) // 转为FormData模式
  return new Promise(function(resolve, reject) {
    axios
      .post(url, bodyF)
      .then(res => {
        console.log(res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * GET方法
 * @param {String} url 发送地址
 * @param {Object} params restful的param参数
 */
const getFunc = (url, params) => {
  // console.log(params)
  // 起步
  axios.defaults.baseURL = '/api'
  axios.defaults.withCredentials = true
  // 准备数据
  return new Promise(function(resolve, reject) {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        console.log(res.data)
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export { httpRemoteEntrance }
export { postFunc, getFunc }
