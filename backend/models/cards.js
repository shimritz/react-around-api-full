const { mongoose } = require('mongoose');
const validator = require('validator');

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
      validator: (v) => validator.isURL(v),
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
