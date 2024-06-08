const express = require('express')
const { getdata, adddata, editdata, deletedata, onegetdata } = require('../controller/productcontroller')
const multer  = require('multer')
const { authentication } = require('../utils')
const   router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      const imagename = file.fieldname + Date.now()+`.${extension}`;
      req.body = {...req.body, imagename}
      cb(null,imagename)
    }
  })
  
  const upload = multer({ storage: storage })


router.get('/',authentication(['user']), getdata)
router.get('/:id', onegetdata)
router.post('/',upload.single('image'),adddata)
router.put('/edit/:id',upload.single('image'),editdata)
router.delete('/delete/:id',deletedata)
module.exports = router