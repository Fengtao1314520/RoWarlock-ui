export default {
  // UPDATE 2021-10-21 合并历史、临时和任意类型的释放

  state: {
    /**
     * 释放记录
     * ARRAY 队列
     */
    allRelease: []
  },
  mutations: {

    /**
     * 清空
     * @param {*} state
     * @param {*} payload
     */
    clearRelease(state, payload) {
      if (payload != null) {
        state.allRelease = []
      }
    },
    /**
     * 保存
     * @param state
     * @param payload
     */
    saveRelease(state, payload) {
      if (payload != null) {
        // console.log('干活3')
        if (payload.index === -1) {
          state.allRelease.push(payload.body)
        } else {
          state.allRelease.splice(payload.index, 1, payload.body)
        }
      }
    },

    /**
     * 保存所有
     * @param state
     * @param payload
     */
    saveAllRelease(state, payload) {
      if (payload != null) {
        state.allRelease = payload
      }
    },
    /**
     * 删除
     * @param state
     * @param payload
     */
    deleteRelease(state, payload) {
      if (payload != null) {
        state.allRelease.splice(payload.index, 1)
      }
    }
  },

  actions: {}
}
