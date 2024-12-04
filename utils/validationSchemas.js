const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .messages({
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    }),
  role: Joi.string().valid('user', 'admin').default('user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const dogSchema = Joi.object({
  name: Joi.string().required(),
  breed: Joi.string().required(),
  age: Joi.number().min(0).required(),
  gender: Joi.string().valid('Male', 'Female').required(),
  size: Joi.string().valid('Small', 'Medium', 'Large').required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Available', 'Pending', 'Adopted').default('Available')
});

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation Error',
        details: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  dogSchema,
  validationMiddleware
};