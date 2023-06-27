const { MessagePayload } = require('discord.js');
const items = require('../models/itemsTest.js');
module.exports = {
  data: {
    name: 'add',
    description: 'div add, adds a text to the database, also saves the author',
  },
  async execute(msg) {
    const words = msg.content.split(' ');
    const itemString = words.slice(2).join(' ');
    console.log(itemString);

    try{
      const newItem = new items({
        userName: msg.author.username,
        text: itemString,
      });

      await newItem.save();
    }catch(err){
      console.log(`Se ha producido el error siguiente con la funcion add: ${err}`)
    }
    
    console.log(msg.content);
    if(msg.content.length < 9){
      msg.reply({content: 'No puedes añadir un nuevo item vacío.'});
    }else{
      msg.reply({content: 'Item añadido!'});
    }
    

  }
};