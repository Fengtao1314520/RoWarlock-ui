import { METHOD, HEADERKEY } from '../internal'

/**
 * 一个单独的case step的全部必备条件
 */
export interface HttpStepItem {
  /**
   * 具有唯一识别性质的guid id
   */
  id: string
  /**
   * teststep名称
   */
  name: string
  /**
   * request信息
   */
  request: HRequest
  /**
   *response信息
   */
  response: Object
}

/**
 * request信息
 */
export interface HRequest {
  /**
   * POST GET
   */
  method: METHOD
  /**
   * HOST
   * CONTENTTYEP之类
   * 所有的
   */
  header: Array<Header>
  /**
   * 包含的JSON
   */
  body: Body
  /**
   * url地址分解
   */
  url: Url
}

/**
 * Header信息
 */
export interface Header {
  select: Boolean
  key: String | HEADERKEY
  value: String
  type: String
}

/**
 * Header信息
 */
export interface Body {
  mode: String
  raw: String
  /*
  NOTICE: 这里与postman并不兼容!
  urlencoded: Array<FormBody>
  formdata: Array<FormBody>
  */
  formbody: Array<FormBody>
}

/**
 * url分解信息
 */
export interface Url {
  raw: String
  protocol: String
  host: Array<String>
  port: String
  path: Array<String>
  query: Array<Query>
}

/**
 * restfulAPI用到
 */
export interface Query {
  select: Boolean
  key: String
  value: String
  description: String
}

/**
 *FORM 格式的body
 */
export interface FormBody {
  select: Boolean
  key: String
  value: String
  type: String
}
