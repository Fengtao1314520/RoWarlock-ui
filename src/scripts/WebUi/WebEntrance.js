import path from 'path'
import { createGUID } from '../internal'

/**
 * 读取文件
 * @param file  文件blob
 * @returns {Promise<unknown>}
 */
function readFile(file) {
  const name = file.name.split('.')[0] // 去除后缀获取文件名
  const filepath = file['webkitRelativePath'] // 获取相对路径,等待解析
  const filepathlist = filepath.split(path.sep) // 文件路径的分拆list
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const filecontent = reader.result

      // todo: 还需要进行路径处理，虽然给予了相对路径
      const info = {
        identify: createGUID(),
        name: name,
        filepath: filepath,
        filepathlist: filepathlist,
        // 未被转为string的文件内容
        defaultdoc: filecontent
      }
      resolve(info)
    }
    reader.onerror = error => {
      reject(error)
    }
    reader.readAsText(file) // 作为TEXT读取
  })
}

/**
 *  解析list内的文件路径转为一个maptree，树结构
 * @param {Array} lists 单个文件的对应所有信息
 */
function assistPathToMapTree(lists) {
  // 树结构
  const tree = []
  return new Promise(resolve => {
    // single 为单个文件,对单个文件进行归档至一个文件夹的treeview内
    setTimeout(() => {
      lists.forEach(single => {
        const path = single.filepathlist // 给定路径的list sample->['mtstar','ui','ros']
        let currentLevel = tree
        for (let j = 0; j < path.length; j++) {
          const part = path[j] // sample->'mtstar'
          const existingPath = findWhere(currentLevel, 'name', part)
          if (existingPath) {
            // 如果已存在，则复制为子节点
            currentLevel = existingPath.children
          } else {
            // 如果不存在，创建为一个根节点
            const newPart = {
              ftype: 'folder',
              identify: single.identify,
              name: part,
              icon: 'mdi-folder-settings-outline',
              children: []
            }
            // UPDATE 2022-01-04 包含'.'的则为子节点内的内容
            if (part.includes('.')) {
              newPart.filepath = single.filepath
              newPart.doc = single.defaultdoc // update 2022-02-17，原来是doc,后来改成defaultdoc了，因此修改
              newPart.icon = 'mdi-code-greater-than-or-equal'
              newPart.ftype = 'file'
            }
            currentLevel.push(newPart)
            currentLevel = newPart.children
          }
        }
      })
    }, 1000)
    resolve(tree)
  })
}

/**
 * 检索
 * @param array
 * @param key
 * @param value
 * @returns {boolean|*}
 */
function findWhere(array, key, value) {
  // t is used as a counter
  let t = 0
  // find the index where the id is the as the aValue
  while (t < array.length && array[t][key] !== value) {
    t++
  }
  if (t < array.length) {
    return array[t]
  } else {
    return false
  }
}

export { readFile, assistPathToMapTree }
