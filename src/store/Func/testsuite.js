import {
  returnEmptyTestSuite,
  returnEmptyTestCase,
  returnEmptyTestStep,
  updateDataToServer
} from '../../scripts/craft_interface'

export default {
  state: {
    /**
     * 基于前台保存的testsuite
     */
    testsuite: []
  },
  mutations: {
    /**
     * 添加一个新的suite or case
     * @param {*} state {name,index}
     */
    addNewTestSuite(state, payload) {
      if (payload != null) {
        if (payload.indexX === -1) {
          // 添加一个suite
          const suite = returnEmptyTestSuite(payload.name)
          state.testsuite.push(suite)
        } else {
          if (payload.indexY === -1) {
            // 添加一个case
            const tcase = returnEmptyTestCase(payload.name)
            state.testsuite[payload.indexX].cases.push(tcase)
          } else {
            // 添加一个step
            const step = returnEmptyTestStep(payload.name)
            state.testsuite[payload.indexX].cases[payload.indexY].steps.push(step)
          }
        }

        console.log('TESTSUITE 添加成功')
      }
    },

    /**
     * 删除一个老的suite or case
     * NOTICE:和增加是不一样的
     * @param {*} state {name,index}
     */
    removeOldTestSuite(state, payload) {
      if (payload != null) {
        if (payload.indexY === -1) {
          // 删除一个suite
          state.testsuite.splice(payload.indexX, 1)
        } else {
          // 删除一个case
          state.testsuite[payload.indexX].cases.splice(payload.indexY, 1)
        }
        console.log('TESTSUITE 删除成功')
      }
    },

    /**
     * 修改一个suite or case的名字
     * NOTICE:和增加是不一样的
     * @param {*} state {name,index}
     */
    changeNameTestSuite(state, payload) {
      if (payload != null) {
        if (payload.indexY === -1) {
          // 改名
          state.testsuite[payload.indexX].name = payload.name
        } else {
          // 改名
          state.testsuite[payload.indexX].cases[payload.indexY].name = payload.name
        }

        console.log('TESTSUITE 修改成功')
      }
    },

    /**
     *  导入testsuite
     *  从数据来的也会通过本方法
     * @param {*}} state 状态
     * @param {*} payload testsuite载入记录
     */
    importTestSuite(state, payload) {
      if (payload != null) {
        const tempjobj = JSON.parse(payload.content)
        // NOTICE: 这边吃进来的就是JSON格式，不用再转义
        // const tempjobj = payload.content
        state.testsuite = tempjobj
        if (payload.save === true) {
          updateDataToServer(state.testsuite)
          console.log('TESTSUITE 读取数据库成功')
        }
        console.log('TESTSUITE 载入成功')
      }
    },

    /**
     * 删除步骤
     * @param {*} state
     * @param {*} payload
     */
    deleteStep(state, payload) {
      state.testsuite.forEach((suiteitem, indexX) => {
        suiteitem.cases.forEach((caseitem, indexY) => {
          caseitem.steps.forEach((stepitem, indexZ) => {
            // console.log('x:' + indexX + '-y:' + indexY + '-z:' + indexZ + '-id:' + stepitem.id)
            if (stepitem.id === payload.id) {
              state.testsuite[indexX].cases[indexY].steps.splice(indexZ, 1)
            }
          })
        })
      })
      console.log('deleteStep 载入成功')
      updateDataToServer(state.testsuite)
    },

    /**
     * 保存步骤
     * @param {*} state
     * @param {*} payload {localstep} 步骤
     */
    saveStep(state, payload) {
      if (payload != null) {
        state.testsuite.forEach(suiteitem => {
          suiteitem.cases.forEach(caseitem => {
            caseitem.steps.forEach(stepitem => {
              if (stepitem.id === payload.id) {
                // 组织数据
                const temptestsuite = {
                  name: suiteitem.name,
                  show: true,
                  cases: [
                    {
                      name: caseitem.name,
                      show: true,
                      steps: [stepitem]
                    }
                  ]
                }
                updateDataToServer(temptestsuite)
              }
            })
          })
        })
      }
    }
  },
  actions: {}
}
