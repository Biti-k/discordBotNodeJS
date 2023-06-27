const { MessagePayload } = require('discord.js');

module.exports = {
  data: {
    name: 'nuclear',
    description: 'Sends three wenamechuindesama',
  },
  async execute(msg) {
    const image = 'https://i1.sndcdn.com/avatars-wt9GSjyyLn049cXH-KrucwQ-t500x500.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: 'wenamechuindesama',
      files: [image],
    });
    for (let i = 0; i < 3; i++) {
      msg.reply(payload);
    }
  }
};