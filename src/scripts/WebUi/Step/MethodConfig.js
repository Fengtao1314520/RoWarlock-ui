/**
 * update 2021-12-3   单个步骤需要一个method对应实体用以后续调用和解析
 * @param name
 * @returns {null}
 * @constructor
 */
function MethodConfig(name) {
  let method = null
  const methods = [
    {
      XEleName: 'Launch.Browser',
      MethodName: 'Launch',
      Serialize: false
    },
    {
      XEleName: 'Alert.Accept',
      MethodName: 'Accept',
      Serialize: false
    },
    {
      XEleName: 'Alert.SendKeys',
      MethodName: 'SendKeys',
      Serialize: false
    },
    {
      XEleName: 'Alert.Dismiss',
      MethodName: 'Dismiss',
      Serialize: false
    },
    {
      XEleName: 'Browser.Back',
      MethodName: 'Back',
      Serialize: false
    },
    {
      XEleName: 'Browser.Close',
      MethodName: 'Close',
      Serialize: false
    },
    {
      XEleName: 'Browser.CloseTab',
      MethodName: 'CloseTab',
      Serialize: false
    },
    {
      XEleName: 'Browser.ExecuteScript',
      MethodName: 'ExecuteScript',
      Serialize: false
    },
    {
      XEleName: 'Browser.Forward',
      MethodName: 'Forward',
      Serialize: false
    },
    {
      XEleName: 'Browser.GoToUrl',
      MethodName: 'GoToUrl',
      Serialize: false
    },
    {
      XEleName: 'Browser.Refresh',
      MethodName: 'Refresh',
      Serialize: false
    },
    {
      XEleName: 'Browser.Stop',
      MethodName: 'Stop',
      Serialize: false
    },
    {
      XEleName: 'Browser.SwitchFrame',
      MethodName: 'SwitchFrame',
      Serialize: false
    },
    {
      XEleName: 'Browser.SwitchToTab',
      MethodName: 'SwitchToTab',
      Serialize: false
    },
    {
      XEleName: 'Browser.TakeSnapshot',
      MethodName: 'TakeSnapshot',
      Serialize: false
    },
    {
      XEleName: 'Mouse.Move',
      MethodName: 'Move',
      Serialize: false
    },
    {
      XEleName: 'Mouse.Click',
      MethodName: 'Click',
      Serialize: false
    },
    {
      XEleName: 'RoWebElement.Clear',
      MethodName: 'Clear',
      Serialize: false
    },
    {
      XEleName: 'RoWebElement.Click',
      MethodName: 'Click',
      Serialize: false
    },
    {
      XEleName: 'RoWebElement.Focus',
      MethodName: 'Focus',
      Serialize: false
    },
    {
      XEleName: 'RoWebElement.Select',
      MethodName: 'Select',
      Serialize: false
    },
    {
      XEleName: 'RoWebElement.SendKeys',
      MethodName: 'SendKeys',
      Serialize: false
    },
    {
      XEleName: 'Scroll.Down',
      MethodName: 'Down',
      Serialize: false
    },
    {
      XEleName: 'Scroll.Up',
      MethodName: 'Up',
      Serialize: false
    },
    {
      XEleName: 'Sleep',
      MethodName: 'Sleep',
      Serialize: false
    },
    {
      XEleName: 'Update.Select',
      MethodName: 'UpdateSelect',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.PageIsLoaded',
      MethodName: 'PageIsLoaded',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.StringLength',
      MethodName: 'StringLength',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.StringContains',
      MethodName: 'StringContains',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.AreEqual',
      MethodName: 'AreEqual',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.AreNotEqual',
      MethodName: 'AreNotEqual',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.IsTrue',
      MethodName: 'IsTrue',
      Serialize: false
    },
    {
      XEleName: 'WaitUntil.IsFalse',
      MethodName: 'IsFalse',
      Serialize: false
    },
    {
      XEleName: 'Assert.ForeachChild',
      MethodName: 'AssertForeachChild',
      Serialize: false
    },
    {
      XEleName: 'Calendar',
      MethodName: 'Calendar',
      Serialize: false
    },
    {
      XEleName: 'MacroReference',
      MethodName: 'MacroReference',
      Serialize: false
    }
  ]

  const index = methods.findIndex(item => item.XEleName === name)
  if (index !== -1) {
    method = methods[index]
  }

  return method
}

export { MethodConfig }
