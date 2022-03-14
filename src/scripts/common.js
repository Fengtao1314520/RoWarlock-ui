/**
 * UPDATE: 2021-05-10
 * NOTICE: 所有的纯参数化设定都会变为方法引用，纯参数或emun等都会被放入其他文件内
 */
import dateFormat from 'dateformat'
import { getFunc } from './internal/httpFunc'

/**
 * 当前时间
 * NOTICE: yyyy-mm-dd HH:MM:ss:l(yyyy-mm-dd HH:MM:ss.SSS)
 */
const nowdate = () => {
  const now = new Date()
  return dateFormat(now, 'yyyy-mm-dd HH:MM:ss.l')
}

/**
 * 获取所有的项目
 * COM: settings.vue
 * STATUS: 2021-05-19 完成修改
 */
const allprojects = () => {
  const defaultvalue = [
    {
      to: 'scalemanager',
      name: 'TEST-SCALEMANAGER(项目)'
    },
    {
      to: 'mtstar',
      name: 'TEST-MTSTAR(项目)'
    },
    {
      to: 'archonepc',
      name: 'TEST-ARCHONE-PC(项目)'
    },
    {
      to: 'pcsoft',
      name: 'TEST-PCSOFT(项目)'
    },
    {
      to: 'archone',
      name: 'TEST-ARCHONE(项目)'
    }
  ]
  // 从远程获取,取数据,不需要提供用户信息
  return new Promise(function(resolve, reject) {
    getFunc('/query/allprojects', {
      count: 'all'
    }).then(res => {
      if (res.resstatus === true) {
        const result = JSON.parse(res.resbody) // 转义为json格式数据
        resolve(result)
      } else {
        reject(defaultvalue)
      }
    })
  })
}

/**
 * UPDATE: 2021-02-04
 * 所有的JSON数据都会迁移到本common内,因为很多文件内存放了过多的数据
 * NOTICE:存放的方法
 */
export { allprojects, nowdate }
