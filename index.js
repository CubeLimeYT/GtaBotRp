const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {Client} = require('unb-api');
const client = new Client(process.env.UNBTOKEN);
const bot = new Discord.Client();


var prefix = "R*";

/////////////////////////////Statuses/////////////////////////////////////

let statuses = [`${prefix}aide`, 'GTA V Rp | Version 1.2']

/////////////////////////////Bot.On Ready//////////////////////////////

bot.on('ready', () => {
    setInterval(function() {
    let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'online'});
	}, 10000)
    bot.user.setActivity("GTA V Rp | Version 1.2 ");
    console.log("Bot lancer !");
});



////////////////////////////////Commandes DM'S/////////////////////////

bot.on('message', message => {
    
    let msg = message.content.toLowerCase();    

    let mention = message.mentions.users.first();

    if(msg.startsWith (prefix + "send")){
        if(mention === null) { return message.channel.send("Veuillez spécifier une personne")}
        mentionMessage = message.content.slice (29);
        mention.sendMessage(mentionMessage);
        message.reply("message envoyé");
    }

})

///////////////////////////////FINISH///////////////////////////

bot.login(process.env.SECRET);
