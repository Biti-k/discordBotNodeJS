const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bping')
		.setDescription('/bping Replies with Pong!'),
	async execute(interaction) {

    await interaction.deferReply();
    
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
  
    interaction.editReply('Pong!, ' + '`' + ping + '`ms');
	}
}

