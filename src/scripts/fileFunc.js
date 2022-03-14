import FileSaver from 'file-saver'

/**
 * 处理testsuite，为方便保存
 * @param {Array} testsuite testsuite列表
 */
const AssistTestSuite = testsuite => {
  if (testsuite.constructor === Array) {
    testsuite.forEach(sigsuite => {
      sigsuite.cases.forEach(sigsuite => {
        sigsuite.steps.forEach(sigstep => {
          sigstep.response.body = ''
          sigstep.response.completeres = {}
        })
      })
    })
  } else {
    testsuite.cases[0].steps.forEach(sigstep => {
      sigstep.response.body = ''
      sigstep.response.completeres = {}
    })
  }

  return testsuite
}

/**
 *  导出文件
 * @param {String} filecontent  文件内容
 * @param {String} filename 文件名称
 */
const exportFile = (filecontent, filename) => {
  const file = new File([filecontent], filename + '.json', { type: 'json;charset=utf-8' })
  FileSaver.saveAs(file)
}

/**
 *  导出文件
 * 通用
 * @param {String} filecontent  文件内容
 */
const exportFileCommon = (filecontent, filename) => {
  const file = new File([filecontent], filename, { type: 'json;charset=utf-8' })
  FileSaver.saveAs(file)
}
/**
 *  导出历史记录文件
 * @param {String} filecontent  文件内容
 */
const exportHistoryFile = filecontent => {
  const file = new File([filecontent], 'history.json', { type: 'json;charset=utf-8' })
  FileSaver.saveAs(file)
}

export { exportFile, exportHistoryFile, AssistTestSuite, exportFileCommon }
