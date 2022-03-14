/**
 * 解析原生默认ROC文件
 * @param name  文件名,已去除后缀
 * @param defaultObj  默认对象
 * upddate: 2021-11-23添加了identify字段，标识各个元素
 * update: 2021-12-01 目前支持 Properties
 */
import { createGUID } from '../internal'

/**
 * 解析默认roc文件
 * @param name 文件名
 * @param defaultObj  默认对象
 */
function analysisDefaultRoc(name, defaultObj) {
  console.log(defaultObj)
  // 创建对象
  const singleobj = {
    identify: createGUID(),
    name: name, // 文件名
    annotation: defaultObj.Config.Annotation.Description, // 文件描述
    element: [] // 赋值元素列表
  }
  singleobj.element = analysisProperties(
    defaultObj.Config.Properties.Property
  ) // 赋值
  return singleobj
}

/**
 *  解析 properties
 * @param properties
 */
function analysisProperties(properties) {
  const elementarray = []
  properties.forEach(item => {
    const one = {
      identify: createGUID(),
      id: item.ID,
      value: item.Value,
      explain: item.Description
    }
    elementarray.push(one)
  })
  return elementarray
}

export { analysisDefaultRoc }
