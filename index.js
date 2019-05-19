const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {Client} = require('unb-api');
const client = new Client(process.env.UNBTOKEN);
const bot = new Discord.Client();


var prefix = "$";

/////////////////////////////Statuses/////////////////////////////////////

let statuses = [`${prefix}help`, 'GTA V Rp | Version 1.3']

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
     }  
    
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
});


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
    
	
	
if (message.content === prefix + 'help' ) {
        var helpEmbed = new Discord.RichEmbed()
        .setDescription('Voici les commandes disponible pour le moment ')
        .setColor("RANDOM")
	.addField(`================================`, `===============================`)
	.addField(`${prefix}Adm`, `Vous drop les commandes d'administrateur`)
	.addField('================================', '===============================')
        .addField(`${prefix}dmap`, `Pour afficher les département de la map`)
        .addField(`${prefix}bmap`, `Pour afficher les arrêts de bus de la map`)
        .addField('================================', '===============================')
	.addField(`${prefix}rp`, `Pour afficher une sondage pour savoir qui veut Rp`)
        .addField('================================', '===============================')
	.setFooter(`Actuellement en développement :) `)
        message.channel.send(helpEmbed)
    }

	
	
    ///////////////////////////////Réponses au +aide/////////////////////////////
	
	if (message.content === prefix + 'Adm')  {
		if ( !message.member.hasPermission('ADMINISTRATOR')){
		message.react('❎')
		  .then(console.log)
		  .catch(console.error);
		message.channel.send(`Désolé, vous n'êtes pas administrateur sur ce serveur.`);
	}else{
		let adminEmbed = new Discord.RichEmbed()
					.setDescription(`Panneau d'aides pour administrateurs`)
					.setColor('RANDOM')
					.addField(`=============================`, `============================`)
				        .addField(`${prefix}kick`, `Pour kicker une personnes du serveur`)
					.addField(`${prefix}ban`, `Pour bannir une personne du serveur`)
					.addField(`=============================`, `============================`)
					.addField(`${prefix}userInfo`, `Affichage d'infos de la personnes mentionner`)
					.addField(`=============================`, `============================`)
					.setFooter('Actuellement en développement')
			message.channel.send(adminEmbed);
	  }
	}
    //////////////////////////////////Commandes Map////////////////////////////
    if (message.content === prefix + 'dmap') {
        message.channel.send ( {files: ["./images/" + 1 + ".jpg"]} ) 
        }

    if (message.content === prefix + 'bmap') {
    message.channel.send ( {files: ["./images/" + 2 + ".png"]} )
        }
    
    ///////////////////////////////Commandes Administration//////////////////////
    
if ( !message.member.hasPermission('KICK_MEMBERS')){
		return message.channel.send(`Vous n'avez pas les permission de kick`);
	}
    
	let memberToKick = message.mentions.members.first();
	if(memberToKick && memberToKick.kickable && (message.member.highestRole.calculatedPosition >
            memberToKick.highestRole.calculatedPosition || message.guild.ownerID == message.author.id)){
		let reason = tool.parseOptionArg('raison', message.content);

	    let kickOptions = {
	    	reason: reason ? reason: 'none'
	    };
	    memberToKick.kick(kickOptions);
	    message.channel.send(` L\'utilisateur ${memberToKick} à bien été kick`);
		let owner =  message.guild.owner;
		try{
			await owner.send({embed: {
				title: "Kick",
				color: 0x00FF,
				fields:[{
					name: "Utilisateur kick",
					value: `${memberToKick}`,
					inline: true
				},
				{
					name: "Raison",
					value: `${reason}`,
					inline: true
				},
				{
					name: "La personne qui a utliser la commande",
					value: `${message.author}`,
					inline: true
				}]
			}})
		}catch(e){
				message.reply(`Impossible d'envoyer le rapport a l'owner de la guild`);
			 }

	}else{
        message.channel.send(`L\'utilisateur ${memberToKick} ne peut être kick`)
    }

}
     
});

///////////////////////////////FINISH///////////////////////////

bot.login(process.env.SECRET);
