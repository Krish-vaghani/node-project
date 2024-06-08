const express = require('express');
const {  signup, login, emailverify, passwordupdate, otpverify, otpmatch } = require('../controller/student');
const { validation } = require('../utils/validation');
const router = express.Router();
//validation("loginSchema"),
router.post("/signup", validation("signupSchema"),signup)
router.post("/login",login)
router.post("/emailverify",validation("emailSchema"),emailverify)
router.post("/passwordupdate",validation("passwordSchema"),passwordupdate)
router.post("/otpverify",otpverify)
router.post("/otpmatch",validation("otpmatch"),otpmatch)

module.exports = router;