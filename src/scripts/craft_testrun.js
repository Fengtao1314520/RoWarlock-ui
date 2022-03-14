import { getFunc, postFunc } from './internal/httpFunc'

/**
 * 保存testrun
 * @param {Object} testrun
 */
const saveTestRun = testrun => {
  // console.log(testrun)
  postFunc('/testrun/craft/save', testrun).then(result => {
    // console.log(result)
  }).catch(err => {
    // console.log(err)
  })
}

/**
 * 获取数据库保存的test run
 */
const loadTestRun = () => {
  return new Promise(function(resolve, reject) {
    getFunc('/testrun/craft/getall', {
      count: 'all'
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
export { saveTestRun, loadTestRun }
