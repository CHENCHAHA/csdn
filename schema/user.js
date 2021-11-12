/**
 * 这是定义用户传过来表单的数据的验证规则
 * 使得非法数据不能传入数据库
 */

//导入joi包，定义验证规则
const joi = require('joi')

//定义手机和密码的验证规则
const telephone = joi.string().pattern(/^1[0-9]{10}$/).required().error(new Error('请检查手机号格式'))
const password = joi.string().pattern(/^[\S]{6,12}$/).required().error(new Error('密码必须为6-12位，且不能出现空格'))

//定义验证规则对象,向外共享暴露
exports.reg_login = {
    body: {
        telephone,
        password,
    }
}