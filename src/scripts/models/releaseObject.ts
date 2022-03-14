import { taskObject } from './taskObject'

/**
 *  释放任务对象
 */
export interface releaseObject extends taskObject {
  /**
   * 基本信息
   */
  basic: RelBasic
  trcase: Array<RelTrCase>
  email: RelEmail
  test: RelTest
  doc: RelDoc
}

/**
 * 释放基本信息
 */
interface RelBasic {
  /**
   * 产品
   */
  product: String
  /**
   * 类型
   */
  type: String
  /**
   * 是否版本号
   */
  relversion: String
  /**
   * 是否包含版本号
   */
  uppack: Boolean
  /**
   * 配置信息SVN
   */
  configsvn: String
  /**
   * 预期释放日期
   */
  expectdate: String
  /**
   * 实际释放日期
   */
  acutaldate: String
  /**
   * 产品本年度第几次释放
   */
  relphase: String
}

/**
 * 释放 绑定的case、tr信息
 */
interface RelTrCase {
  id: String
  value: String
}

/**
 * email解析信息
 */
interface RelEmail {
  email: String
  origin: Array<String>
  dest: Array<String>
}
/**
 * 测试注意点项目
 */
interface RelTest {
  version: Boolean
  versionlist: Array<String>
  new: Boolean
  improve: Boolean
  fix: Boolean
  cod: Boolean
  updatepackage: Boolean
  license: Boolean
  regressiontest: Boolean
}
/**
 * 释放一些勾选项和释放项目信息验证
 */
interface RelDoc {
  certificate: String
  swlistpath: String
  whatsnewpath: String
  targetreleasepath: String
  devlopreleasemail: Boolean
  testplan: Boolean
  releaseplan: Boolean
  use360: Boolean
  automatic: Boolean
}
