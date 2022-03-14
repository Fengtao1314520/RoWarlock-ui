import { nowdate } from './common'

/**
 * 获取所有的站内信数据
 */
const getAllMessage = () => {
  const messages = []
  // 创建
  for (let index = 0; index < 20; index++) {
    const single = {
      author: 'admin',
      authorid: '',
      reciver: 'Nate ford',
      reciverid: '',
      sendtime: nowdate(),
      content: 'Hello, world,你好，世界',
      isread: false
    }
    messages.push(single)
  }
  return messages
}

/**
 *  依赖reciver 收件人执行获取信息
 * @param {*} author  发件人
 * @param {*} reciver  收件人
 * @returns
 */
const getMessageByReciver = (author, reciver) => {
  const messages = []
  // 创建
  for (let index = 0; index < 6; index++) {
    let single = {}
    if (index % 2 === 0) {
      single = {
        author: author,
        authorid: '',
        reciver: reciver,
        reciverid: ''
      }
    } else {
      single = {
        author: reciver,
        authorid: '',
        reciver: author,
        reciverid: ''
      }
    }
    single.content = '昨天的任务记得完成'
    single.isread = false
    single.datetime = nowdate()
    messages.push(single)
  }
  return messages
}

/**
 * UPDATE: 2021-02-04
 * 所有的JSON数据都会迁移到本common内,因为很多文件内存放了过多的数据
 * NOTICE:存放的方法
 */
export { getAllMessage, getMessageByReciver }
