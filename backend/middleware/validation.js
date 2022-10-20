/* eslint-disable newline-per-chained-call */
const { Joi, celebrate } = require('celebrate');
const { isObjectIdOrHexString } = require('mongoose');
const validator = require('validator');

// eslint-disable-next-line operator-linebreak
const UrlExp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/i;

// validate the links - recommendation from project instructions
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (isObjectIdOrHexString.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid id');
      }),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'name mustnt be empty',
    }),
    link: Joi.string()
      .required()
      .pattern(RegExp(UrlExp))
      .message('The "link" field must be a valid URL')
      .messages({
        'string.empty': 'The "link" field must be filled in',
      }),
  }),
});

// validate user fields -name,about,avataer,email and password
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'The minimum length of the "about" field is 2',
      'string.max': 'The maximum length of the "about" field is 30',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('The "email" must be a valid email')
      .messages({
        'string.required': 'The "email" field must be filled in',
      }),
    avatar: Joi.string().custom(validateURL),
  }),
});

// login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.required': 'The "email" field must be filled in',
      }),
    password: Joi.string().required().messages({
      'string.empty': 'The "email" field must be filled in',
    }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(RegExp(UrlExp))
      .message('The "avatar" field must be a valid URL')
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
      }),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" fiels must be filled in',
    }),

    about: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "about" field is 2',
      'string.max': 'The maximum length of the "about" field is 30',
      'string.empty': 'The "about" fiels must be filled in',
    }),
  }),
});

module.exports = {
  validateCard,
  validateObjId,
  validateURL,
  validateUser,
  validateAvatar,
  validateProfile,
  validateAuthentication,
};
