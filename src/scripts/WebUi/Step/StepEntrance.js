import { MethodConfig } from './MethodConfig'

const nsros = 'http://tempuri.org/RoFramework.xsd'
const nsweb = 'http://tempuri.org/RoWebAutomation.xsd'

/**
 * 分解teststep的单个步骤
 * update: 2021-12-08 identify借用LineInfo 这是一个index值
 * @param teststepElement
 * @param index
 * @constructor
 */
function StepEntrance(teststepElement, index) {
  // 返回值，默认null
  let element = null
  const name = teststepElement.localName

  if (name.startsWith('Launch')) {
    element = LaunchAction(teststepElement, index)
  } else if (name.startsWith('Alert')) {
    element = AlertAction(teststepElement, index)
  } else if (name.startsWith('Browser')) {
    element = BrowserAction(teststepElement, index)
  } else if (name.startsWith('Mouse')) {
    element = MouseAction(teststepElement, index)
  } else if (name.startsWith('RoWebElement')) {
    element = ElementAction(teststepElement, index)
  } else if (name.startsWith('Sleep')) {
    element = SleepAction(teststepElement, index)
  } else if (name.startsWith('Scroll')) {
    element = ScrollAction(teststepElement, index)
  } else if (name.startsWith('WaitUntil')) {
    element = WaitUntilAction(teststepElement, index)
  } else if (name.startsWith('Update')) {
    element = UpdateAction(teststepElement, index)
  } else if (name.startsWith('Calendar')) {
    element = CalendarAction(teststepElement, index)
  } else if (name.startsWith('MacroReference')) {
    element = MacroAction(teststepElement, index)
  }
  // 根据Key排序
  const ordered = Object.keys(element).sort().reduce(
    (obj, key) => {
      obj[key] = element[key]
      return obj
    },
    {}
  )
  // 返回的也是根据Key排序完毕以后的step信息
  return ordered
}

/**
 * 解析基础信息
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function BasicAction(element, index) {
  // 初始默认值
  const basic = {
    // 操作类型 lacalName'
    ActionType: element.localName.toString(),
    // 是否转为警告
    TreatErrorsAsWarnings: false,
    // 超时
    Timeout: 30,
    // 控件Id
    ElementId: null,
    // 步骤元素本身
    Xelement: element,
    // update 2021-12-3 元素序列
    LineInfo: index
  }
  // 初始化重新赋值,有就给，没有就算了
  const teaw = element.getAttributeNS(nsros, 'TreatErrorsAsWarnings')
  if (teaw != null) {
    basic.TreatErrorsAsWarnings = Boolean(teaw)
  }
  const timeout = element.getAttributeNS(nsweb, 'Timeout')
  if (timeout != null) {
    basic.Timeout = Number(timeout)
  }
  const eleid = element.getAttributeNS(nsweb, 'RoWebElementID')
  if (eleid != null) {
    basic.ElementId = eleid
  }

  return basic
}

/**
 * launch 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function LaunchAction(element, index) {
  const launch = BasicAction(element, index) // 默认的
  launch.BrowserType = 'Chrome'
  launch.Run64Bit = false
  launch.Url = 'localhost'
  /**
   * update 2021-12-3 添加一个launch的method节点信息
   * @type {{Serialize: boolean, XEleName: string, MethodName: string}}
   */
  launch.Method = MethodConfig(launch.ActionType)

  // 然后再进行解析赋值
  const browsertype = element.getAttributeNS(nsweb, 'BrowserType')
  if (browsertype != null) {
    launch.BrowserType = browsertype
  }
  const base64bit = element.getAttributeNS(nsweb, 'Run64Bit')
  if (base64bit != null) {
    launch.Run64Bit = Boolean(base64bit)
  }
  const url = element.getAttributeNS(nsweb, 'Url')
  if (base64bit != null) {
    launch.Url = url
  }
  return launch
}

/**
 * alert 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function AlertAction(element, index) {
  const alert = BasicAction(element, index) // 默认的
  alert.SendKeysValue = null
  const values = element.getElementsByTagNameNS(nsweb, 'Value')
  if (values.length >= 1) {
    const value = values[0].textContent
    alert.SendKeysValue = value
  }
  alert.Method = MethodConfig(alert.ActionType)
  return alert
}

/**
 * browser 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function BrowserAction(element, index) {
  const broswer = BasicAction(element, index) // 默认的
  broswer.Method = MethodConfig(broswer.ActionType)
  // 默认值
  broswer.Url = null
  broswer.TabName = null
  broswer.SwitchToNew = false
  broswer.AutoStopLoad = true
  broswer.JavaScript = null
  broswer.ImageFile = null

  const url = element.getAttributeNS(nsweb, 'Url')
  if (url != null) {
    broswer.Url = url
  }
  const tabname = element.getAttributeNS(nsweb, 'TabName')
  if (tabname != null) {
    broswer.TabName = tabname
  }
  const switchtonew = element.getAttributeNS(nsweb, 'SwitchToNew')
  if (switchtonew != null) {
    broswer.SwitchToNew = Boolean(switchtonew)
  }
  const autostopload = element.getAttributeNS(nsweb, 'AutoStopLoad')
  if (autostopload != null) {
    broswer.AutoStopLoad = Boolean(autostopload)
  }

  const jss = element.getElementsByTagNameNS(nsweb, 'JavaScript')
  if (jss.length >= 1) {
    const javascript = jss[0].textContent
    broswer.JavaScript = javascript
  }
  const ifs = element.getElementsByTagNameNS(nsweb, 'ImageFile')
  if (ifs.length >= 1) {
    const imagefile = ifs[0].textContent
    broswer.ImageFile = imagefile
  }

  return broswer
}

/**
 * mouse 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function MouseAction(element, index) {
  const mouse = BasicAction(element, index)
  mouse.Method = MethodConfig(mouse.ActionType)
  // 默认值
  mouse.MouseType = 'ClickLeft'

  const mousetype = element.getAttributeNS(nsweb, 'MouseType')
  if (mousetype != null) {
    mouse.MouseType = mousetype
  }

  return mouse
}

/**
 * element 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function ElementAction(element, index) {
  const ele = BasicAction(element, index)
  ele.Method = MethodConfig(ele.ActionType)
  // 默认值
  ele.SelectType = 'ByText'
  ele.SelectValue = null
  ele.ClearFirst = true
  ele.SendKeys = null
  ele.SetFocus = false
  // 重新设置
  const selectype = element.getAttributeNS(nsweb, 'SelectType')
  if (selectype != null) {
    ele.SelectType = selectype
  }
  const values = element.getElementsByTagNameNS(nsweb, 'Value')
  if (values.length >= 1) {
    const selectvalue = values[0].textContent
    ele.SelectValue = selectvalue
  }
  const clearfirst = element.getAttributeNS(nsweb, 'ClearFirst')
  if (clearfirst != null) {
    ele.ClearFirst = Boolean(clearfirst)
  }
  const sendkeyss = element.getElementsByTagNameNS(nsweb, 'Value')
  if (sendkeyss.length >= 1) {
    const sendkeys = values[0].textContent
    ele.SendKeys = sendkeys
  }
  const setfocuss = element.getElementsByTagNameNS(nsweb, 'SetFocus')
  if (setfocuss.length >= 1) {
    const setfocus = values[0].textContent
    ele.SetFocus = Boolean(setfocus)
  }

  return ele
}

/**
 * sleep 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function SleepAction(element, index) {
  const sleep = BasicAction(element, index)
  sleep.Method = MethodConfig(sleep.ActionType)
  sleep.Message = 'wait 2 seconds'
  sleep.Seconds = 2

  const message = element.getAttributeNS(nsweb, 'Message')
  if (message != null) {
    sleep.Message = message
  }
  const seconds = element.getAttributeNS(nsweb, 'Seconds')
  if (seconds != null) {
    sleep.Seconds = Number(seconds)
  }

  return sleep
}

/**
 * update 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function UpdateAction(element, index) {
  const update = BasicAction(element, index)
  update.Method = MethodConfig(update.ActionType)
  update.FileValue = null
  const filevalues = element.getElementsByTagNameNS(nsweb, 'FileValue')
  if (filevalues.length >= 1) {
    const filevalue = filevalues[0].textContent
    update.FileValue = filevalue
  }

  return update
}

/**
 * scroll 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function ScrollAction(element, index) {
  const scroll = BasicAction(element, index)
  scroll.Method = MethodConfig(scroll.ActionType)

  return scroll
}

/**
 * calendar 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function CalendarAction(element, index) {
  const calendar = BasicAction(element, index)
  calendar.Method = MethodConfig(calendar.ActionType)
  calendar.Date = null
  calendar.Time = null
  calendar.Other = null

  const date = element.getAttributeNS(nsweb, 'Date')
  if (date != null) {
    calendar.Date = date
  }

  const time = element.getAttributeNS(nsweb, 'Time')
  if (time != null) {
    calendar.Time = time
  }

  return calendar
}

/**
 * waituntil 操作
 * @param element
 * @param index
 * @return {{ActionType: string, Timeout: number, TreatErrorsAsWarnings: boolean, LineInfo: number, ElementId: string, Xelement: HTMLElement}}
 * @constructor
 */
function WaitUntilAction(element, index) {
  const waituntil = BasicAction(element, index)
  waituntil.Method = MethodConfig(waituntil.ActionType)

  // 默认值
  waituntil.IgnoreCase = false
  waituntil.AreInfo = []

  // 忽略大小写
  const ignorecase = element.getAttributeNS(nsweb, 'IgnoreCase')
  if (ignorecase != null) {
    waituntil.IgnoreCase = Boolean(ignorecase)
  }

  // 验证长度
  const lengthtypes = element.getElementsByTagNameNS(nsweb, 'LengthType')
  if (lengthtypes.length >= 1) {
    const lengthtype = StringLength(lengthtypes[0])
    waituntil.AreInfo.push(lengthtype)
  }

  // areequal、notequal、contains
  const waitinfos = element.getElementsByTagNameNS(nsweb, 'WaitInfo')
  if (waitinfos.length >= 1) {
    waitinfos.forEach(item => {
      const waitinfo = AreEqualNotEqual(item)
      waituntil.AreInfo.push(waitinfo)
    })
  }

  // istrue、isfalse
  const actualvalues = element.getElementsByTagNameNS(nsweb, 'ActualValue')
  if (actualvalues.length >= 1) {
    actualvalues.forEach(item => {
      const actualvalue = IsTrueFalse(item)
      waituntil.AreInfo.push(actualvalue)
    })
  }

  return waituntil
}

/**
 *
 * @param element
 * @param index
 * @constructor
 */
function MacroAction(element, index) {
  const macro = {
    ActionType: 'MacroReference',
    MacroID: '',
    Explain: '',
    TreatErrorsAsWarnings: false,
    // 超时
    Timeout: 30,
    // 步骤元素本身
    Xelement: element,
    // update 2021-12-3 元素序列
    LineInfo: index
  }

  const macroid = element.getAttributeNS(nsros, 'MacroID')
  if (macroid != null) {
    macro.MacroID = macroid
  }

  const explain = element.getAttributeNS(nsros, 'Explain')
  if (explain != null) {
    macro.Explain = explain
  }

  return macro
}

function StringLength(element) {
  const areinfo = {
    ExpectedValue: 0,
    ActualType: 'Equal',
    ElementId: null,
    Name: null
  }

  // 长度值
  const length = element.getAttributeNS(nsweb, 'Length')
  if (length != null) {
    areinfo.ExpectedValue = Number(length)
  }
  // 长度验证类型
  const type = element.getAttributeNS(nsweb, 'Type')
  if (type != null) {
    areinfo.ExpectedValue = type
  }
  // 新获取elementid
  const elementid = element.getAttributeNS(nsweb, 'RoWebElementID')
  if (elementid != null) {
    areinfo.ElementId = elementid
  }

  return areinfo
}

function AreEqualNotEqual(element) {
  const areinfo = {
    ExpectedValue: null,
    ActualType: 'RoWebElement.Text',
    ElementId: null,
    Name: null
  }
  // 新获取elementid
  const elementid = element.getAttributeNS(nsweb, 'RoWebElementID')
  if (elementid != null) {
    areinfo.ElementId = elementid
  }
  // attribute名称
  const name = element.getAttributeNS(nsweb, 'Name')
  if (name != null) {
    areinfo.Name = name
  }
  // 实际值类型
  const actualtype = element.getAttributeNS(nsweb, 'ActualType')
  if (actualtype != null) {
    areinfo.ActualType = actualtype
  }
  // 预期值
  const expectedvalue = element.getAttributeNS(nsweb, 'ExpectedValue')
  if (expectedvalue != null) {
    areinfo.ExpectedValue = expectedvalue
  }
  return areinfo
}

function IsTrueFalse(element) {
  const areinfo = {
    ExpectedValue: true,
    ActualType: null,
    ElementId: null,
    Name: null
  }
  // 新获取elementid
  const elementid = element.getAttributeNS(nsweb, 'RoWebElementID')
  if (elementid != null) {
    areinfo.ElementId = elementid
  }

  // 实际值类型
  const actualtype = element.getAttributeNS(nsweb, 'ActualType')
  if (actualtype != null) {
    areinfo.ActualType = actualtype
  }
  // 预期值
  const localname = element.localName
  if (localname === 'WaitUntil.IsTrue') {
    areinfo.ExpectedValue = true
  } else {
    areinfo.ExpectedValue = false
  }

  return areinfo
}

export { StepEntrance }
