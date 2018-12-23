const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

var bot = new Discord.Client();

var prefix = "R*";

const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({ personnage: [], permis: []})
    .write()

let statuses = [`${prefix}help`, 'GTA V Rp']

bot.on('ready', () => {
    setInterval(function() {
    let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'online'});
	}, 10000)
    bot.user.setActivity("GTA V Rp");
    console.log("Bot lancer !");
});

console.log( db.get('personnage').find({name:'Steven-ADev'}).value() );

bot.on('message', message => {

    if(message.content === prefix + "help"){
        message.channel.send({embed: {
            color: 0x00FF00,
            title: `Help`,
            fields: [{
                  name: "Système new papier",
                  value: `${prefix}newpaper <Présentation de votre personnage>`,
                },
                {
                  name: "Système de recherche papier",
                  value: ` ${prefix}paper <Le nom de la personne exemple: pas @didier mais ${prefix}paper didier>`,
                  inline: true
                },
                {
                  name: "Permis",
                  value: `${prefix}permis <mantion user> <voiture, moto, PdL = poid-lourd, Hl = hélicoptère, AvR = Avion à réaction, AvM = Avion à moteur> true`,
                  inline: true
                },
                {
                    name: "Ce que vous devez faire",
                    value: `Pensez à créer un role avec le nom du permis ex: Permis voiture`,
                    inline: true
                }
             ],
              timestamp: new Date()
            }
        })};

    if(!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    var id = message.author.id;

    switch (args[0].toLowerCase()){
        case "newpaper":
        var cv = message.content.substr(10);
       var author = message.author.username.toString();
       var Verify = db.get('personnage');
        if(Verify.find({ name: `${author}`}).value()) {
            message.reply("Tu as déjà une identité")
        }else{
             
            console.log(cv);
            
            message.reply("Ajouter à la base de donnée")
    
            db.get('personnage')
                .push({ name: author, present: cv})
                .write()

            db.get('permis')
                .push({ name: author, PermisVoiture: "None", PermisMoto: "None", PermisHelico: "None", PermisAvionAMoteur: "None", PermisAvionAReaction: "None", PermisPoidLourd: "None"})
                .write()
          }
        break;
          
        case "paper":
        var search = message.mentions.users.first();
	var search1 = search.username;
        var name = db.get('personnage')
        console.log(search);
        if(name.find({ name: `${search1}`}).value()){
            //console.log(name);
            var name2 = db.get('personnage').find({ name: `${search}`}).value()
            var author = name2.name;
            var searchfound = name2.present;
            message.channel.send(`Personnage de ${author}, ${searchfound}`);    
        }else{
            //console.log(name);
            message.channel.send(`${search} n'est pas dans la base de donée`);
        }


        break;

        case "permis":
        var gMember = message.guild.member(message.mentions.users.first());
        //console.log(gMember);
        var TypePermis = message.content.substr(31);
        //console.log(TypePermis)
        if(TypePermis === "voiture true"){
            if(message.guild.roles.find(r => r.name === "Permis voiture")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis voiture");

                    var author1 = message.author.username.toString();
                    var VotuPermis = db.get('permis');
                    var VoituPermis = VotuPermis.find({ name: `${author1}`}).value()
                    if(VoituPermis.PermisVoiture === "None"){
                        gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisVoiture: "True" }).write()
                        message.reply(` ${gMember} a eu avec succès le permis voiture`);
                    }else{
                        message.reply(` ${gMember} as déjà le permis voiture`)
                    }
                    
                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis voiture"`);
            }
        }

        if(TypePermis === "moto true"){
            if(message.guild.roles.find(r => r.name === "Permis moto")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)

                    var author1 = message.author.username.toString();
                    var MotoPermis = db.get('permis');
                    var MotardPermis = MotoPermis.find({ name: `${author1}`}).value()
                    if(MotardPermis.PermisMoto === "None"){
                        let grole = message.guild.roles.find(r => r.name === "Permis moto");
                    gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisMoto: "True" }).write() 
                        message.reply(` ${gMember} a eu avec succès le permis moto`); 
                    }else{
                        message.reply(` ${gMember} as déjà le permis moto`)
                    }
                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis moto"`);
            }
        }

        if(TypePermis === "PdL true"){
            if(message.guild.roles.find(r => r.name === "Permis Poid-Lourd")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)
                    var author1 = message.author.username.toString();
                    var PdLPermis = db.get('permis');
                    var PdlPermis = PdLPermis.find({ name: `${author1}`}).value()
                    if(PdlPermis.PermisPoidLourd === "None"){
                        let grole = message.guild.roles.find(r => r.name === "Permis Poid-Lourd");
                    	gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisPoidLourd: "True" }).write()
                        message.reply(` ${gMember} a eu avec succès le permis Poid-Lourd`); 
                    }else{
                        message.reply(` ${gMember} as déjà le permis Poid-Lourd`)
                    }
                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Poid-Lourd"`);
            }
        }

        if(TypePermis === "Hl true"){
            if(message.guild.roles.find(r => r.name === "Permis Hélicoptère")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)

                    var author1 = message.author.username.toString();
                    var HlPermis = db.get('permis');
                    var HLPermis = HlPermis.find({ name: `${author1}`}).value()
                    if(HLPermis.PermisHelico === "None"){
                        let grole = message.guild.roles.find(r => r.name === "Permis Hélicoptère");
                    	gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisHelico: "True" }).write()
                        message.reply(` ${gMember} a eu avec succès le permis Hélicoptère`);  
                    }else{
                        message.reply(` ${gMember} as déjà le permis Hélicoptère`);
                    }

                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Hélicoptère"`);
            }
        }

        if(TypePermis === "AvR true"){
            if(message.guild.roles.find(r => r.name === "Permis Avion à Réaction")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)

                    var author1 = message.author.username.toString();
                    var AvRPermis = db.get('permis');
                    var AvrPermis = AvRPermis.find({ name: `${author1}`}).value()
                    if(AvrPermis.PermisHelico === "None"){
                        let grole = message.guild.roles.find(r => r.name === "Permis Avion à Réaction");
                   		 gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisAvionAReaction: "True" }).write()
                        message.reply(` ${gMember} a eu avec succès le permis Avion à Réaction`);  
                    }else{
                        message.reply(` ${gMember} as déjà le permis Avion à Réaction`);
                    }

                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Avion à Réaction"`);
            }
        }

        if(TypePermis === "AvM true"){
            if(message.guild.roles.find(r => r.name === "Permis Avion à Moteur")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école")){
                    //console.log(gMember)

                    var author1 = message.author.username.toString();
                    var AvMPermis = db.get('permis');
                    var AvmPermis = AvMPermis.find({ name: `${author1}`}).value()
                    if(AvmPermis.PermisHelico === "None"){
                        let grole = message.guild.roles.find(r => r.name === "Permis Avion à Moteur");
                    	gMember.addRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisAvionAMoteur: "True" }).write()  
                        message.reply(` ${gMember} a eu avec succès le permis Avion à Moteur`);
                    }else{
                        message.reply(` ${gMember} as déjà le permis Avion à moteur`);
                    }

                }else{
                    message.reply("Vous n'avez pas de rôle comportant le nom Auto-école");
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Avion à Moteur"`);
            }
        }

        break;

        case "mypermis":
        var personaje = message.author.username;
        console.log(personaje);
        var Personaje12 = db.get('permis')
        
        if(Personaje12.find({ name: `${personaje}`}).value()){
            let allpermis = db.get('permis').find({ name: `${personaje}`}).value();
            let hola = allpermis.PermisVoiture;
            let hola1 = allpermis.PermisMoto;
            let hola2 = allpermis.PermisAvionAMoteur;
            let hola3 = allpermis.PermisAvionAReaction;
            let hola4 = allpermis.PermisHelico;
            let hola5 = allpermis.PermisPoidLourd;
            console.log(hola)
            message.channel.send({embed: {
                color: 0x00FF00,
                title: `Permis de ${personaje}`,
                fields: [{
                      name: "Permis voiture",
                      value: `Permis voiture ${hola}`,
                      inline: true,
                    },
                    {
                      name: "Permis moto",
                      value: `Permis moto ${hola1}`,
                      inline: true,
                    },
                    {
                      name: "Permis Avion à moteur",
                      value: `Permis avion à moteur ${hola2}`,
                      inline: true,
                    },
                    {
                        name: "Permis avion à réaction",
                        value: `Permis avion à réaction ${hola3}`,
                        inline: true,
                    },
                    {
                        name: "Permis hélicoptère",
                        value: `Permis hélicoptère ${hola4}`,
                        inline: true,
                    },
                    {
                        name: "Permis Poid-Lourd",
                        value: `Permis Poid-Lourd ${hola5}`,
                        inline: true,
                    }
                 ],
                  timestamp: new Date()
                }
            });
        }else{
            message.channel.send("Tu  n'as pas d'identité")
        }
        break;

        case "removepermis":
        var gMember = message.guild.member(message.mentions.users.first());
        //console.log(gMember);
        var TypePermis = message.content.substr(37);
        //console.log(TypePermis)

        if(TypePermis === "voiture"){
            if(message.guild.roles.find(r => r.name === "Permis voiture")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis voiture");

                    var author1 = message.author.username.toString();
                    var VotuPermis = db.get('permis');
                    var VoituPermis = VotuPermis.find({ name: `${author1}`}).value()
                    if(VoituPermis.PermisVoiture === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisVoiture: "None" }).write()
                        message.reply(` permis voiture de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis voiture`)
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis voiture"`);
            }
        }

        if(TypePermis === "moto"){
            if(message.guild.roles.find(r => r.name === "Permis moto")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis moto");

                    var author1 = message.author.username.toString();
                    var MotoPermis = db.get('permis');
                    var MotardPermis = MotoPermis.find({ name: `${author1}`}).value()
                    if(MotardPermis.PermisMoto === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisMoto: "None" }).write()
                        message.reply(` permis moto de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis moto`)
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis moto"`);
            }
        }

        if(TypePermis === "Poid-Lourd"){
            if(message.guild.roles.find(r => r.name === "Permis Poid-Lourd")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis Poid-Lourd");

                    var author1 = message.author.username.toString();
                    var PdLPermis = db.get('permis');
                    var PdlPermis = PdLPermis.find({ name: `${author1}`}).value()
                    if(PdlPermis.PermisPoidLourd === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisPoidLourd: "None" }).write()
                        message.reply(` permis Poid-lourd de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis Poid-Lourd`);
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Poid-Lourd"`);
            }
        }

        if(TypePermis === "AvM"){
            if(message.guild.roles.find(r => r.name === "Permis Avion à Moteur")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis Avion à Moteur");

                    var author1 = message.author.username.toString();
                    var AvMPermis = db.get('permis');
                    var AvmPermis = AvMPermis.find({ name: `${author1}`}).value()
                    if(AvmPermis.PermisAvionAMoteur === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisAvionAMoteur: "None" }).write()
                        message.reply(` permis Avion à Moteur de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis Avion à Moteur`);
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Avion à Moteur"`);
            }
        }

        if(TypePermis === "AvR"){
            if(message.guild.roles.find(r => r.name === "Permis Avion à Réaction")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis Avion à Réaction");

                    var author1 = message.author.username.toString();
                    var AvRPermis = db.get('permis');
                    var AvrPermis = AvRPermis.find({ name: `${author1}`}).value()
                    if(AvrPermis.PermisAvionAReaction === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisAvionAReaction: "None" }).write()
                        message.reply(` permis Avion à Réaction de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis Avion à Réaction`);
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Avion à Réaction"`);
            }
        }

        if(TypePermis === "Hl"){
            if(message.guild.roles.find(r => r.name === "Permis Hélicoptère")){
                let RMember = message.member.guild.roles;
                if(RMember.find(r => r.name === "Auto-école" || "Policier")){
                    //console.log(gMember)
                    var grole = message.guild.roles.find(r => r.name === "Permis Hélicoptère");

                    var author1 = message.author.username.toString();
                    var HlPermis = db.get('permis');
                    var hLPermis = HlPermis.find({ name: `${author1}`}).value()
                    if(hLPermis.PermisHelico === "True"){
                        gMember.removeRole(grole.id);
                        db.get('permis').find({ name: `${author1}`}).assign({ PermisHelico: "None" }).write()
                        message.reply(` permis Hélicoptère de ${gMember} retirer avec succès`);
                    }else{
                        message.reply(` ${gMember} n'a pas le permis Hélicoptère`);
                    }
                    
                }else{
                    message.reply('Vous n\'avez pas de rôle comportant le nom "Auto-école", "Policier"');
                }
                
            }else{
                let Staff = message.guild.owner;
                message.channel.send(`${Staff}, vous n'avez pas de rôle sur le serveur comportant le nom "Permis Hélicoptère"`);
            }
        }
        break;
        case "permisof":
        var gMember = message.guild.member(message.mentions.users.first());
        var GMember = gMember.user.username;
        var personajes = db.get('permis');
        if(personajes.find({ name: `${GMember}`})){
            let allpermis = db.get('permis').find({ name: `${GMember}`}).value();
            let hola = allpermis.PermisVoiture;
            let hola1 = allpermis.PermisMoto;
            let hola2 = allpermis.PermisAvionAMoteur;
            let hola3 = allpermis.PermisAvionAReaction;
            let hola4 = allpermis.PermisHelico;
            let hola5 = allpermis.PermisPoidLourd;
            console.log(hola)
            message.channel.send({embed: {
                color: 0x00FF00,
                title: `Permis de ${GMember}`,
                fields: [{
                      name: "Permis voiture",
                      value: `Permis voiture ${hola}`,
                      inline: true,
                    },
                    {
                      name: "Permis moto",
                      value: `Permis moto ${hola1}`,
                      inline: true,
                    },
                    {
                      name: "Permis Avion à moteur",
                      value: `Permis avion à moteur ${hola2}`,
                      inline: true,
                    },
                    {
                        name: "Permis avion à réaction",
                        value: `Permis avion à réaction ${hola3}`,
                        inline: true,
                    },
                    {
                        name: "Permis hélicoptère",
                        value: `Permis hélicoptère ${hola4}`,
                        inline: true,
                    },
                    {
                        name: "Permis Poid-Lourd",
                        value: `Permis Poid-Lourd ${hola5}`,
                        inline: true,
                    }
                 ],
                  timestamp: new Date()
                }
            });
        }else{
            message.reply(`${GMember} n'a pas était trouvé`)
        }
	
        break;
    }
});

bot.login(process.env.token);
