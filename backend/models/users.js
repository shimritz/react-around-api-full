/* eslint-disable linebreak-style */

const { default: mongoose } = require('mongoose');
const validator = require('validator');

// /^http(s)?:\/\/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

// eslint-disable-next-line operator-linebreak
const avatarRegExp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/gi;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Jacques Cousteau',
      required: [true, 'The "name" field must be filled in'],
      minlength: [2, 'The minimum length of the "name" field is 2'],
      maxlength: [30, 'The maximum length of the "name" field is 30'],
    },
    about: {
      type: String,
      default: 'Explorer',
      required: [true, 'The "about" field must be filled in'],
      minlength: [2, 'The minimum length of the "name" field is 2'],
      maxlength: [30, 'The maximum length of the "name" field is 30'],
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      required: true,
      validate: {
        validator: (v) => {
          avatarRegExp.test(v);
        },
        message: 'The avatar must be filled',
      },
    },
    email: {
      required: [true, 'The "email" field must be filled in'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'email is invalid',
      },
    },
    password: {
      type: String,
      required: [true, 'The "password" field must be filled in'],
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('user', userSchema);
