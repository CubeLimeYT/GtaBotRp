const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "//";
const client = new Discord.Client();

//-----------------------------------------------------------

client.on('message', message => {


	if(message.content === '//help') {
		message.reply("Le bot est encore en dévellopement");
	}

});

client.login(process.env.TOKEN);