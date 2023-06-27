const { MessagePayload, EmbedBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const items = require('../models/itemsTest.js');
module.exports = {
  data: {
    name: 'help',
    description: 'div help, shows all commands and the description',
  },
  async execute(msg) {
    const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("All comands, most start with div!")
    .setThumbnail('https://cdn-icons-png.flaticon.com/512/3038/3038144.png');
    
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));
    for (const file of commandFiles) {
      console.log(file);
    	const filePath = path.join(commandsPath, file);
    	const command = require(filePath);
    	// Set a new item in the Collection with the key as the command name and the value as the exported module
      embed.addFields({name: command.data.name, value: command.data.description});
    }
    
    const functionsPath = path.join(__dirname, '..', 'functions');
    const functionsFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith('js'));
    for(const file of functionsFiles){
      const filePath = path.join(functionsPath, file);
      const functionC = require(filePath);
      
      embed.addFields({name: functionC.data.name, value: functionC.data.description});
    }

      await msg.channel.send({ embeds: [embed] });
  }
};