const {Schema, model} = require('mongoose');

const usersSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  exp: {
    type: Number,
    default: 0
  },
  money: {
    type: Number,
    default: 0
  }
});

module.exports = model('user', usersSchema);