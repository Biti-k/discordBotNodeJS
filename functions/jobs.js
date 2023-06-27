const { MessagePayload, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const users = require('../models/user.js');
const jobs = require('../models/jobsSchema.js');

module.exports = {
  data: {
    name: 'jobs',
    description: 'div jobs, shows all jobs and lets you choose one',
  },
  async execute(msg) {
    try{
      const client = msg.client;
      const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("All jobs, choose one as you like with the emojis")
      .setThumbnail('https://cdn.icon-icons.com/icons2/1736/PNG/512/4043241-builder-helmet-worker_113249.png');
      const documentos = await jobs.find();
      const buttons = new ActionRowBuilder();
      for(i = 0; i < documentos.length; i++){
        embed.addFields({name: documentos[i].jobName + documentos[i].emoji, value: "Exp required: `" + documentos[i].expRequired + "` Money base: `" + documentos[i].moneyBase + "`"});


        buttons.addComponents(
          new ButtonBuilder()
          .setCustomId(documentos[i].jobName)
          .setLabel(`${documentos[i].jobName}`)
          .setEmoji(documentos[i].emoji)
          .setStyle(ButtonStyle.Secondary)
        );
        
      }
      await msg.channel.send({ embeds: [embed], components: [buttons] });
      client.on(Events.InteractionCreate, async interaction => {
        if (interaction.isButton()) {
          console.log('es un boton');
          // El usuario ha presionado un botón
          const buttonID = interaction.customId;
          console.log(`El usuario ha presionado el botón con ID ${buttonID}`);
          // Realiza una acción en consecuencia
          let botonTrabajo = false;
          for(i = 0; i < documentos.length; i++){
            if(documentos[i].jobName == buttonID){
              botonTrabajo = true;
            }
          }


          if (botonTrabajo) {
            console.log('boton trabajo');
            const usuarios = await users.find({userId: interaction.user.id, guildId: interaction.guild.id});

            if(usuarios.length == 0){
              console.log('No se encontró un usuario')
              const newUser = new users({
                userId: msg.author.id,
                guildId: msg.guild.id,
                job: buttonID,
                exp: 0,
                money: 0
              });
              newUser.save();
              const embed = new EmbedBuilder()
              .setColor("Blue")
              .setTitle('Now you are a ' + buttonID + "! :)");
              await interaction.reply({ embeds: [embed], ephemeral: true});
            }else{
              if(usuarios[0].job == buttonID){
                 const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle('You already are a ' + buttonID + "! :)");
                await interaction.reply({ embeds: [embed], ephemeral: true});
              }else{
                await users.updateOne({userId: usuarios[0].userId, guildId: usuarios[0].guildId}, {job: buttonID});
                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle('You are now a ' + buttonID + "! :)");
                await interaction.reply({ embeds: [embed]});
              }
            }
          }
        }
      
      });
    }catch(err){
      console.log(err);
    }
    
  }
};