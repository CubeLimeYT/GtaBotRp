const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {Client} = require('unb-api');
const client = new Client(process.env.UNBTOKEN);
const bot = new Discord.Client();


var prefix = "+";

/////////////////////////////Statuses/////////////////////////////////////

let statuses = [`${prefix}aide`, 'GTA V Rp | Version 1.3']

/////////////////////////////Bot.On Ready//////////////////////////////

bot.on('ready', () => {
    setInterval(function() {
    let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'online'});
	}, 10000)
    bot.user.setActivity("GTA V Rp | Version 1.2 ");
    console.log("Bot lancer !");
});

/////////////////////////////////Commandes Restart Owner Bot/////////////////

bot.on('message',async message => {
    if(message.content.startsWith(prefix + "restart")) {
        if(message.author.id !== "372099632173416449") return message.reply('Vous n\'êtes pas le propriétaire du bot');
        message.channel.send('**Redémarrage**').then(msg => {
            setTimeout(() => {
               msg.edit('**Redémarrage..**');
            },1000);
            setTimeout(() => {
               msg.edit('**Redémarrage...**');
            },2000);
        console.log(`${message.author.tag} [ ${message.author.id} ] has restarted the bot.`);
        console.log(`Restarting..`);
        setTimeout(() => {
            bot.destroy();
            bot.login(process.env.SECRET);
        },3000);
          setTimeout(() => {
               msg.edit('Bot redémarré ✅');
            },2000);
        });
       
    
    //////////////////////////////Commandes Rp//////////////////////////


        if (message.content === prefix + 'rp') {
        message.delete().catch();
            if(message.guild.roles.find(r => r.name === "👌 Certifié 👌")){
                let role = message.guild.roles.find(r => r.name === "👌 Certifié 👌")
                let msg = await message.channel.send(`${role} qui pour Rp ?`);
                msg.react('✅');
                   msg.react('❎');
        }else{
                console.log("I don't find role");
    }
}
}})


////////////////////////////////Commandes DM'S/////////////////////////

bot.on('message', message => {
	
	let msg = message.content;	

	

	if(msg.startsWith (prefix + "send")){
		if(message.author.id !== "372099632173416449") return message.reply('Vous n\'êtes pas le propriétaire du bot');
		if(!message.mentions.users.first) { return message.channel.send("Veuillez spécifier une personne")}
		let mention = message.mentions.users.first();
		mentionMessage = message.content.slice (29);
		if(mentionMessage === 'undefined') { return message.channel.send("Veuillez spécifier un message")}
		mention.sendMessage(mentionMessage);
		message.reply("message envoyé");
	}
	
     //////////////////////////////////Commandes help///////////////////////////////    
    
	
	
if (message.content === prefix + 'aide' ) {
        var helpEmbed = new Discord.RichEmbed()
        .setDescription('Voici les commandes disponible pour le moment ')
        .setColor("RANDOM")
	.addField('=====================')
        .addField(`${prefix}dmap`, `Pour afficher les département de la map`)
        .addField(`${prefix}bmap`, `Pour afficher les arrêts de bus de la map`)
        .addField('=====================')
	.addField(`${prefix}rp`, `Pour afficher une sondage pour savoir qui veut Rp`)
        .addField('=====================')
	.setFooter(`EN cours de mise à jour !`)
        message.channel.send(helpEmbed)
    }

	
	
	
    //////////////////////////////////Commandes Map////////////////////////////
    if (message.content === prefix + 'dmap') {
        message.channel.send ( {files: ["./images/" + 1 + ".jpg"]} ) 
        }

    if (message.content === prefix + 'bmap') {
    message.channel.send ( {files: ["./images/" + 2 + ".png"]} )
        }
    
    ///////////////////////////////Commandes Administration//////////////////////
    
    if (message.content === prefix + 'kick') {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join("");
        member.kick(reason);
    }
     
});

///////////////////////////////FINISH///////////////////////////

bot.login(process.env.SECRET);
