/**
 * 解析原生默认ROC文件
 * @param name  文件名,已去除后缀
 * @param defaultObj  默认对象
 * upddate: 2021-11-23添加了identify字段，标识各个元素
 * update: 2021-12-01 目前支持 Properties
 */
import { createGUID } from '../internal'
import { GetAnnotationType } from './Ros/GetAnnotationType'
import { GetTestConfigType } from './Ros/GetTestConfigType'
import { GetStartAppType } from './Ros/GetStartAppType'
import { GetTestsType } from './Ros/GetTestsType'
import { GetCloseAppType } from './Ros/GetCloseAppType'
import { GetLogFunctionType } from './Ros/GetLogFunctionType'

/**
 * 解析默认roc文件
 * @param name 文件名
 * @param dom
 */
function analysisDefaultRos(name, dom) {
  const doc = dom.documentElement

  const annotation = new GetAnnotationType(doc.children[0])
  const testconfig = new GetTestConfigType(doc.children[1])
  const startapp = new GetStartAppType(doc.children[2])
  const tests = new GetTestsType(doc.children[3])
  const closeapp = new GetCloseAppType(doc.children[4])
  const logfunction = new GetLogFunctionType(doc.children[5])

  const ros = {
    annotation: annotation,
    testconfig: testconfig,
    startapp: startapp,
    tests: tests,
    closeapp: closeapp,
    logfunction: logfunction
  }
  return {
    identify: createGUID(),
    name: name,
    annotation: ros.annotation, // 文件描述
    element: ros
  }
}

export { analysisDefaultRos }
