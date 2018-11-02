const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "//";
const client = new Discord.Client();

//-----------------------------------------------------------
let statuses = [`//help`, `joué au rp`, `https://www.youtube.com/channel/UCKwjZKxnVGF2WUNPEHc0RVg`]
bot.on('ready', () => {
	setInterval(function() {
		let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'streaming'});
	}, 10000)
});


client.on('message', message => {


	if(message.content === prefix + 'help') {
		message.reply("Le bot est encore en dévellopement, mais vous pouvre utiler la commande '//inv' ");
	}
	
	if(message.content === prefix + 'inv'){
		var embed = new Discord.RichEmbed()
			.setTitle("Lien d'invitation")
			.setDescription("Cliquez sur mon lien et emmenez moi avec vous")
			.addField('https://discordapp.com/oauth2/authorize?client_id=507609010116100097&scope=bot&permissions=2146958847', 'Ce bot fonctionne avec une base de donnée, Certaine commande ne pourront ce faire seulement une fois')
			.setColor("0x000000")
			.setFooter("Support Server :https://discord.gg/8yXY3nd")
		message.channel.sendEmbed(embed);
	}


});

client.login(process.env.TOKEN);
