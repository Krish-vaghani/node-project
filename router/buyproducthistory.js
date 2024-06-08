const express = require('express')
const { authentication } = require('../utils')
const { buyproducthistory } = require('../controller/buyproducthistory')
const router = express.Router()



router.post('/',authentication(['user']),buyproducthistory)


module.exports = router