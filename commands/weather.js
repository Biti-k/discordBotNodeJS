const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const weather = require('weather-js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('clima')
  .setDescription('/clima Command that gives the weather of a place')
  .addStringOption(option => option.setName('localizacion').setDescription('El lugar del que quieres ver el clima').setRequired(true)),
  async execute (interaction){
    const {options} = interaction;
    const location = options.getString('localizacion');
    console.log('UWU');
    await interaction.reply({content:`Checking the weather...`});
    console.log('HOLA');
    
    await weather.find({ search: `${location}`, degreeType: 'C'}, async function(err, result){
      setTimeout(() => {
        if(err){
          console.log(err);
        }else{
          if(result.length == 0){
            return interaction.editReply({content: 'No se han encontrado datos de ese lugar'});
          }else{
            const temp = result[0].current.temperature;
            const locationE = result[0].location.name;
            const wind = result[0].current.winddisplay;
            const type = result[0].current.skytext;
            const icon = result[0].current.imageUrl;
            let windKmh = Number(wind.substring(0, wind.indexOf(' ')));
            console.log(temp);
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Clima actual de " + locationE)
            .addFields({name: 'Temp', value: `${temp} degress! :smiley_cat:`})
            .addFields({name: 'Weather', value: `${type}`})
            .addFields({name: 'Wind', value: `${windKmh} km/h`})
            .setThumbnail(icon)
            interaction.editReply({content: ``, embeds: [embed]});
          }
        }
      }, 2000)
    })
  }
}