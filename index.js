const { Client, Events, GatewayIntentBits, Collection, MessagePayload } = require('discord.js');
require('dotenv').config();
const token = process.env['TOKEN'];
const fs = require('node:fs');
const path = require('node:path');
const nuclearCommand = require('./functions/nuclear.js');
const mongoose = require('mongoose');


// Create a new client instance
const client = new Client({ 
  intents: 
    [GatewayIntentBits.Guilds,
     GatewayIntentBits.GuildMessages,
     GatewayIntentBits.MessageContent] 
});

//Conectar a base de datos MONGODB
(async() => {
  try{
    await mongoose.connect(process.env['CONNECTMONGO'], {keepAlive: true});
  }catch(error){
    console.log(`Error: ${error}`);
  }
})();


//crea la colección de comandos, agrega el comando nuclear
client.commands = new Collection();
/* client.commands.set(nuclearCommand.data.name, nuclearCommand); */
const functionsPath = path.join(__dirname, 'functions');
const functionsFiles = fs.readdirSync(functionsPath).filter(file => file.endsWith('js'));
for(const file of functionsFiles){
  const filePath = path.join(functionsPath, file);
  const functionC = require(filePath);
  
  client.commands.set(functionC.data.name, functionC);
}


//Agrega todos los archivos de comandos (importa).
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));
for (const file of commandFiles) {
  console.log(file);
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  client.user.setActivity('div help');
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

//Listener comandos de slash
client.on(Events.InteractionCreate, async interaction => {
/*     if (interaction.isButton()) {
    console.log('es un boton');
    // El usuario ha presionado un botón
    const buttonID = interaction.customId;
    console.log(`El usuario ha presionado el botón con ID ${buttonID}`);

    // Realiza una acción en consecuencia
    if (buttonID === 'Waiter') {
      // Realiza una acción específica
      console.log('waiter waiter1!');
    }
  } */
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
  
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//------------------------------------------------
//Eventos message create
client.on(Events.MessageCreate, async msg => {
  if (msg.author.bot){
    return;
  } 
  console.log('Ha habido un mensaje');
  
  if (msg.content === "ping") {
    const image = 'https://img.freepik.com/fotos-premium/juego-ping-pong-sobre-fondo-azul_172429-2059.jpg?w=2000';
    const payload = new MessagePayload(msg.channel, {
      content: 'pong',
      files: [image],
    });
    msg.reply(payload);
  }
  
  if(msg.content.toLowerCase().includes("crimen")){
    const image = 'https://www.paturros.es/wp-content/uploads/2021/12/comprar-patito-goma-policia-1.jpg';
    const payload = new MessagePayload(msg.channel, {
      content: '¿Alguien ha dicho crimen?, NO TE PREOCUPES, SOY LA LEY',
      files: [image],
    });
    msg.reply(payload);
  }

  if (msg.content.toUpperCase() === "NUCLEAR") {
    const command = client.commands.get('nuclear');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

    if (msg.content.toUpperCase() === "UWU") {
    const command = client.commands.get('uwu');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if (msg.content.toUpperCase() === "UNU") {
    console.log("Alguien ha escrito un unu");
    const command = client.commands.get('unu');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }
  
  if (msg.content === ">:3") {
    console.log("Alguien ha escrito un >:3");
    const command = client.commands.get('enfadadu');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if (msg.content === "ok") {
    console.log("Alguien está borde");
    const command = client.commands.get('saskia');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }
  
  if(msg.content.toLowerCase() === "hola"){
    msg.reply(`Hola divagador.:saluting_face:`);
  }

  //div bot things :)
  if (msg.content.toLowerCase().includes("div add")) {
    console.log("Han añadido un texto a la base de datos");
    const command = client.commands.get('add');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if (msg.content.toLowerCase() === "div list") {
  console.log("Han listado los items");
  const command = client.commands.get('list');
  try {
    await command.execute(msg);
  } catch (error) {
    console.error(error);
    msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
  }
}

  if(msg.content.toLowerCase() === "div help"){
    const command = client.commands.get('help');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if(msg.content.toLowerCase() === "div jobs"){
    const command = client.commands.get('jobs');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if(msg.content.toLowerCase() === "div work"){
    const command = client.commands.get('work');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }

  if(msg.content.toLowerCase() === "div bal"){
    const command = client.commands.get('bal');
    try {
      await command.execute(msg);
    } catch (error) {
      console.error(error);
      msg.reply({ content: 'Ha habido un error al ejecutar este comando.', ephemeral: true });
    }
  }
})


// Log in to Discord with your client's token
client.login(token);
