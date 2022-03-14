/**
 * 定义任务状态
 * 英语
 * update 2021-10-14与后端基本保持一致，同时删除cover和TOTAL
 */
const TASKSTATUS_EN = {
  // COVER: 'cover',
  // TOTAL: 'total',
  NEW: 'new',
  DOING: 'doing',
  READY: 'ready',
  COMPLETED: 'completed',
  EXEC: 'exec',
  HOLD: 'hold',
  BLOCK: 'block'
}

/**
 * 定义任务状态
 * 中文
 * update 2021-10-14与后端基本保持一致
 */
const TASKSTATUS_CN = {
  // COVER: '覆盖率',
  // TOTAL: '总任务',
  NEW: '新建',
  DOING: '正在执行',
  READY: '已准备',
  COMPLETED: '已完成',
  EXEC: '执行中',
  HOLD: '挂起',
  BLOCK: '冻结'
}

/**
 * 消息来源
 * 中文
 */
const MESSAGEORIGIN_CN = {
  USER: '用户',
  TASK: '任务',
  SERVER: '服务器',
  REMOTE: '远程机',
  LOCAL: '本地机',
  ADMIN: '管理员',
  UNKNOW: '未知来源'
}
/**
 * 消息类型
 * 中文
 */
const MESSAGETYPE_CN = {
  INFO: '信息',
  WARNING: '警告',
  ERROR: '错误',
  PASS: '成功',
  FAIL: '失败',
  EXCEPTION: '异常',
  UNKNOW: '未知'
}

/**
 * 消息类型
 * 英文
 */
const MESSAGETYPE_EN = {
  INFO: 'Info',
  WARNING: 'Warning',
  ERROR: 'Error',
  PASS: 'Pass',
  FAIL: 'Fail',
  EXCEPTION: 'Exception',
  UNKNOW: 'Unknow'
}

/**
 * NOTICE:
 * TASK->task
 * JOB->当task执行，整个生命周期叫做job
 * THREAD->job内部分可能会被执行多次(例如debug之类)，每循环执行一部分被称为thread
 *
 *
 */
const SINGLETYPE = {
  TASK: 'Task',
  JOB: 'Job',
  THREAD: 'Thread'
}

/**
 * 用户定义颜色
 *
 */
const COSTUMERCOLOR = {
  INFO: '#0779e4',
  WARNING: '#ffee93',
  ERROR: '#ff8585',
  PASS: '#16c79a',
  FAIL: '#ff4646',
  EXCEPTION: '#d22780',
  UNKNOW: '#dddddd'
}

/**
 * HTTP 方法
 * METHOD
 */
const METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

/**
 * header头
 */
const HEADERKEY = {
  ACCPET: 'Accept',
  ACCEPTENCODING: 'Accept-Encoding',
  ACCEPTLANGUAGE: 'Accept-Language',
  CACHECONTROL: 'Cache-Control',
  COOKIE: 'Cookie',
  CONTENTLENGTH: 'Content-Length',
  CONTENTTYPE: 'Content-Type',
  HOST: 'Host',
  USERAGENT: 'User-Agent'
}

/**
 * BODY的字段格式
 */
const BODYMODE = {
  FORMDATA: 'formdata',
  URLENCODED: 'urlencoded',
  JSON: 'JSON',
  TEXT: 'Text',
  XML: 'XML',
  HTML: 'HTML'
}

/**
 * 执行判定逻辑
 * NOTICE: 先这么多把
 *
 */
const CHECKLOGIC = [
  {
    name: '验证Code等于',
    flag: 0,
    value: ''
  },
  {
    name: 'response body包含数据',
    flag: 1,
    value: ''
  },
  {
    name: 'response JSON数据项等于',
    flag: 2,
    value: ''
  }
]
/**
 * 枚举值变为数组
 * @param {*} emun 枚举对象
 */
const makeEemu = emun => {
  const all = []
  for (const key in emun) {
    all.push(emun[key])
  }
  return all
}

/**
 * 生成guid
 */
const createGUID = () => {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      guid += '-'
    }
  }
  return guid
}

export {
  TASKSTATUS_EN,
  TASKSTATUS_CN,
  MESSAGEORIGIN_CN,
  MESSAGETYPE_CN,
  MESSAGETYPE_EN,
  SINGLETYPE,
  COSTUMERCOLOR,
  METHOD,
  HEADERKEY,
  BODYMODE
}

export { makeEemu, createGUID, CHECKLOGIC }
