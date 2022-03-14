/**
 * 测试
 * webui
 */
export default {
  state: {

    /**
     * webui
     * 元素集
     */
    webuielement: [

    ]

  },
  mutations: {
    /**
         * 更新webui的元素
         * update 2021-11-26 检索更新，而非全部替换更新
         * @param state
         * @param payload
         */
    updateWebUiElement(state, payload) {
      // console.log(payload)
      if (payload != null) {
        const index = state.webuielement.findIndex(item => item.identify === payload.identify)
        // console.log(index)
        if (index === -1) {
          // 整体添加
          state.webuielement.push(payload)
        } else {
          // 检索更新
          state.webuielement[index].name = payload.name
          state.webuielement[index].annotation = payload.annotation
          // 元素检索更新
          payload.element.forEach(one => {
            const i = state.webuielement[index].element.findIndex(olditem => olditem.identify === one.identify)
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
