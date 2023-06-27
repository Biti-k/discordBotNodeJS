const { MessagePayload, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const users = require('../models/user.js');
const jobs = require('../models/jobsSchema.js');
const emojiRupia = '<:rupia:1114152025589043280>';
const cooldowns = new Map();

module.exports = {
  data: {
    name: 'bal',
    description: 'div bal, shows all your rupees you gained with sweat and hard work',
  },
  async execute(msg) {
    try{
      const usuario = await users.find({userId: `${msg.author.id}`, guildId: `${msg.guild.id}`});
      if(usuario.length == 0){
        msg.reply("You never worked, please select a job with div jobs! You are 12 yo already please.");
      }else{
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({name: msg.author.username, iconURL: msg.author.displayAvatarURL()})
        .addFields({name: 'Rupees', value: `**${usuario[0].money}**${emojiRupia}`})
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Rupees_zelda.svg/1152px-Rupees_zelda.svg.png');
        await msg.channel.send({ embeds: [embed]});
      }

      

    
    }catch(err){
      console.log(err);
    }
    
  }
};