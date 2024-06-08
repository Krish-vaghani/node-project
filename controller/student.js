const { Types, Mongoose } = require("mongoose");
const studentschemaexport = require("../schema/studentschema");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let hashpassword;

let signup = async (req, res) => {
  const y = await studentschemaexport.findOne({ email: req.body.email });
  const z = (await studentschemaexport.find()).length;
  let role;
  
  if (y) {
    return res.json({ status: false, message: "Email already exists" });
  }

   hashpassword = await bcrypt.hash(req.body.password, saltRounds).then((result) => result);

  if (z == 0) {
    role = "admin";
  }
    const x = await studentschemaexport.create({
      email: req.body.email,
      password: hashpassword,
      username:req.body.username,
      role,
    });j
  return res.json({ status: true, data: [x], message: "signup successfully" });
};

let login = async (req, res) => {
  const x = await studentschemaexport.findOne({ email: req.body.email });

  if (!x) {
    return res.json({
      status: false,
      message: "email not found please signup first",
    });
  }
  const passresult = await bcrypt.compare(req.body.password, x.password).then(function(result) {
    return result
});
  if (!passresult) {
    console.log(passresult);

    return res.json({ status: false, message: "email and password not match" });
  }
  const token = jwt.sign({ email: x.email, role: x.role }, "skey");
  
  return res.json({
    status: true,
    data: { x, token },
    message: "login successfully",
  });
};

let emailverify = async (req, res) => {
  const x = await studentschemaexport.findOne({ email: req.body.email });
  if (!x) {
    return res.json({
      status: false,
      message: "invalid email address",
    });
  }
  return res.json({
    status: true,
    data: [x],
    message: "email found now you can change password",
  });
};

let otpverify = async (req, res) => {
  const x = await studentschemaexport.findOne({ email: req.body.email });
  if (!x) {
    return res.json({
      status: false,
      message: "invalid email address",
    });
  }
  let otp = Math.floor(100000 + Math.random() * 900000);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajbhuva569@gmail.com",
      pass: "eosm bmqx wcrp ywti",
    },
  });

  var mailOptions = {
    from: "rajbhuva569@gmail.com",
    to: req.body.email,
    subject: "Sending Email using Node.js",
    text: `${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  await studentschemaexport.updateOne(
    { email: req.body.email },
    { $set: { otp } }
  );

  return res.json({
    status: true,
    data: [x],
    message: "email found now you can change password",
  });
};

let otpmatch = async (req, res) => {
  const x = await studentschemaexport.findOne({ email: req.body.email });

  if (!x) {
    return res.json({
      status: false,
      message: "email not found",
    });
  }
  
  if (req.body.otp != x.otp) {
    return res.json({
      status: false,
      message: "opt not match",
    });
  }
  return res.json({
    status: true,
    data: [x],
    message: "otp verified sucssefully now you can change password",
  });
};

let passwordupdate = async (req, res) => {
  const x = await studentschemaexport.findOne({ email: req.body.email });
  // if (req.body.password !== req.body.confirmpassword) {
  //   return res.json({
  //     status: false,
  //     message: "password and confirmpassword does not match",
  //   });
  // }
  await studentschemaexport.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  );
  return res.json({
    status: true,
    data: [x],
    message: "password successfully",
  });
};

module.exports = {
  signup,
  login,
  emailverify,
  passwordupdate,
  otpverify,
  otpmatch,
};
