const {object, string} = require("yup");

exports.loginSchema = object({
  email: string().email().required(),
  password: string().required(),
});
