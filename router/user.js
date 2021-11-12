/*
 *为了模块化开发，在router文件下的user.js只用来存放
 *链接模块，接口函数。
 *具体的函数体则保存在router_handler下面
 *这里只负责将接口导出供handler使用
 **/
const express = require('express')

//创建路由对象
const router = express.Router()

//导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

//导入验证表单中间件
const expressjoi = require('@escook/express-joi')

//导入规则验证对象
//如果不加{}，得到的是一个对象，我们只需要其中的reg_login
//所以直接用{}，进行结构赋值，获得reg_login
const { reg_login } = require('../schema/user')

//注册,抽离路由模块的函数,后面的为路由函数模块的函数
router.post('/reguser', expressjoi(reg_login), user_handler.reguser)

//登录
router.post('/login', expressjoi(reg_login), user_handler.login)


//将路由模块导出，供外界使用
module.exports = router