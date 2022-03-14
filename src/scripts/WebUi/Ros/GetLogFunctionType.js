/**
 * 获取LogFunction 元素
 * @param logfunctionElement
 * @constructor
 */
function GetLogFunctionType(logfunctionElement) {
  // 命名空间
  const nsros = 'http://tempuri.org/RoFramework.xsd'

  const templogfunction = {
    logfilepath: ''
  }

  const logfunction = logfunctionElement.getElementsByTagNameNS(nsros, 'LogFilePath')[0]
  templogfunction.logfilepath = logfunction.textContent

  return templogfunction
}

export { GetLogFunctionType }
