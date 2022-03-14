/**
 *task 对象
 */
export interface taskObject {
  taskid: String
  createdate: String
  modifydate: String
  assigner: String
  createautor: String
  modifyautor: String
  counter: Number
  case: Array<String>
  us: Array<String>
  devicelist: Array<String>
  scriptlist: Array<String>
  configlist: Array<String>
  reviewautor: String
  reviewstatus: String
  taskname: String
  tasktype: String
  taskstatus: String
  isoffline: Boolean
}
