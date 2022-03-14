/**
 * 获取testconfig  节点
 * @param testconfigElement
 * @constructor
 */
function GetTestConfigType(testconfigElement) {
  const testconfigtype =
    {
      imports: [],
      properties: []
    }
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'
  // 判断Properties节点是否存在
  const properties = testconfigElement.getElementsByTagNameNS(nsros, 'Properties')
  if (properties.length >= 1) {
    // 需要判断Properties下是否包含参数
    if (properties[0].children.length >= 1) {
      // 循环插入
      properties[0].children.forEach(child => {
        const tempproperty = {
          id: child.getAttributeNS(nsros, 'ID'),
          value: child.getElementsByTagNameNS(nsros, 'Value')[0].textContent,
          description: child.getElementsByTagNameNS(nsros, 'Description')[0].textContent
        }
        testconfigtype.properties.push(tempproperty)
      })
    }
  }

  // 判断Imports节点是否存在
  const imports = testconfigElement.getElementsByTagNameNS(nsros, 'Imports')
  if (imports.length >= 1) {
    // 需要判断Imports下是否包含参数
    if (imports[0].children.length >= 1) {
      // 循环插入
      imports[0].children.forEach(child => {
        const tempimport = {
          id: child.getAttributeNS(nsros, 'ID'),
          type: child.getAttributeNS(nsros, 'Type'),
          path: child.getElementsByTagNameNS(nsros, 'Path')[0].textContent
        }
        testconfigtype.imports.push(tempimport)
      })
    }
  }

  return testconfigtype
}

export { GetTestConfigType }
