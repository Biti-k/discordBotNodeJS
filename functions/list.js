const { MessagePayload, EmbedBuilder } = require('discord.js');
const items = require('../models/itemsTest.js');
module.exports = {
  data: {
    name: 'list',
    description: 'div list, list all texts and authors.',
  },
  async execute(msg) {


    try{
      const documentos = await items.find();
      const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`Todos los items añadidos <:sus:1031609087240183838>`);
      for(i = 0; i < documentos.length; i++){
        embed.addFields({name: `Item numero: ${i}, autor: ${documentos[i].userName}`, value: "`" + documentos[i].text + "`", inline: false})
        console.log(documentos[i].text);
      }
      await msg.channel.send({ embeds: [embed] });
    }catch(err){
      console.log(`Se ha producido el error siguiente con la funcion add: ${err}`)
    }
    

  }
};