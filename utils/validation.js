// const studentvalidation = require('./validation/studentvalidation')

const validate = require("./validation/index");

const validation = (Schema) => async (req, res, next) => {
  if (!validate[Schema]) {
    throw new Error("Invalid validation");
  }
  try {
    const value = await validate[Schema].validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { validation };
