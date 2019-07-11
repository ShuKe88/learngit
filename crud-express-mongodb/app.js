/**
 * app.js是入口模块
 * 职责：
 * 	创建服务
 * 	做一些服务相关的配置
 * 	如： 模板引擎
 * 	   body-parser 解析表单的post请求体
 * 	        提供静态资源的服务
 *  挂载路由
 * 	监听端口启动
 * */
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()

//配置静态资源
app.use('/node_modules/',express.static('./node_modules'))
app.use('/public/',express.static('./public'))

//配置body-parser中间件（插件)，一定要在app.use(router)挂载路由之前
//只要加入这个配置，则在req请求对象上会多出来一个属性：body
//那就可以通过req.body来获取POST请求体的数据了
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router)

//配置express中的模板引擎
app.engine('html',require('express-art-template'))


app.listen(3000, function() {
	console.log('running 3000....')
})
