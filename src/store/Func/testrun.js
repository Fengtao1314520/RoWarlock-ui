/**
 * 通用
 */
import { saveTestRun } from '../../scripts/craft_testrun'

export default {
  state: {
    /**
     * 保存所有的testrun
     */
    testrun: []

  },
  mutations: {

    /**
     * 添加或更新testrun
     * @param {*} state
     * @param {*} payload
     */
    updateTestRun(state, payload) {
      if (payload != null) {
        const index = state.testrun.findIndex(item => item.id === payload.id)
        if (index !== -1) {
          // 更新
          state.testrun.splice(index, 1, payload)
          console.log('更新updateTestRun')
        } else {
          // 添加
          state.testrun.push(payload)
          console.log('添加updateTestRun')
        }
        saveTestRun(payload)
      }
    },
    /**
     * 远程读取testrun
     * @param {*} state
     * @param {*} payload
     */
    loadTestRun(state, payload) {
      if (payload != null) {
        state.testrun = payload
      }
    }
  }
}

