/* eslint-disable no-unused-vars */
const { mongoose, isObjectIdOrHexString } = require('mongoose');

// eslint-disable-next-line operator-linebreak
const linkRegExp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%.+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%+.~#?&//=]*)/gi;

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'The lengh should be grather then 2 characters'],
    maxlength: [30, 'The lengh should be under then 30 characters'],
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        linkRegExp.test(v);
      },
      message: 'The link must be...',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
