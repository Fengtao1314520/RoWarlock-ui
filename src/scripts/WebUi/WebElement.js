/**
 * 解析原生默认ROI文件
 * @param name  文件名,已去除后缀
 * @param defaultObj  默认对象
 * upddate: 2021-11-23添加了identify字段，标识各个元素
 */
import { createGUID } from '../internal'

/**
 *
 * @param name
 * @param defaultObj
 * @returns {{annotation, identify, name, element: *[]}}
 */
function analysisDefaultRoi(name, defaultObj) {
  // 三个array拼接
  const completearray = []
  // meta节点
  const meta = defaultObj.roi.meta
  // 判断是否存在
  if (Object.prototype.hasOwnProperty.call(meta, 'sigele')) {
    // sigele
    const sigele = meta.sigele
    const sigelearray = analysisSigele(sigele)
    completearray.push(...sigelearray)
  }
  // 判断是否存在
  if (Object.prototype.hasOwnProperty.call(meta, 'cpxele')) {
    // cpxele
    const cpxele = meta.cpxele
    const cpxelearray = analysisCpxele(cpxele)
    completearray.push(...cpxelearray)
  }
  // 判断是否存在
  if (Object.prototype.hasOwnProperty.call(meta, 'superset')) {
    // superset
    const superset = meta.superset
    if (superset.length !== undefined) {
      // console.log(superset)
      superset.forEach(element => {
        const supersetarray = analysisSuperset(element)
        completearray.push(...supersetarray)
      })
    } else {
      const supersetarray = analysisSuperset(superset)
      completearray.push(...supersetarray)
    }
  }

  // 创建对象 返回值
  return {
    identify: createGUID(),
    name: name, // 文件名
    annotation: defaultObj.roi.annotation, // 文件描述
    element: completearray // 赋值元素列表
  }
}

/**
 * 解析sigele列表
 * @param sigele
 */
function analysisSigele(sigele) {
  const elearray = []
  // update 2021-01-21 还要考虑，如果只有一个怎么办~~
  if (sigele.length !== undefined) {
    sigele.forEach(element => {
      const one = oneSigele(element)
      elearray.push(one)
    })
  } else {
    const one = oneSigele(sigele)
    elearray.push(one)
  }
  // 返回值
  return elearray
}

/**
 * 解析cpxele列表
 * @param cpxele
 */
function analysisCpxele(cpxele) {
  const elearray = []
  if (cpxele.length !== undefined) {
    cpxele.forEach(element => {
      const one = oneCpxele(element)
      elearray.push(...one)
    })
  } else {
    const one = oneCpxele(cpxele)
    elearray.push(...one)
  }
  // 返回值
  return elearray
}

/**
 * 解析superset列表
 * @param superset
 */
function analysisSuperset(superset) {
  let sigelearray = []
  let cpxelearray = []
  // 判断是否存在
  if (Object.prototype.hasOwnProperty.call(superset.subset, 'sigele')) {
    const sigele = superset.subset.sigele
    // sigele可能性是object,而非array
    if (sigele.length !== undefined) {
      sigelearray = analysisSigele(sigele)
    } else {
      const one = oneSigele(sigele)
      sigelearray.push(one)
    }
  }

  // 判断是否存在
  if (Object.prototype.hasOwnProperty.call(superset.subset, 'cpxele')) {
    const cpxele = superset.subset.cpxele
    // cpxele可能性是object,而非array
    if (cpxele.length !== undefined) {
      cpxelearray = analysisCpxele(cpxele)
    } else {
      const one = oneCpxele(cpxele)
      cpxelearray.push(...one)
    }
  }
  // 拼接
  const newarray = sigelearray.concat(cpxelearray)
  return newarray
}

/**
 * 处理一个sigele元素
 * @param element
 * @returns {{explain: *, id, locator: *, value: *}}
 */
function oneSigele(element) {
  const sig = {
    identify: createGUID(),
    id: element.id,
    locator: element.valueinfo['locator'],
    value: element.valueinfo['#text'],
    explain: element.explain
  }
  // 判断是否有index
  if (Object.prototype.hasOwnProperty.call(element, 'index')) {
    sig.index = element.index
  } else {
    sig.index = 0
  }
  return sig
}

/**
 * 处理一个cpxele
 * @param element
 * @returns {*[]}
 */
function oneCpxele(element) {
  // console.log(element)
  const elearray = []
  const elementsig = {
    identify: createGUID(),
    locator: element.valueinfo['locator'],
    value: element.valueinfo['#text'],
    explain: element.explain
  }
  // 判断是否有index
  if (Object.prototype.hasOwnProperty.call(element, 'index')) {
    elementsig.index = element.index
  } else {
    elementsig.index = 0
  }
  // 判断是否有id
  if (Object.prototype.hasOwnProperty.call(element, 'id')) {
    elementsig.id = element.id
  } else {
    elementsig.id = ''
  }
  elearray.push(elementsig)

  // 这里也要判断一下
  if (element.complexs.cpxchild.length !== undefined) {
    // 处理complexs.cpxchild 节点
    element.complexs.cpxchild.forEach(one => {
      const sig = oneCpxChild(elementsig.value, one)
      elearray.push(sig)
    })
  } else {
    const one = element.complexs.cpxchild
    const sig = oneCpxChild(elementsig.value, one)
    elearray.push(sig)
  }

  return elearray
}

/**
 * 处理单个cpx的子节点
 * @param parentvalue
 * @param element
 * @returns {{explain: *, id, locator: *, value: string}}
 */
function oneCpxChild(parentvalue, element) {
  const one = {
    identify: createGUID(),
    id: element.id, // 元素id
    locator: 'XPath', // 强制XPATH
    value: parentvalue + '/' + element.childvalue, // 完整的路径
    explain: element.explain
  }
  // 判断是否有index
  if (Object.prototype.hasOwnProperty.call(element, 'index')) {
    one.index = element.index
  } else {
    one.index = 0
  }
  return one
}

export { analysisDefaultRoi }
