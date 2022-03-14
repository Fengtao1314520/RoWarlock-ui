/**
 * 获取 closeapp 元素
 * @param closeappElement
 * @constructor
 */
function GetCloseAppType(closeappElement) {
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'

  const tempcloseapp = {
    keep: false
  }
  const keep = closeappElement.getAttributeNS(nsros, 'Keep')
  if (keep != null && keep !== undefined) {
    tempcloseapp.keep = keep
  }
  return tempcloseapp
}

export { GetCloseAppType }
