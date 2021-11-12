const express = require('express')

const router = express.Router()

const userindex = require('../router_handler/usermy')
const { use } = require('./user')

router.get('/userinfo', userindex.getindex)
module.exports = router