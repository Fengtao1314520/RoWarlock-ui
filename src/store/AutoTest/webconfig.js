/**
 * 测试
 * webui
 */
export default {
  state: {
    /**
     * webui
     * 配置化，参数集合
     */
    webuiconfig: []
  },
  mutations: {
    /**
     * 更新webui的参数
     * update 2021-11-26 检索更新，而非全部替换更新
     * @param state
     * @param payload
     */
    updateWebUiConfig(state, payload) {
      // console.log(payload)
      if (payload != null) {
        const index = state.webuiconfig.findIndex(
          item => item.identify === payload.identify
        )
        // console.log(index)
        if (index === -1) {
          // 整体添加
          state.webuiconfig.push(payload)
        } else {
          // 检索更新
          state.webuiconfig[index].name = payload.name
          state.webuiconfig[index].annotation = payload.annotation
          // 元素检索更新
          payload.element.forEach(one => {
            const i = state.webuiconfig[index].element.findIndex(
              olditem => olditem.identify === one.identify
            )
            // 未找到
            if (i === -1) {
              state.webuielement[index].element.push(one) // 新增
            } else {
              state.webuielement[index].element[i] = one // 替换
            }
          })
        }
      }
    }
  },
  actions: {}
}
