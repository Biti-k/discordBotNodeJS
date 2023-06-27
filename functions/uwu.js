const { MessagePayload } = require('discord.js');

module.exports = {
  data: {
    name: 'uwu',
    description: 'Cute raccoon',
  },
  async execute(msg) {
    const image = 'https://media.discordapp.net/attachments/755805155043049512/1113494294792253501/uwu.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: 'uwu',
      files: [image],
    });

    msg.reply(payload);

  }
};