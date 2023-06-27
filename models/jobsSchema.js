const { StringSelectMenuBuilder } = require('discord.js');
const {Schema, model} = require('mongoose');

const jobsSchema = new Schema({
  jobName: {
    type: String,
    required: true
  },
  expRequired: {
    type: Number,
    required: true
  },
  moneyBase: {
    type: Number,
    required: true
  },
  emoji: {
    type: String,
    required: true
  }
});

module.exports = model('jobs', jobsSchema);