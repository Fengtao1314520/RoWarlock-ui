/**
 * UPDATE: 2021-06-08 基于项目的展示信息需要绑定一些工作台信息，这里保存这些信息，减小后端交互
 *  worktable: 工作台信息一般只有在手动选择的时候才有使用，其他情况这个字段应该是用不到的
 */
export default {
  state: {
    /**
     * NOTICE: 展示的第一个项目
     */
    firstproject: {},
    /**
     * NOTICE: 展示的第二个项目
     */
    secondproject: {}
  },
  mutations: {
    /**
     * 初始化展示Project
     * @param {*} state
     * @param {*} payload
     */
    initViewProject(state, payload) {
      if (payload != null) {
        if (payload.projectindex === 0) {
          state.firstproject = payload
        } else if (payload.projectindex === 1) {
          state.secondproject = payload
        }
        console.log('initViewProject提交成功')
      }
    },

    /**
     * 更新、升级展示projects
     * @param {*} state
     * @param {*} payload
     */
    updateViewProject(state, payload) {
      if (payload != null) {
        if (payload.projectindex === 0) {
          state.firstproject = payload
        } else if (payload.projectindex === 1) {
          state.secondproject = payload
        }
        console.log('updateViewProject提交成功')
      }
    }
  },
  actions: {}
}
