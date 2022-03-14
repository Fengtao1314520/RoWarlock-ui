import { BODYMODE, METHOD } from '../internal'
import superagent from 'superagent'
import qs from 'qs'

/**
 * HTTP 方法入口
 * 无Cors
 * 基本使用这个
 * NOTICE: 在真实的操作中,仅暴露整个方法对外
 * @param {Object} stepinfo 步骤信息
 */
const httpEntranceNoCors = stepinfo => {
  const method = stepinfo.request.method // 提取方法
  const url = stepinfo.request.url.raw // 提取网址
  const headers = returnHeaders(stepinfo.request.header) // 变更headers
  let result
  let body
  switch (method) {
    case METHOD.POST:
      body = returnBody(stepinfo.request.body) // 定义body
      result = postFuncNoCors(url, headers, body)
      break
    case METHOD.GET:
      result = getFuncNoCors(url, headers)
      break
  }
  return result
}

/**
 * 无Cors的POST方法
 * @param {String} url 发送地址
 * @param {Object} header 发送头
 * @param {*} body 发送实体
 */
const postFuncNoCors = (url, header, body) => {
  return new Promise(function(resolve, reject) {
    superagent
      .post(url)
      .send(body)
      .set(header)
      .end(function(err, res) {
        if (err) return reject(err)
        resolve(res)
      })
  })
}

/**
 * 无Cors的GET方法
 * @param {String} url 发送地址
 * @param {Object} header 发送头
 */
const getFuncNoCors = (url, header) => {
  return new Promise(function(resolve, reject) {
    superagent
      .get(url)
      .withCredentials()
      .set(header)
      .end(function(err, res) {
        if (err) return reject(err)
        resolve(res)
      })
  })
}

/**
 * 设置header
 * 头
 * @param {Array} headerarray
 * @returns {Object} headers header对象集
 */
function returnHeaders(headerarray) {
  // 准备headers
  const headers = {}
  headerarray.forEach(element => {
    if (element.select === true) {
      headers[element.key] = element.value
    }
  })
  return headers
}

/**
 * 返回body体
 * @param {Object} bodyObject stepinfo.body对象
 */
function returnBody(bodyObject) {
  let body // 变更headers
  const bodymode = bodyObject.mode
  if (bodymode === BODYMODE.FORMDATA) {
    body = returnBodyForm(bodyObject.formbody)
  } else if (bodymode === BODYMODE.URLENCODED) {
    body = returnBodyForm(bodyObject.formbody)
  } else if (bodymode === BODYMODE.JSON) {
    body = returnBodyObject(bodyObject.formbody)
  } else {
    body = returnBodyObject(bodyObject.raw)
  }

  return body
}

/**
 * 设置body form格式
 * body
 * @param {Array} bodyarray
 * @returns
 */
function returnBodyForm(bodyarray) {
  const body = {}

  bodyarray.forEach(element => {
    if (element.select === true) {
      body[element.key] = element.value
    }
  })
  const bodyF = qs.stringify(body) // 转为FormData模式
  return bodyF
}

/**
 * 设置body object格式
 * body
 * @param {*} bodyarray
 * @returns
 */
function returnBodyObject(bodyarray) {
  const body = {}
  bodyarray.forEach(element => {
    if (element.select === true) {
      body[element.key] = element.value
    }
  })
  return body
}
