/**
 * 通用
 */
export default {
  state: {
    /**
     * UPDATE: 不再通过cookie进行用户记录
     * NOTICE: 活动用户列表，不通过cookie进行管理，通过activeusers.id进行更新和状态更新
     */
    activeusers: {
      id: '',
      unickname: '',
      uemail: '',
      uname: '',
      upsd: '',
      ulastlogin: ''
    }

  },
  mutations: {
    /**
     * 更新用户信息
     * @param {*} state
     * @param {*} payload
     */
    updateUserInfo(state, payload) {
      if (payload != null) {
        if (state.activeusers.id === payload.id) {
          // 存在，则更新
          state.activeusers = payload
          console.log('Common 更新用户成功')
        } else {
          // 不存在，则加入到最后
          state.activeusers = payload
          console.log('Common 添加用户成功')
        }
      }
    }
  },
  actions: {}
}
