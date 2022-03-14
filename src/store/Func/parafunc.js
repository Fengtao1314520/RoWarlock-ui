import { createGUID } from '../../scripts/internal'
import { postFunc } from '../../scripts/internal/httpFunc'
import { updateDataToServer,deleteDataToServer } from '../../scripts/craft_parafunc'
export default {
  state: {
    /**
     * parafunc
     */
    parafunc: []
  },
  mutations: {
    /**
     * 添加一个新的参数、方法包
     * @param {*} state {name,index}
     */
    addNewParaFuncPackage(state, payload) {
      if (payload != null) {
        const newpacakge = {
          name: payload.name,
          id: createGUID(),
          para: [],
          func: []
        }
        state.parafunc.push(newpacakge)
        postFunc('/parafunc/addpackage', newpacakge).then(() => {
          console.log('addNewParaFuncPackage 添加成功')
        }).catch(() => {
          // console.log(err)
          console.log('addNewParaFuncPackage 添加失败')
        })
      }
    },

    /**
     * 保存参数、方法
     * @param {*} state
     * @param {*} payload {localstep} 参数、方法
     */
    saveParaFunc(state, payload) {
      if (payload != null) {
        const index = state.parafunc.findIndex(item => item.id === payload.id)
        if (index !== -1) {
          Object.assign(state.parafunc[index], payload)
          updateDataToServer(payload)
          console.log('saveParaFunc 添加成功')
        } else {
          console.log('saveParaFunc 添加异常')
        }
      }
    },

    /**
     * 删除参数、方法
     * @param {*} state
     * @param {*} payload
     */
    deleteParaFunc(state, payload) {
      if (payload != null) {
        const index = state.parafunc.findIndex(item => item.id === payload.id)
        if (index !== -1) {
          state.parafunc.splice(index, 1)
        }
        deleteDataToServer(payload)
        console.log('deleteParaFunc 添加成功')
      }
    },

    /**
     * 导入
     * @param {*} state
     * @param {*} payload
    * */
    importParaFunc(state, payload) {
      if (payload != null) {
        const tempjobj = JSON.parse(payload.content)
        // NOTICE: 这边吃进来的就是JSON格式，不用再转义
        state.parafunc = tempjobj
        if (payload.save === true) {
          updateDataToServer(state.parafunc)
          console.log('PARAFUNC 读取数据库成功')
        }
        console.log('PARAFUNC 载入成功')
      }
    }
  }
}
