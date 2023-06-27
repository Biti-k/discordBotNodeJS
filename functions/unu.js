const { MessagePayload } = require('discord.js');

module.exports = {
  data: {
    name: 'unu',
    description: 'Sends a sad unu',
  },
  async execute(msg) {
    const image = 'https://i.postimg.cc/B6QkvyCr/chanchito.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: 'unu',
      files: [image],
    });

    msg.reply(payload);
  }
};