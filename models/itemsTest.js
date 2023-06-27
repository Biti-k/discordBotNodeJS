const {Schema, model} = require('mongoose');

const itemsSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = model('itemsTest', itemsSchema);