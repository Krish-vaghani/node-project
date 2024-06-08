const express = require('express')
const router = express.Router()

const { getdata, adddata, editdata, deletedata, getonedata } = require('../controller/usercontroller')
const { authentication } = require('../utils')


router.get('/alldata',authentication(["user","admin"]), getdata)
router.get('/:id',authentication(["user","admin"]), getonedata)
router.post('/',authentication(["user","admin"]), adddata)
router.patch('/:id',authentication(["admin"]), editdata)
router.delete('/:id',authentication(["admin"]), deletedata)


module.exports = router