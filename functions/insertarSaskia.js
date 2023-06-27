const { MessagePayload } = require('discord.js');

module.exports = {
  data: {
    name: 'saskia',
    description: 'ok',
  },
  async execute(msg) {
    const image = 'https://i.postimg.cc/RCY2Tv9h/insertar-Saskia.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: 'Insertar hedaquake aquí :|',
      files: [image],
    });

    msg.reply(payload);
  }
};