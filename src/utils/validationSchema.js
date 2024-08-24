import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).required().label('First Name').messages({
    'string.empty': 'First Name is required',
    'string.min': 'First Name must be at least 2 characters',
  }),
  lastName: Joi.string().min(2).required().label('Last Name').messages({
    'string.empty': 'Last Name is required',
    'string.min': 'Last Name must be at least 2 characters',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email Address')
    .messages({
      'string.empty': 'Email Address is required',
      'string.email': 'Email must be a valid email',
    }),
  password: Joi.string().min(6).required().label('Password').messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
});
