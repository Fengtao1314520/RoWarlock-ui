export default {
  state: {
    /**
     * COM: layout.vue
     * UPDATE: 2021-02-22
     * NOTICE: 设置两个默认的超链项目，在topnav中展示，只需要给定项目名称和展示名称
     */
    defaulttwoprojs: [
      {
        to: 'first',
        name: 'FIRST(项目)'
      },
      {
        to: 'second',
        name: 'SECOND(项目)'
      }
    ]
  },
  mutations: {
    /**
     * 更新默认展示项目
     * @param {*} state 状态
     * @param {*} history 默认展示项目更改记录对象
     */
    uploadDefaultTwoProjs(state, payload) {
      if (payload != null) {
        // console.log(payload)
        state.defaulttwoprojs = payload
        console.log('更新默认展示项目提交成功')
      }
    }
  },
  actions: {}
}
