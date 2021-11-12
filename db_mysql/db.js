/**
 * 这是数据库的链接对象，便于其他项目使用mysql模块
 * 可以使得其他项目不需要再去定义mysql模块
 */
const mysql = require('mysql')

//创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_db_01',
})

//向外共享这个数据库链接对象
module.exports = db