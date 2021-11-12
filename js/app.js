const express = require('express')

const app = express()

//配置跨域cors中间件
const cors = require('cors')
app.use(cors())

//配置解析post请求体
app.use(express.urlencoded({ extended: false }))

//一定要在路由之前解析配置token的中间件
const expressjwt = require('express-jwt')
    //导入token字符串密钥，进行解析
const config = require('../js/config')
    //配置
app.use(expressjwt({ secret: config.jwtSecretkey }).unless({ path: [/^\/chenchao/] }))

//导入并使用用户路由模块
const userRouter = require('../router/user')
const Joi = require('joi')
app.use('/chenchao', userRouter)
const usermy = require('../router/usermy')
app.use('/my', usermy)


//定义错误级别中间件
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        //验证失败错误，即格式错误
        return res.send({
            status: 1,
            msg: err.message
        })
    }
    //解决token字符串解析错误级别中间件
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 1,
            msg: '身份认证失败'
        })
    }
    //未知错误
    res.send({
        status: 1,
        msg: '' + err
    })
})

app.listen(80, () => {
    console.log('80端口监听中....')
})