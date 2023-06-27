const { MessagePayload } = require('discord.js');

module.exports = {
  data: {
    name: 'enfadadu',
    description: '>:3',
  },
  async execute(msg) {
    const image = 'https://i.postimg.cc/vTzZRC3c/enfadadu.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: '>:3',
      files: [image],
    });

    msg.reply(payload);
  }
};