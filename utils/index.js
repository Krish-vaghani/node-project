const jwt = require('jsonwebtoken');
const authentication = (auth) => (req, res, next) => {
    let gettoken = req.headers.authorization;
    if (!gettoken) {
      return res.json({
        status: false,
        message: "Token missing",
      });
    }
  
  let token = req.headers.split(' ')[1]; // anything missing
  console.log("token",token);
  let decode;
  try {
    decode = jwt.verify(token,'skey')
  } catch (error) {
    console.log(error);
} 
if (!auth.includes(decode.role)) {
    console.log('matching role ' + decode.role);
    return res.json({
      status: false,     
      message: "You are not authorized to access this resource",
    });
}

req.body = {...req.body,email:decode?.email}

  next();
};

module.exports = { authentication };