const express = require('express')
const { buyproductdata } = require('../controller/buyproductcontroller')
const { authentication } = require('../utils')
const router = express.Router()



router.post('/',authentication(['user']),buyproductdata)


module.exports = router