const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('traducir')
  .setDescription('/traducir. A translator')
  .addStringOption(option => option.setName('text').setDescription('Qué texto quieres traducir?').setRequired(true))
  .addStringOption(option => option.setName('lan').setDescription('El idioma al que quieres traducir el texto').addChoices(
    {name: 'Inglés', value: 'en'},
    {name: 'Español', value: 'es'},
    {name: 'Japonés', value: 'ja'},
    {name: 'Catalán', value: 'ca'},
    {name: 'Francés', value: 'fr'},
    {name: 'Italiano', value: 'it'},
    {name: 'Portugués', value: 'pt'},
    {name: 'Russian', value: 'ru'}
  ).setRequired(true)),

  async execute(interaction){
    const {options} = interaction;
    const text = options.getString('text');
    const lan = options.getString('lan');

    await interaction.reply({content: `Traduciendo el texto :nerd:`});
    
    const applied = await translate(text, {to: `${lan}`});
    
    const embed = new EmbedBuilder()
    .setColor("Green")
    .setTitle(`Traducción exitosa :call_me:`)
    .addFields({name: 'Texto original' , value: "`" + text + "`", inline: false})
    .addFields({name: 'Texto traducido' , value: "`" + applied.text + "`", inline: false})
    await interaction.editReply({content: ``, embeds: [embed]});
  }
}