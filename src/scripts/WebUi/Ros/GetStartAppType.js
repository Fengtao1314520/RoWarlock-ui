/**
 * 获取 startapp 节点
 * @param startappElement
 * @constructor
 */
function GetStartAppType(startappElement) {
  const tempappinfo = {
    appName: '',
    executepath: '',
    bits: ''
  }
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'
  // 判断AppInfo节点是否存在
  const appInfos = startappElement.getElementsByTagNameNS(nsros, 'AppInfo')
  if (appInfos.length >= 1) {
    const appInfo = appInfos[0]
    tempappinfo.appName = appInfo.getAttributeNS(nsros, 'AppName')
    tempappinfo.executepath = appInfo.getElementsByTagNameNS(nsros, 'ExecuePath')[0].textContent
    tempappinfo.bits = appInfo.getElementsByTagNameNS(nsros, 'BaseWindowsBits')[0].getAttributeNS(nsros, 'Bits')
  }

  return tempappinfo
}

export { GetStartAppType }
