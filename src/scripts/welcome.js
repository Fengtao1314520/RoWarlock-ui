
import store from '../store/index'
import { getFunc } from './internal/httpFunc'
import { nowdate } from './common'
import { makeEemu, MESSAGETYPE_EN, TASKSTATUS_EN } from './internal'

/**
 * 登录后，基本用户信息
 * COM: hometile.vue
 * STATUS: 2021-05-18   NEW完成修改
 */
const hero = () => {
  // 默认数据
  const defaultvalue = {
    name: '冯涛(Nate Feng)',
    lastlogintime: '2020-10-15T17:41:12',
    lastip: '127.0.0.1',
    exec: 55,
    completed: 12
  }
  return new Promise(function(resolve, reject) {
    // 含有后台的时候，可以直接从vuex内获取部分信息
    const user = store.state.common.activeusers
    if (user.id === '') {
      user.id = localStorage.getItem('ro_token')
    }
    // 再从远程获取对应的人员已完成和正在完成的任务
    getFunc('/query/taskonhero', { userid: user.id })
      .then(res => {
        if (res.resstatus === true) {
          // 赋值
          const result = {
            name: user.unickname,
            lastlogintime: user.ulastlogin,
            lastip: user.uhostname,
            exec: res.resbody.exec,
            completed: res.resbody.completed
          }
          resolve(result)
        }
      })
      .catch(() => {
        reject(defaultvalue)
      })
  })
}

/**
 * 个人活跃度
 * COM: basicchart.vue
 * STATUS: 2021-05-19   完成修改
 */
const personalactive = () => {
  // 临时值
  const defaultvalue = [
    {
      'series': '新建',
      'x': '1',
      'y': 85
    },
    {
      'series': '新建',
      'x': '2',
      'y': 64
    },
    {
      'series': '新建',
      'x': '3',
      'y': 222
    },
    {
      'series': '新建',
      'x': '4',
      'y': 485
    },
    {
      'series': '新建',
      'x': '5',
      'y': 587
    },
    {
      'series': '已完成',
      'x': '1',
      'y': 812
    },
    {
      'series': '已完成',
      'x': '2',
      'y': 383
    },
    {
      'series': '已完成',
      'x': '3',
      'y': 19
    },
    {
      'series': '已完成',
      'x': '4',
      'y': 459
    },
    {
      'series': '已完成',
      'x': '5',
      'y': 0
    },
    {
      'series': '执行中',
      'y': 272,
      'x': '1'
    },
    {
      'series': '执行中',
      'y': 767,
      'x': '2'
    },
    {
      'series': '执行中',
      'y': 173,
      'x': '3'
    },
    {
      'series': '执行中',
      'y': 250,
      'x': '4'
    },
    {
      'series': '执行中',
      'y': 957,
      'x': '5'
    },
    {
      'series': '挂起',
      'y': 37,
      'x': '1'
    },
    {
      'series': '挂起',
      'y': 951,
      'x': '2'
    },
    {
      'series': '挂起',
      'y': 26,
      'x': '3'
    },
    {
      'series': '挂起',
      'y': 89,
      'x': '4'
    },
    {
      'series': '挂起',
      'y': 918,
      'x': '5'
    },
    {
      'series': '冻结',
      'y': 808,
      'x': '1'
    },
    {
      'series': '冻结',
      'y': 972,
      'x': '2'
    },
    {
      'series': '冻结',
      'y': 726,
      'x': '3'
    },
    {
      'series': '冻结',
      'y': 556,
      'x': '4'
    },
    {
      'series': '冻结',
      'y': 697,
      'x': '5'
    }
  ]

  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    // 获取个人的前5日的任务
    getFunc('/query/taskonpersonal', { userid: user.id })
      .then(res => {
        if (res.resstatus === true) {
          const tempresult = []
          res.resbody.forEach(element => {
            // update: 2021-10-12换成ANTV G2图表
            for (const i in element.content) {
              if (element.content.hasOwnProperty(i)) { // 建议加上判断,如果没有扩展对象属性可以不加
                const temp = {
                  'series': i,
                  'y': element.content[i],
                  'x': element.beforeday.toString()
                }
                if (temp.y === 0) {
                  temp.y = Math.ceil(Math.random() * 12)
                }
                tempresult.push(temp)
              }
            }
          })
          resolve(tempresult)
        }
      })
      .catch(() => {
        reject(defaultvalue)
      })
  })
}

/**
 * 按照任务类别分拆执行
 * COM: hometile.vue
 * STATUS: 完成修改
 * NOTICE: 2021-05-19   完成修改
 */
const worktabletask = () => {
  const defaultvalue = [
    { type: 'APIs', value: 66, total: 123 },
    { type: 'Jobs', value: 34, total: 233 },
    { type: 'Mock', value: 11, total: 76 }
  ]
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    // 再从远程获取工作台前3的总结
    getFunc('/query/taskonworktable', { userid: user.id, count: 3 })
      .then(res => {
        if (res.resstatus === true) {
          resolve(defaultvalue)
        }
      })
      .catch(() => {
        reject(defaultvalue)
      })
  })
}

/**
 * 返回昨日任务执行情况s
 * NOTICE: 借用timeline的展示
 */
const getYestdayTaskInfo = () => {
  const defaultvalue = [
    {
      'type': 'Time1',
      'x': '任务1',
      'y': 765
    },
    {
      'type': 'Time2',
      'x': '任务2',
      'y': 44
    },
    {
      'type': 'Time3',
      'x': '任务3',
      'y': 443
    },
    {
      'type': 'Time4',
      'x': '任务4',
      'y': 123
    },
    {
      'type': 'Time5',
      'x': '任务5',
      'y': 434
    },
    {
      'type': 'Time6',
      'x': '任务6',
      'y': 342
    },
    {
      'type': 'Time7',
      'x': '任务7',
      'y': 323
    },
    {
      'type': 'Time8',
      'x': '任务8',
      'y': 236
    },
    {
      'type': 'Time9',
      'x': '任务9',
      'y': 546
    },
    {
      'type': 'Time10',
      'x': '任务10',
      'y': 435
    }
  ]

  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    // 再从远程获取昨日任务top10耗时的总结
    getFunc('/query/taskonyestday', { userid: user.id, count: 10 })
      .then(res => {
        if (res.resstatus === true) {
          // 处理放入JS文件
          const tempbardata = []
          const temparray = JSON.parse(res.resbody)
          // 初级处理
          temparray.forEach((element, index) => {
            const typestr = ('Time' + (index + 1)).toString()
            const temp =
                {
                  'type': typestr.toString(),
                  'x': element.taskname.toString(),
                  'y': element.usetime
                }
            if (temp.y > 1000) {
              temp.y = Math.ceil(Math.random() * 33)
            }
            tempbardata.push(temp)
          })
          resolve(tempbardata)
        }
      })
      .catch(() => {
        reject(defaultvalue)
      })
  })
}

/**
 * 获取最后10个允许任务
 * */
const getLastRun = () => {
  const defaultvalue = []
  const typearray = [MESSAGETYPE_EN.INFO.toLowerCase(), MESSAGETYPE_EN.ERROR.toLowerCase(), MESSAGETYPE_EN.WARNING.toLowerCase(), 'success']
  const status = makeEemu(TASKSTATUS_EN)
  for (let index = 0; index < 10; index++) {
    const tyepi = typearray[Math.floor((Math.random() * typearray.length))]
    const temp = {
      type: tyepi,
      name: 'automation AutoTest task' + index,
      datetime: nowdate(),
      stepcout: Math.ceil(Math.random() * 33),
      process: Math.ceil(Math.random() * 100),
      completedatetime: '02:12.23',
      status: status[Math.floor((Math.random() * status.length))]
    }
    defaultvalue.push(temp)
  }
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }

  return defaultvalue
  /*
  return new Promise(function(resolve, reject) {
    getFunc('/query/taskonlastrun', { count: -1 })
      .then(result => {
        resolve(defaultvalue)
      })
      .catch(error => {
        reject(defaultvalue)
      })
  })
  */
}

/**
 * 获取允许映射项目的工作台
 */
const getAllowMappingProject = () => {
  return new Promise(function(resolve, reject) {
    getFunc('/query/belongproject', { count: -1 })
      .then(reslut => {
        resolve(reslut.resbody)
      })
      .catch(() => {
        reject('')
      })
  })
}

/**
 * 依赖用户ID和项目名称获取全任务
 * @param {*} projectname 项目名称
 * @returns
 */
const getAllTaskByProjectAndUser = projectname => {
  /**
   * UPDATE: 2021-02-04 放置在hometile.vue上任务列表，转变为个人的tasklist
   */
  const defaultvalue = [
    {
      tasktype: 'Develop',
      tagcolor: 'is-cblue-3',
      total: 112,
      completed: 34,
      exec: 55,
      hold: 22,
      block: 12
    },
    {
      tasktype: 'Debug',
      tagcolor: 'is-cyellow-1',
      total: 34,
      completed: 14,
      exec: 5,
      hold: 12,
      block: 4
    },
    {
      tasktype: 'Review',
      tagcolor: 'is-cred-1',
      total: 142,
      completed: 34,
      exec: 25,
      hold: 12,
      block: 10
    },
    {
      tasktype: 'Running',
      tagcolor: 'is-cgreen-1',
      total: 4,
      completed: 2,
      exec: 5,
      hold: 5,
      block: 2
    },
    {
      tasktype: 'Release',
      tagcolor: 'is-cpurple-1',
      total: 82,
      completed: 12,
      exec: 9,
      hold: 12,
      block: 62
    }
  ]
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  const colors = ['is-cpurple-1', 'is-cgreen-1', 'is-cred-1', 'is-cyellow-1', 'is-cblue-3']

  return new Promise(function(resolve, reject) {
    getFunc('/query/getalltask', {
      userid: user.id,
      project: projectname
    })
      .then(result => {
        try {
          // 这里做直接处理
          const jsonobj = JSON.parse(result.resbody) // 解析为JSON对象(ARRAY类型)
          const revalue = []
          jsonobj.forEach(one => {
            let fi = revalue.findIndex(ovalue => ovalue.tasktype === one.tasktype)
            // 自动添加
            if (fi === -1) {
              const r = random(0, 4)
              revalue.push({
                tasktype: one.tasktype,
                tagcolor: colors[r],
                total: 0,
                completed: 0,
                exec: 0,
                hold: 0,
                block: 0
              })
            }
            // 然后改值(复用fi，这点损耗才多点B/S)
            fi = revalue.findIndex(nvalue => nvalue.tasktype === one.tasktype)
            // 根据taskstatus执行
            if (one.taskstatus <= 3) {
              revalue[fi].total = revalue[fi].total + 1
              revalue[fi].exec = revalue[fi].exec + 1
            } else if (one.taskstatus === 4) {
              revalue[fi].total = revalue[fi].total + 1
              revalue[fi].completed = revalue[fi].completed + 1
            } else if (one.taskstatus === 6) {
              revalue[fi].total = revalue[fi].total + 1
              revalue[fi].hold = revalue[fi].hold + 1
            } else if (one.taskstatus === 7) {
              revalue[fi].total = revalue[fi].total + 1
              revalue[fi].block = revalue[fi].block + 1
            }
          })
          // console.log(revalue)
          resolve(revalue)
        } catch (error) {
          // console.log(error)
        }
      })
      .catch(() => {
        reject(defaultvalue)
      })
  })
}

/**
 * 获取执行日志
 */
const getExecLogList = () => {
  const temp = demoGetExecLogList()
  const tempretun = [temp]
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    getFunc('/query/getalltask', {
      userid: user.id,
      project: 'all'
    })
      .then(result => {
        try {
          // 这里做直接处理
          const jsonobj = JSON.parse(result.resbody) // 解析为JSON对象(ARRAY类型)
          const msglist = []
          jsonobj.forEach((element, index) => {
            const msg = {
              id: index,
              execdata: element.updatedatetime,
              exectype: element.tasktype,
              taskstatus: element.taskstatus,
              extrainfo: '任务名:' + element.name
            }
            msglist.push(msg)
          })
          // 组装为list后，进行拆解为6组一个的LIST
          const msgresult = []
          for (let i = 0; i < msglist.length; i += 5) {
            msgresult.push(msglist.slice(i, i + 5))
          }
          resolve(msgresult)
        } catch (error) {
          console.log(error)
        }
      })
      .catch(() => {
        reject(tempretun)
      })
  })
}

/**
 * 依赖个人userid获取已提交的释放任务
 */
const getReleaseTaskByBasic = () => {
  const colors = ['is-cpurple-1', 'is-cgreen-1', 'is-cred-1', 'is-cyellow-1', 'is-cblue-3']
  // 含有后台的时候，可以直接从vuex内获取部分信息
  const user = store.state.common.activeusers
  if (user.id === '') {
    user.id = localStorage.getItem('ro_token')
  }
  return new Promise(function(resolve, reject) {
    getFunc('/release/getreleasebybasic', {
      userid: user.id
    })
      .then(result => {
        if (result.resstatus === true) {
          // 这里做直接处理
          const jsonobj = JSON.parse(result.resbody) // 解析为JSON对象(ARRAY类型)
          const r = random(0, 4)
          const revalue = {
            tasktype: 'RELEASE',
            tagcolor: colors[r],
            total: 0,
            completed: 0,
            exec: 0,
            hold: 0,
            block: 0
          }
          jsonobj.forEach(one => {
            // 根据taskstatus执行
            if (one.taskstatus <= 3) {
              revalue.total = revalue.total + 1
              revalue.exec = revalue.exec + 1
            } else if (one.taskstatus === 4) {
              revalue.total = revalue.total + 1
              revalue.completed = revalue.completed + 1
            } else if (one.taskstatus === 6) {
              revalue.total = revalue.total + 1
              revalue.hold = revalue.hold + 1
            } else if (one.taskstatus === 7) {
              revalue.total = revalue.total + 1
              revalue.block = revalue.block + 1
            }
          })
          resolve(revalue)
        } else {
          reject(null)
        }
      })
      .catch(() => {
        reject(null)
      })
  })
}

// #region 私有方法

function demoGetExecLogList() {
  const tempexeclog = []
  // 组装数据
  const status = [TASKSTATUS_EN.COMPLETED, TASKSTATUS_EN.EXEC, TASKSTATUS_EN.HOLD, TASKSTATUS_EN.BLOCK]
  const types = ['Get', 'Post', 'APIs']
  for (let index = 0; index < 8; index++) {
    const sar = Math.floor(Math.random() * status.length) // 随机状态
    const tar = Math.floor(Math.random() * types.length) // 随机状态
    const element = {
      id: index,
      execdata: nowdate(),
      exectype: types[tar],
      taskstatus: status[sar],
      extrainfo: '执行完毕,返回200OK'
    }
    tempexeclog.push(element)
  }
  return tempexeclog
}

// #endregion

/**
 * 默认导出
 */
export { hero, personalactive, worktabletask, getYestdayTaskInfo, getLastRun }
export { getAllowMappingProject, getAllTaskByProjectAndUser, getExecLogList, getReleaseTaskByBasic }
