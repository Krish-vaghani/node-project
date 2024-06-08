const Joi = require("joi");

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  confirmpassword: Joi.ref("password"),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const passwordSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  password: Joi.string().required(),
  confirmpassword: Joi.ref("password"),
});

const otpmatch = Joi.object({

  otp: Joi.number().max(999999).required(),
});

module.exports = {
  signupSchema,
  loginSchema,
  emailSchema,
  passwordSchema,
  otpmatch
};
