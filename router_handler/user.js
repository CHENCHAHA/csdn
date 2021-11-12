/**
 * 这是处理路由模块的处理函数
 * exports向外暴露该路由函数模块处理函数
 */
//导入数据库模块进行操作
const db = require('../db_mysql/db')

//导入bcryptjs包，将密码加密存储到数据库之中
const bcryptjs = require('bcryptjs')

//导入jsonwebtoken，进行用户token字符串的生成
const jsonwebtoken = require('jsonwebtoken')
    //导入token密钥
const config = require('../js/config')

exports.reguser = (req, res) => {
    const userinfo = req.body
        //对数据进行验证
        //数据验证已经通过joi进行验证
        /* if (!userinfo.telephone || !userinfo.password) {
            return res.send({
                status: 1,
                msg: '手机号密码不能为空'
            })
        } */

    //定义sql语句，查询手机号是否重复
    const sqlstr = 'select * from users1 where telephone=?'
    db.query(sqlstr, userinfo.telephone, (err, results) => {
        //执行失败
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }

        //执行成功，判断手机号是否已经被使用
        if (results.length > 0) {
            return res.send({
                status: 1,
                msg: '该手机号已经注册，请直接登录'
            })
        }
        //手机号可以使用，进行注册,密码使用bcryptjs加密存储
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        const sqlstrreg = 'insert into users1 (telephone,password) values(?,?)'
        db.query(sqlstrreg, [userinfo.telephone, userinfo.password], (err, results) => {
            //执行失败
            if (err) {
                return res.send({
                    status: 1,
                    msg: err.message
                })
            }
            //影响行数不为1，则注册失败
            if (results.affectedRows !== 1) {
                res.send({
                    status: 1,
                    msg: '注册失败，请稍后重试'
                })
            }
            res.send({
                status: 0,
                msg: '注册成功！'
            })
        })
    })
}
exports.login = (req, res) => {
    /* res.send('登录') */
    const userlogin = req.body
    const sqllogincheck = 'select * from users1 where telephone=?'
    db.query(sqllogincheck, req.body.telephone, (err, results) => {
        //执行失败
        if (err) {
            return res.send({
                status: 1,
                msg: err.message
            })
        }
        //执行成功，判断手机号是否存在
        if (results.length !== 1) {
            return res.send({
                status: 1,
                msg: '该手机号不存在，请前往注册'
            })
        }

        //手机号存在，进行密码验证
        if (results.length == 1) {
            //调用bcrypt的compareSync方法进行数据库加密密码的匹配
            //结果results是一个数组中夹着一个对象，对象中有密码
            //可以使用results[0].password获取
            const compareResult = bcryptjs.compareSync(req.body.password, results[0].password)
            if (!compareResult) {
                return res.send({
                    status: 1,
                    msg: '密码错误'
                })
            }
            //登录成功，生成token值
            //打印用户字符串:
            const user = {...results[0], password: '' }
            const tokenstr = jsonwebtoken.sign(user, config.jwtSecretkey, { expiresIn: config.expiresIn })
            return res.send({
                status: 0,
                msg: '登录成功',
                token: 'Bearer ' + tokenstr

            })
        }

    })
}