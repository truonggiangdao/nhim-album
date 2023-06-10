const {object, string} = require("yup");

exports.verifyTokenSchema = object({
  token: string().required(),
});
