/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-09-12 22:57:29
 * @LastEditors: cly_dev 263118046@qq.com
 * @LastEditTime: 2022-09-13 22:51:30
 * @FilePath: \socket\config\socket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const app = require('./server')
const http = require('http')
const io = require('socket.io')

const server = http.createServer(app)
const socket = io(server)

const onlineUserMap = {}
let onlineUserCount = 1
socket.on('connect', (client) => {
  //登录
  client.on('login', (data) => {
    onlineUserMap[data] = client.id
    onlineUserCount += 1
    for (let key in onlineUserMap) {
      client.to(onlineUserMap[key]).emit(
        'message',
        setMsg('login', {
          count: onlineUserCount,
          list: onlineUserMap,
        })
      )
    }
    client.emit(
      'message',
      setMsg('login', {
        count: onlineUserCount,
        list: onlineUserMap,
      })
    )
  })
  //退出登录
  client.on('loginOut', (data) => {
    delete onlineUserMap[data]
    onlineUserCount -= 1
    client.emit(
      'message',
      setMsg('loginOut', {
        count: onlineUserCount,
        list: onlineUserMap,
      })
    )
  })

  // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  client.on('disconnect', () => {
    console.log('connect disconnect')
  })
  // 与客户端对应的接收指定的消息
  client.on('message', (data) => {
    for (let key in onlineUserMap) {
      client.to(onlineUserMap[key]).emit('message', setMsg('message', data))
    }
  })
})
function setMsg(type, data) {
  return {
    type,
    data,
  }
}

module.exports = server
