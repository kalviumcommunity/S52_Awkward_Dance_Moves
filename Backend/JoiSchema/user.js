const Joi = require('joi');

const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map((detail) => detail.message) });
  }
  next();
};

const signUpSchema = Joi.object({
  firstName: Joi.string().min(2).max(15).required(),
  lastName: Joi.string().min(2).max(15).required(),
  userName: Joi.string().min(2).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(12).required(),
  location: Joi.string().min(2).required(),
  profile: Joi.string().required(),
  bio: Joi.string().min(5).max(100).required()
});

exports.validateSignup = validator(signUpSchema);
