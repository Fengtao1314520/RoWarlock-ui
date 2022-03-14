
import { GetAnnotationType } from './GetAnnotationType'
import { StepEntrance } from '../Step/StepEntrance'
import { createGUID } from '../../internal'

/**
 * 解析 teststype 节点
 * @param testconfigElement
 * @constructor
 */
function GetTestsType(testconfigElement) {
  const temptests = []
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'
  const TestCases = testconfigElement.children
  TestCases.forEach(testcase => {
    // testcase结构
    const temptestcase = {
      identify: createGUID(),
      id: null,
      annotation: null,
      teststeps: []
    }

    // 获取id
    const id = testcase.getAttributeNS(nsros, 'ID')
    if (id != null) {
      temptestcase.id = id
    }
    // 简述
    const Annotation = GetAnnotationType(testcase.getElementsByTagNameNS(nsros, 'Annotation')[0])
    temptestcase.annotation = Annotation

    // teststeps节点
    const TestSteps = testcase.getElementsByTagNameNS(nsros, 'TestSteps')[0]
    // 循环
    TestSteps.children.forEach((item, index) => {
      const step = StepEntrance(item, index)
      temptestcase.teststeps.push(step) // 插入步骤
    })

    temptests.push(temptestcase) // 插入tests
  })
  return temptests
}

export { GetTestsType }
