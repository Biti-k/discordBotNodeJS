const { MessagePayload, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const users = require('../models/user.js');
const jobs = require('../models/jobsSchema.js');
const emojiRupia = '<:rupia:1114152025589043280>';
const cooldowns = new Map();

module.exports = {
  data: {
    name: 'work',
    description: 'div work, work for the money and exp :) Raise your contry bro',
  },
  async execute(msg) {
    try{
      const client = msg.client;
      const usuario = await users.find({userId: `${msg.author.id}`, guildId: `${msg.guild.id}`});
      if (cooldowns.has(msg.author.id)) {
        const remainingTime = cooldowns.get(msg.author.id) - Date.now();
        if (remainingTime > 0) {
          const remainingSeconds = Math.ceil(remainingTime / 1000);
          return await msg.reply(`You are on your rest time :|. Please wait ${remainingSeconds} seconds before working again.`);
        }
      }else{
        if(usuario.lenght == 0){
            await msg.channel.send({content: "You don't have any job! Choose one with `div jobs`", ephemeral: true});
          }else{
            const job = await jobs.find({jobName: usuario[0].job});
            console.log(job[0].jobName);
            const pagoBase = job[0].moneyBase;
            let pago = 0;
            const probabilidad = Math.floor(Math.random() * 100);
            if(job[0].jobName === "Waiter"){
                console.log("Ha entrado al if waiter");
                if(probabilidad >= 0 && probabilidad <= 5){
                    pago = pagoBase - 30;
                    await msg.reply("You fall and the food flies on the table of Britanny having her birthday :/, you pay is reduced. " + pago + emojiRupia);
                }else if(probabilidad >= 50 && probabilidad <= 55){
                    pago = pagoBase + 200;
                    await msg.reply("You did it very well today and an important person gave you a small tip. " + pago + emojiRupia);
                }else{
                    pago = pagoBase;
                    await msg.reply("You had a normal and tired day serving chicken rice. Take your reward: " + pago  + emojiRupia);
                }
                const cooldownTime = 15000; // 15 segundos ;P
                cooldowns.set(msg.author.id, Date.now() + cooldownTime);
                setTimeout(() => cooldowns.delete(msg.author.id), cooldownTime);
            }else if(job[0].jobName == "Delivery man"){
                if(probabilidad >= 0 && probabilidad <= 5){
                    pago = pagoBase - 90;
                    await msg.reply("Someone steal a package from you when you were in the door of the client. It was an iPhone 14. Sorry dude. " + pago + emojiRupia);
                }else if(probabilidad >= 50 && probabilidad <= 55){
                    pago = pagoBase + 200;
                    await msg.reply("You went into barrios chungos and sell expensive stuff... " + pago + emojiRupia);
                }else{
                    pago = pagoBase;
                    await msg.reply("You had a normal day delivering packages in massachusés. " + pago  + emojiRupia);
                }   
                const cooldownTime = 30000; // 30 segundos ;P
                cooldowns.set(msg.author.id, Date.now() + cooldownTime);
                setTimeout(() => cooldowns.delete(msg.author.id), cooldownTime);
            }
            console.log(pagoBase);
            console.log(pago);
            const dineroAnadido = usuario[0].money + pago;
            console.log(usuario[0].money);
            console.log(dineroAnadido);
            await users.updateOne({userId: usuario[0].userId, guildId: usuario[0].guildId}, {money: `${dineroAnadido}`});

            

          }
      }

      
    }catch(err){
      console.log(err);
    }
    
  }
};