const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {Client} = require('unb-api');
const client = new Client(process.env.UNBTOKEN);
const bot = new Discord.Client();


var prefix = "$";

/////////////////////////////Statuses/////////////////////////////////////

let statuses = [`${prefix}help | Version 1.4`, `GTA V Rp | Version 1.4`]

/////////////////////////////Bot.On Ready//////////////////////////////

bot.on('ready', () => {
    setInterval(function() {
    let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'online'});
	}, 10000)
    bot.user.setActivity("GTA V Rp | Version 1.4 ");
    console.log("Le robot est prêt à être utilisé !");
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
	.addField(`Nouveautés de la 1.4`, `Sortie le 20/05/2019 à 00H45`)
	.addField(`================================`, `===============================`)
	.addField(`${prefix}Adm`, `Vous drop les commandes d'administrateur`)
	.addField('================================', '===============================')
        .addField(`${prefix}dmap`, `Pour afficher les département de la map`)
        .addField(`${prefix}bmap`, `Pour afficher les arrêts de bus de la map`)
        .addField('================================', '===============================')
	.addField(`${prefix}rp`, `Pour afficher une sondage pour savoir qui veut Rp`)
	.addField(`${prefix}ping`, `Affiche vos ms`)
	.addField(`${prefix}serveur`, `Vous donnes quelques infos sur le serveur`)
        .addField('================================', '===============================')
	.setFooter(`Actuellement en développement :) `)
        message.channel.send(helpEmbed)
    }

	
	
    ///////////////////////////////Réponses au +aide/////////////////////////////
	
	
	//$Adm
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
	
	//$ping
		if (message.content === prefix + "ping") {
        message.channel.send(`Pong en ${Date.now() - message.createdTimestamp} ms`)
		}
	
	//$serveur
	if (message.content === prefix + 'serveur') {
		let server_name = message.guild.name
		let server_size = message.guild.members.size
		message.channel.send('Serveur : ' + server_name + '\nPersonnes : ' + server_size);
		message.channel.send(`⚠️ **Commandes en cours de développement** ⚠️`);
	}
	
	
	
    //////////////////////////////////Commandes Map////////////////////////////
    if (message.content === prefix + 'dmap') {
        message.channel.send ( {files: ["./images/" + 1 + ".jpg"]} ) 
        }

    if (message.content === prefix + 'bmap') {
    message.channel.send ( {files: ["./images/" + 2 + ".png"]} )
        }
    
});
    ///////////////////////////////Commandes Administration//////////////////////
 bot.on('message', async message => {
    
    let msg = message.content.toLowerCase();    


        let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    if(msg.startsWith (prefix + 'setup')){
        if(!message.member.hasPermission('ADMINISTRATOR')){
                  message.channel.send("Vous n'êtes pas administrateur")   
            }else{
                  if(!message.guild.member(bot.user).hasPermission('ADMINISTRATOR')){
                        message.channel.send("Je n'ai pas la permission de pouvoir créer des salons textuel");
                  }else{
                        message.guild.createChannel("log-gtav-rp").then(channel => {
                              channel.setTopic('Logs')
                        });
                  }
            }
    }
 if(msg.startsWith (prefix + 'kick')){
        if(!message.member.hasPermission("KICK_MEMBERS")){
        message.channel.send(message);
      }else{
          var memberkick = message.mentions.members.first();
          if(!memberkick){
              message.channel.send(`:warning: **Vous ne n'avez pas mentionné la personne à kick**`);
          }else{
              if(!memberkick.kickable){
                  message.channel.send(message)
              }else{
                  let reason = args.slice(1).join(' ');
                if(!reason) reason = "Aucune raison";
                  let serveurinfo = message.guild.name;
                      try {
                          await memberkick.send(`Vous avez été kick du serveur: ${serveurinfo} pour ${reason}`);
                      }catch(e) {
                          console.log(`impossible de prévenir l'Utilisateur ${memberkick} qu'il a été kick du serveur ${serveurinfo} pour ${reason}`)
                          message.channel.send(`impossible de prévenir l'Utilisateur ${memberkick} qu'il a été kick du serveur ${serveurinfo} pour ${reason}`)
                      }
                          let Pkick = message.author;

                          let kickEmbed = new Discord.RichEmbed()
                        .setDescription(`***___Kick Pannel___***`)
                        .setColor(`#e56b00`)
                        .addField(`**Utilisateur kick**`, `${memberkick} l'Id est ${memberkick.id}`)   
                        .addField(`**Kick par **`, Pkick)
                        .addField(`**Kick de**`, message.channel)
                        .addField(`**Kick à**`, message.createdAt)
                        .addField(`**Raison**`, reason)

                        let kickChannel = message.guild.channels.find(`name`, `log-gtav-rp`);
                        if(!kickChannel){
                             message.channel.send(`Je ne trouve aucun channel s'apellant **log-gtav-rp**, faite ${prefix}setup pour afficher les logs de kick et ban`)
                             message.channel.send(kickEmbed);
                        }else{
                            message.guild.channels.find(`name`, `log-gtav-rp`).send(kickEmbed);
                        }
                        
                        memberkick.kick()

          }
      }
  }
    }
})





///////////////////////////////FINISH///////////////////////////

bot.login(process.env.SECRET);
