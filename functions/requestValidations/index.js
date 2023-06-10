function RequestBodyValidator(validatorSchema, from = "body") {
  return (req, res, next) => {
    // Validate request body against the schema
    validatorSchema
        .validate(req[from], {abortEarly: false})
        .then((validatedBody) => {
        // If validation passes, set the validated request body on the request object
          req.validatedBody = validatedBody;
          next();
        })
        .catch((error) => {
        // If validation fails, return field-level validation errors as the response
          const validationErrors = {};

          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });

          res.status(400).json({errors: validationErrors});
        });
  };
}

exports.RequestBodyValidator = RequestBodyValidator;
