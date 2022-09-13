/*
 * @Author: cly_dev 263118046@qq.com
 * @Date: 2022-09-12 22:57:21
 * @LastEditors: cly_dev 263118046@qq.com
 * @LastEditTime: 2022-09-13 19:57:45
 * @FilePath: \socket\config\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.resolve(__dirname, '../www')))
app.use(express.json())
app.all('/test', (req, res) => {
  res.status(200).send('<h1>hello word</h1>')
})
module.exports = app
