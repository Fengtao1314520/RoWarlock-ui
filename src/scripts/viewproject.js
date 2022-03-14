import dateFormat from 'dateformat'
import { getFunc } from './internal/httpFunc'
import store from '../store/index'
import { nowdate } from './common'
import { makeEemu, TASKSTATUS_EN } from './internal'
import { MESSAGEORIGIN_CN, MESSAGETYPE_CN, createGUID } from './internal'
/**
 * 本地临时
 * 基于日期的状态任务数据
 */
let tempDefaultStatusByDateData = {}

// #region  对外访问

/**
 * 获取所有任务，且不包含任何条件.仅包含用户id
 */
const getAllTaskWithoutAny = () => {
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    getFunc('/query/getalltask', { userid: user.id, project: 'all' })
      .then(result => {
        resolve(result.resbody)
      })
      .catch(() => {
        reject('')
      })
  })
}

/**
 * 依赖项目名称，获取已映射的任务
 * @param {*} projectname 项目名称
 */
const getMappingTaskByProjectName = projectname => {
  return new Promise(function(resolve, reject) {
    getFunc('/craft/getallbymapping', {
      name: projectname
    })
      .then(result => {
        if (result.resstatus === true) {
          resolve(result.resbody)
        } else {
          reject('empty1')
        }
      })
      .catch(() => {
        reject('empty2')
      })
  })
}

/**
 * 依赖项目名称获取项目的基本内容
 * @param {*} projectinfo 项目信息
 */
const getProjectBasicInfo = projectinfo => {
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const projectdata = {
      name: projectinfo.name,
      total: 112,
      completed: 34,
      exec: 55,
      hold: 22,
      block: 12,
      cover: 33
    }
    return projectdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    const tempdata = localGetProjectBasicInfo(p) // 本地方法 做执行
    return tempdata
  }
}

/**
 * 本地方法
 * 根据数据获取前7天的状态任务
 * 某某天，TASKSTATUS_EN(CN)多少
 * @param {*} projectinfo 项目信息
 */
const getPorjectStatusByDate = projectinfo => {
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetPorjectStatusByDate()
    return tempdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }

    const tempdata = localGetPorjectStatusByDate(p) // 本地方法 做执行
    return tempdata
  }
}

/**
 * 本地方法
 * 按照time进行24小时内更新分布
 * @param {*} projectinfo 项目信息
 */
const getProjectStatusByTimeA = projectinfo => {
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetPorjectStatusByTime()
    return tempdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    const tempdata = localGetPorjectStatusByTimeA(p) // 本地方法 做执行
    return tempdata
  }
}

/**
 * 本地方法
 * 按照time进行24小时内更新分布
 * @param {*} projectinfo 项目信息
 */
const getProjectStatusByTimeB = projectinfo => {
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetPorjectStatusByTime()
    return tempdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    const tempdata = localGetPorjectStatusByTimeB(p) // 本地方法 做执行
    return tempdata
  }
}

/**
 * 项目轮播展示
 * @param {*} projectinfo 项目信息
 */
const getCarousels = projectinfo => {
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetCarousels(projectinfo.name)
    return tempdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    const tempdata = localGetCarousels(p) // 本地方法 做执行
    return tempdata
  }
}

/**
 * COM: tasktile.vue
 * NOTICE: 应该从后端返回对应人的所有任务
 */
const getTotalTaskByProject = projectinfo => {
  // demo数据
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetTotalTaskByProject()
    return tempdata
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    if (JSON.stringify(p) !== '{}') {
      const tempdata = localGetTotalTaskByProject(p) // 本地方法 做执行
      return tempdata
    }
  }
}

const getProjectCover = projectinfo => {
  // demo数据
  if (projectinfo.name === 'first' || projectinfo.name === 'second') {
    const tempdata = demoGetProjectCover()
    return {
      data: tempdata
    }
  } else {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    let p = {} // 赋值
    if (projectinfo.index === 0) {
      p = store.state.viewproject.firstproject
    } else {
      p = store.state.viewproject.secondproject
    }
    if (JSON.stringify(p) !== '{}') {
      const tempdata = localGetProjectCover(p) // 本地方法 做执行
      return {
        data: tempdata
      }
    }
  }
}
// #endregion

// #region 本地数据处理

/**
 * 本地方法
 * 处理已经从VUEX内的获取的项目对象
 */
function localGetProjectBasicInfo(projectobj) {
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象
  const total = projectjson.length // 总长就是总数
  let completed = 0
  let exec = 0
  let hold = 0
  let block = 0
  // NOTICE: 超过3日没有处理HOLD，超过3日没有处理BLOCK,以及状态对应的都要计算和添加
  projectjson.forEach(element => {
    const taskstatus = element.taskstatus
    if (taskstatus <= 3) {
      // 可能有一些任务已经在3呆了很久了，需要计算 (超过3日没有处理HOLD，超过3日没有处理BLOCK)
      const nowdateD = new Date(element.datetime) // 创建日
      const lastdateD = new Date(element.updatedatetime) // 最后更新日
      const datediff = Math.abs(nowdateD.getTime() - lastdateD.getTime()) / 86400000 // 时差
      if (datediff < 3) {
        exec = exec + 1
      } else if (datediff <= 3 && datediff > 1) {
        hold = hold + 1
      } else if (datediff >= 5) {
        block = block + 1
      }
    } else if (taskstatus === 4) {
      completed = completed + 1
    } else if (taskstatus === 5) {
      hold = hold + 1
    } else if (taskstatus === 6) {
      block = block + 1
    }
  })
  // 组织数据
  const projectdata = {
    name: projectobj.projectname,
    total: total,
    completed: completed,
    exec: exec,
    hold: hold,
    block: block,
    cover: Math.ceil(completed / total)
  }
  return projectdata
}

/**
 * 本地方法
 * 处理已经从VUEX内的获取的项目对象
 * 返回demoGetPorjectStatusByDate相同的对象
 */
function localGetPorjectStatusByDate(projectobj) {
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象
  tempDefaultStatusByDateData = createTempProjectStatusByDateData()
  // 循环操作执行
  projectjson.forEach(element => {
    const taskstatus = element.taskstatus
    const nowdateD = new Date(element.datetime) // 创建日
    const lastdateD = new Date(element.updatedatetime) // 最后更新日
    const datediff = Math.abs(nowdateD.getTime() - lastdateD.getTime()) / 86400000 // 时差
    baseStatusAndDateDiff(taskstatus, datediff) // 带入做执行
  })
  return tempDefaultStatusByDateData
}

/**
 * 本地方法
 * 处理已经从VUEX内的获取的项目对象
 * 返回demoGetPorjectStatusByTime相同的对象
 */
function localGetPorjectStatusByTimeA(projectobj) {
  const now = new Date()
  const beforetime = dateFormat(now, 'yyyy-mm-dd')
  // console.log(beforetime)
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象

  // 返回数据
  const tempdate = {
    data: [0],
    categories: [beforetime + 'T00:00:00.000Z']
  }
  const res = {}
  const hours = []
  // 循环操作执行
  projectjson.forEach(element => {
    const lastdateD = new Date(element.updatedatetime) // 最后更新日
    const hour = lastdateD.getHours() // 小时
    hours.push(hour)
  })

  // 计算落点
  hours.forEach(e => {
    res[e] = res[e] >= 1 ? res[e] + 1 : 1
  })

  // 属性名排序
  const newData = {}
  Object.keys(res)
    .sort()
    .map(key => {
      newData[key] = res[key]
    })

  // 赋值
  Object.values(newData).forEach(item => {
    tempdate.data.push(item)
  })

  Object.keys(newData).forEach(item => {
    if (item < 10) {
      tempdate.categories.push(beforetime + 'T0' + item + ':00:00.000Z')
    } else {
      tempdate.categories.push(beforetime + 'T' + item + ':00:00.000Z')
    }
  })
  console.log(tempdate)
  return tempdate
}

/**
 * 本地方法
 * 处理已经从VUEX内的获取的项目对象
 * 返回demoGetPorjectStatusByTime相同的对象
 */
function localGetPorjectStatusByTimeB(projectobj) {
  const now = new Date()
  const beforetime = dateFormat(now, 'yyyy-mm-dd')
  // console.log(beforetime)
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象

  // 返回数据
  const tempdate = {
    data: [0],
    categories: [beforetime + 'T00:00:00.000Z']
  }
  const res = {}
  const hours = []
  // 循环操作执行
  projectjson.forEach(element => {
    const dateD = new Date(element.datetime) // 最后更新日
    const hour = dateD.getHours() // 小时
    hours.push(hour)
  })

  // 计算落点
  hours.forEach(e => {
    res[e] = res[e] >= 1 ? res[e] + 1 : 1
  })

  // 属性名排序
  const newData = {}
  Object.keys(res)
    .sort()
    .map(key => {
      newData[key] = res[key]
    })

  // 赋值
  Object.values(newData).forEach(item => {
    tempdate.data.push(item)
  })

  Object.keys(newData).forEach(item => {
    if (item < 10) {
      tempdate.categories.push(beforetime + 'T0' + item + ':00:00.000Z')
    } else {
      tempdate.categories.push(beforetime + 'T' + item + ':00:00.000Z')
    }
  })
  console.log(tempdate)
  return tempdate
}

/**
 * 创建轮询信息
 * @param {*} projectobj
 */
function localGetCarousels(projectobj) {
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象
  const tempcarousels = []
  projectjson.forEach(element => {
    const nowdateD = new Date(element.datetime) // 创建日
    const lastdateD = new Date(element.updatedatetime) // 最后更新日
    const datediff = Math.abs(nowdateD.getTime() - lastdateD.getTime()) / 86400000 // 时差
    const keyword = baseTaskAndDateDiff(element, datediff)
    // console.log(keyword)
    // 组装数据
    const carousel = {
      projectname: projectobj.name,
      messageorigin: keyword.origin, // 消息来源
      messagetype: keyword.type, // 消息类型
      datetime: element.updatedatetime, // 最后更新时间
      messagetitle: keyword.title, // 标题
      messagecontent: keyword.content // 内容
    }
    tempcarousels.push(carousel)
  })

  const gc = []
  gc[0] = tempcarousels
  gc[1] = tempcarousels

  return gc
}

/**
 * 获取全任务信息，并处理
 */
function localGetTotalTaskByProject(projectobj) {
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象
  const temptotal = []
  projectjson.forEach((element, index) => {
    const single = {
      id: index,
      taskid: element.id,
      taskname: element.name,
      content: element
    }
    // console.log(projectobj.worktable)
    single.tasktype = projectobj.worktable
    // 任务状态
    if (element.taskstatus < 2) {
      single.taskstatus = TASKSTATUS_EN.NEW
    } else if (element.taskstatus < 4) {
      single.taskstatus = TASKSTATUS_EN.EXEC
    } else if (element.taskstatus === 4) {
      single.taskstatus = TASKSTATUS_EN.COMPLETED
    } else if (element.taskstatus === 5) {
      single.taskstatus = TASKSTATUS_EN.HOLD
    } else {
      single.taskstatus = TASKSTATUS_EN.BLOCK
    }
    temptotal.push(single)
  })
  return temptotal
}

/**
 * 获取项目中基于对应已绑定的覆盖率形成treemap
 * @param {*} projectobj
 */
function localGetProjectCover(projectobj) {
  const projectjson = JSON.parse(projectobj.tasklist) // 转为JSON对象
  // 循环操作执行
  const tempdata = [
    {
      x: '小于3日',
      y: 1
    },
    {
      x: '小于5日',
      y: 1
    },
    {
      x: '小于7日',
      y: 1
    },
    {
      x: '大于10日',
      y: 1
    }
  ]
  projectjson.forEach(element => {
    const nowdateD = new Date(element.datetime) // 创建日
    const lastdateD = new Date(element.updatedatetime) // 最后更新日
    const datediff = Math.abs(nowdateD.getTime() - lastdateD.getTime()) / 86400000 // 时差

    if (datediff <= 3) {
      tempdata[0].y = tempdata[0].y + 1
    } else if (datediff > 3 && datediff <= 5) {
      tempdata[1].y = tempdata[1].y + 1
    } else if (datediff > 5 && datediff <= 7) {
      tempdata[2].y = tempdata[2].y + 1
    } else {
      tempdata[3].y = tempdata[3].y + 1
    }
  })
  return tempdata
}

// #endregion

// #region demo数据

function demoGetPorjectStatusByDate() {
  const tempdate = []
  // 组装数据
  const tsen = makeEemu(TASKSTATUS_EN)
  tsen.splice(0, 1) // 删除第一个
  tsen.forEach(element => {
    const value = []
    for (let index = 0; index < 7; index++) {
      let tempvalue
      if (element === TASKSTATUS_EN.TOTAL) {
        tempvalue = Math.ceil(Math.random() * 10 + 3) + 100 // 数值
      } else {
        tempvalue = Math.ceil(Math.random() * 10 + 3) // 数值
      }
      value.push({
        date: index, // 日期
        value: tempvalue
      })
    }
    const date = {
      type: element,
      values: value
    }
    tempdate.push(date)
  })
  return tempdate
}

function demoGetPorjectStatusByTime() {
  const tempdate = {
    data: [31, 40, 28, 51, 42, 109, 100],
    categories: [
      '2018-09-19T00:00:00.000Z',
      '2018-09-19T01:30:00.000Z',
      '2018-09-19T02:30:00.000Z',
      '2018-09-19T03:30:00.000Z',
      '2018-09-19T04:30:00.000Z',
      '2018-09-19T05:30:00.000Z',
      '2018-09-19T06:30:00.000Z'
    ]
  }
  return tempdate
}

function demoGetCarousels(porjectname) {
  const tempcarousels = []
  // 组装数据
  const moorigins = makeEemu(MESSAGEORIGIN_CN)
  const mtypes = makeEemu(MESSAGETYPE_CN)
  for (let index = 0; index < 20; index++) {
    const tmorigin = Math.floor(Math.random() * moorigins.length) // 随机状态
    const tmtype = Math.floor(Math.random() * mtypes.length) // 随机状态

    const carousel = {
      projectname: porjectname,
      messageorigin: moorigins[tmorigin], // 消息来源
      messagetype: mtypes[tmtype], // 消息类型
      datetime: nowdate(), // 发送消息时间
      messagetitle: 'DEBUG测试尝试abcd' + index,
      messagecontent: 'Bulma is a free, open source'
    }
    tempcarousels.push(carousel)
  }
  // 组织数据
  const findata = []
  findata[0] = tempcarousels
  findata[1] = tempcarousels

  return findata
}

function demoGetTotalTaskByProject() {
  const temptotal = []
  // 组装数据
  const status = [TASKSTATUS_EN.COMPLETED, TASKSTATUS_EN.EXEC, TASKSTATUS_EN.HOLD, TASKSTATUS_EN.BLOCK]
  for (let index = 0; index < 25; index++) {
    const sar = Math.floor(Math.random() * status.length) // 随机状态
    const element = {
      id: index,
      createdate: nowdate(),
      modifydate: nowdate(),
      assigner: '居溱',
      createautor: '冯涛',
      modifyautor: '刘凯',
      counter: 44,
      case: ['TTP 1111', 'TTP 2222', 'TTP 3333', 'TTP 4444'],
      us: ['US-0001 测试', 'US-0002 测试', 'US-0003 测试', 'US-0004 测试'],
      devicelist: [],
      scriptlist: ['test1.ts', 'test2.js', 'test3.xml'],
      configlist: ['archonetestttol.json'],
      reviewautor: '李荧辉',
      reviewstatus: 'need review',
      taskid: createGUID(),
      taskname: `Task0001_MTStar_US00` + index + `自动化测试`,
      tasktype: 'Develop',
      taskstatus: status[sar],
      isoffline: true
    }
    temptotal.push(element)
  }
  return temptotal
}

function demoGetProjectCover() {
  return [
    {
      x: 'New Delhi',
      y: 218
    },
    {
      x: 'Kolkata',
      y: 149
    },
    {
      x: 'Mumbai',
      y: 184
    },
    {
      x: 'Ahmedabad',
      y: 55
    },
    {
      x: 'Bangaluru',
      y: 84
    },
    {
      x: 'Pune',
      y: 31
    },
    {
      x: 'Chennai',
      y: 70
    },
    {
      x: 'Jaipur',
      y: 30
    },
    {
      x: 'Surat',
      y: 44
    },
    {
      x: 'Hyderabad',
      y: 68
    },
    {
      x: 'Lucknow',
      y: 28
    },
    {
      x: 'Indore',
      y: 19
    },
    {
      x: 'Kanpur',
      y: 29
    }
  ]
}

// #endregion

// #region 其他

/**
 * 组装一个默认为0的数据
 * @returns
 */
function createTempProjectStatusByDateData() {
  const temp = []
  // 组装数据
  const tsen = makeEemu(TASKSTATUS_EN)
  tsen.splice(0, 1) // 删除cover
  tsen.splice(1, 1) // 删除total
  tsen.forEach(element => {
    // 按照日期的存放的单日数据
    const datevalue = []
    for (let index = 0; index < 7; index++) {
      datevalue.push({
        date: index, // 日期
        value: 0
      })
    }
    // 按照任务类型组装的对象
    const taskvalue = {
      type: element,
      values: datevalue
    }
    temp.push(taskvalue)
  })
  // console.log(temp)
  return temp
}

/**
 * 根据任务状态和差值日期填入temp
 * @param {*} tempdate
 * @param {*} status
 * @param {*} datediff
 */
function baseStatusAndDateDiff(status, datediff) {
  if (status < 2) {
    if (datediff < 2) {
      tempDefaultStatusByDateData[0].values[0].value++
    } else if (datediff < 3) {
      tempDefaultStatusByDateData[0].values[1].value++
    } else if (datediff < 4) {
      tempDefaultStatusByDateData[0].values[2].value++
    } else if (datediff < 5) {
      tempDefaultStatusByDateData[0].values[3].value++
    } else if (datediff < 6) {
      tempDefaultStatusByDateData[0].values[4].value++
    } else if (datediff < 7) {
      tempDefaultStatusByDateData[0].values[5].value++
    } else {
      tempDefaultStatusByDateData[0].values[6].value++
    }
  } else if (status < 4) {
    if (datediff < 2) {
      tempDefaultStatusByDateData[2].values[0].value++
    } else if (datediff < 3) {
      tempDefaultStatusByDateData[2].values[1].value++
    } else if (datediff < 4) {
      tempDefaultStatusByDateData[2].values[2].value++
    } else if (datediff < 5) {
      tempDefaultStatusByDateData[2].values[3].value++
    } else if (datediff < 6) {
      tempDefaultStatusByDateData[2].values[4].value++
    } else if (datediff < 7) {
      tempDefaultStatusByDateData[2].values[5].value++
    } else {
      tempDefaultStatusByDateData[2].values[6].value++
    }
  } else if (status === 4) {
    if (datediff < 2) {
      tempDefaultStatusByDateData[1].values[0].value++
    } else if (datediff < 3) {
      tempDefaultStatusByDateData[1].values[1].value++
    } else if (datediff < 4) {
      tempDefaultStatusByDateData[1].values[2].value++
    } else if (datediff < 5) {
      tempDefaultStatusByDateData[1].values[3].value++
    } else if (datediff < 6) {
      tempDefaultStatusByDateData[1].values[4].value++
    } else if (datediff < 7) {
      tempDefaultStatusByDateData[1].values[5].value++
    } else {
      tempDefaultStatusByDateData[1].values[6].value++
    }
  } else if (status === 5) {
    if (datediff < 2) {
      tempDefaultStatusByDateData[3].values[0].value++
    } else if (datediff < 3) {
      tempDefaultStatusByDateData[3].values[1].value++
    } else if (datediff < 4) {
      tempDefaultStatusByDateData[3].values[2].value++
    } else if (datediff < 5) {
      tempDefaultStatusByDateData[3].values[3].value++
    } else if (datediff < 6) {
      tempDefaultStatusByDateData[3].values[4].value++
    } else if (datediff < 7) {
      tempDefaultStatusByDateData[3].values[5].value++
    } else {
      tempDefaultStatusByDateData[3].values[6].value++
    }
  } else if (status === 6) {
    if (datediff < 2) {
      tempDefaultStatusByDateData[4].values[0].value++
    } else if (datediff < 3) {
      tempDefaultStatusByDateData[4].values[1].value++
    } else if (datediff < 4) {
      tempDefaultStatusByDateData[4].values[2].value++
    } else if (datediff < 5) {
      tempDefaultStatusByDateData[4].values[3].value++
    } else if (datediff < 6) {
      tempDefaultStatusByDateData[4].values[4].value++
    } else if (datediff < 7) {
      tempDefaultStatusByDateData[4].values[5].value++
    } else {
      tempDefaultStatusByDateData[4].values[6].value++
    }
  }
}

function baseTaskAndDateDiff(task, datediff) {
  const keyword = {}
  const taskstatus = task.taskstatus
  if (taskstatus <= 3) {
    // 新增
    if (datediff < 4) {
      keyword.origin = MESSAGEORIGIN_CN.USER + '&' + MESSAGEORIGIN_CN.TASK
      keyword.type = MESSAGETYPE_CN.PASS
      keyword.title = keyword.origin + '创建' + " '" + task.name + "' "
    } else {
      keyword.origin = MESSAGEORIGIN_CN.ADMIN + '&' + MESSAGEORIGIN_CN.SERVER
      keyword.type = MESSAGETYPE_CN.WARNING
      keyword.title = keyword.origin + '更新' + " '" + task.name + "' "
    }
  } else {
    // 执行（包含hold/block
    if (datediff < 4) {
      keyword.origin = MESSAGEORIGIN_CN.USER + '&' + MESSAGEORIGIN_CN.SERVER
      keyword.type = MESSAGETYPE_CN.INFO
      keyword.title = keyword.origin + '执行' + " '" + task.name + "' "
    } else {
      keyword.origin = MESSAGEORIGIN_CN.ADMIN + '&' + MESSAGEORIGIN_CN.SERVER
      keyword.type = MESSAGETYPE_CN.EXCEPTION
      keyword.title = keyword.origin + '移出' + " '" + task.name + "' "
    }
  }
  keyword.content = keyword.title + ', 请注意任务状态变化和时效'

  return keyword
}

// #endregion

export {
  getMappingTaskByProjectName,
  getProjectBasicInfo,
  getPorjectStatusByDate,
  getProjectStatusByTimeA,
  getProjectStatusByTimeB,
  getCarousels,
  getTotalTaskByProject,
  getAllTaskWithoutAny,
  getProjectCover
}
