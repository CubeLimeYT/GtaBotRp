const Discord = require('discord.js')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {Client} = require('unb-api');
const client = new Client(process.env.UNBTOKEN);
const bot = new Discord.Client();

var prefix = "R*";

const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({ personnage: [], permis: []})
    .write()

let statuses = [`${prefix}aide`, 'GTA V Rp']

bot.on('ready', () => {
    setInterval(function() {
    let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'online'});
	}, 10000)
    bot.user.setActivity("GTA V Rp");
    console.log("Bot lancer !");
});

bot.on('message',async message => {
    if(message.content.startsWith(prefix + "restart")) {
        if(message.author.id !== "307231625459007488") return message.reply('Vous n\'êtes pas le propriétaire du bot');
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
});

console.log( db.get('personnage').find({name:'Steven-ADev'}).value() );

bot.on('message', message => {
	if(message.content === prefix + "Balance"){
		if(!message.mentions.users.first()) return message.reply("utilisateur non spécifier");
		
		else{
		let guildId = message.guild.id;
		let userId = message.mentions.users.first.id;
		client.getUserBalance(guildId, userId).then(user => console.log(user))
		}
		
	   }
	if(message.content === prefix + "addMoneyOwner"){
		message.channel.send(`*money-add bank ${message.guild.owner} 1000`)
	}
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
	
	if(message.content === prefix + 'aide' ) {
		var helpEmbed = new Discord.RichEmbed()
		.setDescription('Voici les commandes disponible pour le moment ')
		.setColor("RANDOM")
		.addField(`${prefix}dmap`, `Pour afficher les département de la map`)
		.addField(`${prefix}bmap`, `Pour afficher les arrêts de bus de la map`)
		.setFooter(`EN cours de mise à jour !`)
		message.channel.send(helpEmbed)
	}
	
	if(message.content === prefix + 'dmap' ) {
		var dmapEmbed = new Discord.RichEmbed()
		.setDescription('Voici les département de GTA V')
		.setColor('RANDOM')
		.addField('Voilà','data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUQEBIWFRUXFhUVFxcVGBcVFxUXFhUXFxcYFRYaHigiGB0lHhUXITEhJSkrLy4uFyAzODMtNygtLisBCgoKDg0OGxAQGy0lIB8tLS0tLS0tLS0tNS0tLS0tLS0vLS0tLS0tLS0tLy0tLS0tLS0tLS0tLS0tLSstLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAwQCAQUG/8QAPRAAAgIBAwIDBAcHAgYDAAAAAQIAESEDEjEEQSJRYRMycYEFFEKRobHwI1JigpLB0bLhFTNDctLxU5Oi/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgMFBv/EACoRAAIDAAICAgAFBAMAAAAAAAABAgMRBDESIRNBMmFxkfAiUcHhFFKx/9oADAMBAAIRAxEAPwD1Ou6xdFPaahIUEDALG2IAwM8kTiddpkAhsEAjDA5FjFfhMfSruNO9Pde5NxQBnCbhvKqQbIHoe9AmhPL6fW6n9nqMNUgaWuzadId7o6DSBPs1ILqWNUvHAozsuWM8pGCcd/yexqdWq5N0ayATzxgZ7eUyvXoa97PFqRfYfj5zz9DW6lenJ1FY62k4J8K3rICrMECmrKkqKPvLE/Sup1i6SHSttT2Os2oFUN+0ITYExypZiB9oIQeZDn9llUm81fueo/0npjFkmgaCseRYvGMecz/xTT2hvFkke6TRHPGMcYnna/0n1C72bSCKjvkggbQurTMThh4dNrUjL7eRmX/iPVtpu2ggKlNRU2IcMv1ra635nS0bU3nUHzh2fzCyo/mnvD6S06u2rHKOOSRxXoZw/Sen5t/S3+MSB/pPqhdaG6lcr4NQe0I9rXJ/Z+5p+Fst7THE2er6tGcFA63hhpudgH1cEhQbcftNVgoyfZkX5HyfzAVC/j/0ex07B1DC6Ocij8xHDTnhr9J9Vm+nrCGtrtQb2W57B8db9T9kPF+y58Qh1mr1ns9A6YbeU1BqeAYZiiaZYEeHaX315IZV2GkeP+h7ns532c+f0fpbqlRBq6ZB2aKlm0nJ9oypv8KHxm2bC17pFT6Lo3ZtNG1E2OUUst3sYgFlvvRsfKCs0l0Yc9nAaUoVP/c6Ek+QKlE/spg6Us2+k5th5EOlEJ05kgy86cwdKWUzJ0EUJX7KcOnJ8yvwslhKCkwVk+RV1tCoTZEwZOlGsCEISSAhCEACEIQAICEBADdTlRgEKlNNfEXUAJuoVJ0PEFjFEyojkEq2aQRtFjQsEWM2zJsajEWVmQsaRNKkjTRRMAhRZvsB35IGR3m2PKVRU0cEEnGTfMb0+ludQOAQzGr4NqBnksPXAM9Druj3ixhxlDeO3hbzU0L8u2Zz7uXGu1L9xyvjOVbZ5GyBWOY7b3qy7efCSBgH3hYrIivrWmcbs/A/4jkbYy9pmDqa7OFYbZlkQk+/fp7Uc+g44jVJ4Csaxmh/qIJkO6C7a/cj4m+hZSZOnKVyAfPsf7zjJLqe+0UdZGyRLrLdRZPqLNIswnAkYRbR7CJebITmjMIQljIIQhAAhCEACdWcnU5gyV2UKJ3bNIJupi2NqPoTtnNsftnNkNDwFqI/TWZVI9CByQPiZWTNK4DNNZg6oBOG/pY/29I4aij7Q+8TW9f3h94mTY3GIrUbbmicFjVYC1ZyR5iU9P05dqtgF5oDLGiBZB7XxEqKPtAA21j/ADKdPaRfz/CelrdLoopoIu2jwt4II8ruqiHLvlH+lff3/wCjdFKft/RnU0tPSQWSgUBbDFCcDyIDH4/PyMPTdW7KGLMBQIAZ8WLyd1sc8mI6zVd6YsCNyYA/jXg3HJzicxsZlLejenqhRQ00oceEfie822on/wAOl/T/ALzJAHMy4r9fnIK6wbTQkuL0yQAdgUqaJo0eDnzi2VlIBIYMTtYYOATla9K5mxXlE9fqbVTw7wHvbTH7LC/CCR/vJAyNN62h8XZwQa3XV7vlGqWXBAI7WTY9O9xGjv27Tt4UqaY2vBu6yCCD6xqBryRXoK/v8ZpCyVb2LKuKfYxBuF0RyCDXY0eIrUSN6UeNvLaD87OZvVXtOxxrnZDWJ214eZqJJNWejriQawj0Gcu+OCoQhNRQIQhAAhCEACdXmcnV5gyV2V6ccsTpx6zBj8DW2G2bURirKabKItUjdNfEfgv5tNIMwVG3nIwEORd+J/X0mcpG0IDkW/xgqMMu6V/2lbx2JYzOk7HU9mXWxeKzX7OsXx4z90r6gjS2szAlbYCq+yRZN4FGJ3cjw/UbhXv6Ez6g+1hdwF+I7uGbbtU3ixVzP0j1SuB4SRfdGs//AJwPSS6v0npN77bjjDUfuE1raSH7C/cJzrJynLZGy9LEI1HFBVUjxKa2sB74PlLAtZiOjWlOOC1f1GUiZMgW6s10yj0Kkm/iGENNSBk2QOwoHPYEmaXH65m6uBJj45h6zJ6YPqAEA+FjkA/aTi+8u0ei0wMaaH5A/nJSA8/RVvdIGAxFE8F17V/EIwfH8JU3SqHTYAm7dpkqFFggt5c2g/XEmt0zKaLj08Gfmdwz8oYB3pLLb1HgIIJI5IJ938e1TeuJ5/V/Rxcg+0oe6QA15JzlyAcntPS1dPFWfjwfwnV4ko+OIXtTItVZDrpPQGhXdjXmSZPrpOjCRzroajzYTWoKMzGTmNYwhCECAhCEACdXmcnVgSuyzTj1ERpSlIvI6FfQxRGoJhRHKPKZMZijqr5R/TaV6hH8Kfm8ygAsngWflM6uoyE6qMVG1FoofE16h/d3YGceUV5N3hH12N1Q1+yfX6kjU/ZsQxyuBwyr4irkWP2ZHb48A91eoN+JSD3tkB/1RHT69IoN3tANqwzWe0Y/UDhdRkzeAp7VXiUzkyn5vWbo4/WUBauAe5259QbzBNbddIx+7H4xe5c7tVmxwd1fhNpqoOAP6f8AaR6A10RuxVG2tTyPG1WB6ShtBhZIx+syPR6Us41V1CEO4FBuF7Xbg2K54r85WoHm4/nf/MYhxJzj5RM3YovGcRCTj4zQ0Gviv15zo0ku6bv9t+/80m6gabDa51KsZJcrd4J3WpEiPEsfawl2xHLY1Bgnwv7tfvJ5kR+oWPurqKebHsvKuCSInpjpoBtcYG0bnvGPM44HEoTVUkDepPYWLPwHyjMOJBfifsr8j+jP2dzFrV0yxUEe73TFUxH3x/XqCCfmD8c8+UyusFLXfPZWI91e4B8phGvRU0QQgUggggqo5B+JiNmKTSN1F5pEADg3XxI+HGeZoPtO1m8JsqTfNjG4k3z+EhXrbr9m+f4Wx8qlGthQ1WAbo3mwQBVc2RiuZembhNGc1qHusRrLKNWT6pnchohYeX1IzExvVHMVHI9HHs/EwhCEkoEIQgATqzk6sCUWaMq05JpSvTi8joVdD1WN08ZJock8TCRmNpvymE3ibHa1rNausns38a+63ceRmvpnUo6VkABjzjO1h/j74xShUo7bCVK2SOSvf75vX6d22uQpUW9qS2NhGABnntd4HM49s53fXQ8o+KxHmjqE/fX08QnDrqcb1+G4fISwMjUBYPntbbdXW4gD76kfXqRj+JP9YmEoOPYHTqqBRZbHORGK18cfnMbQeQJ16A+7j7hiVJMrq0u2ytO5JrG07iMkVztnenZsh7NAZrANmwGXB5XueZpEtlNEZvhh9k+YlWkQ25/C1bQDgmxbc9jkfdGKuRKteivxKbwyqE/ZYfyt/icfR4AB95Pst++vpK2c8m+/M2Ol3D0NcX2zzLvnWMuuLBD9DSAPJv1HHwk3Wal49nqYNgqdLy/ibjJ7RjdKq1uZvgXc38rmdXo6AKE2DeWajgijk+fl2i0rJN6+zdRSWE6X7zXnJDVYwBXhFdotdUezJBBG9iCDdjAGe+fyjW0WYFQFNgg+M9x38EkfXN7NopKShZFAKR2HnxKIrY/WEXUarKy4sEHA2juKyTjE50+sx8bITyBlfCCxBJHnVCx5Hi80sPn+vSZK2QhuvePIwOAT6nPP2YxS35pRXsWn+H2M1TJ9cx2q0j6l53oo5tssR5+qbMzAwjaOQ3rCEIQICEIQAICEBAEV6Ms05FpSzSi8zo0lmlGammSpA5IxcQEDCjfyJH4iUdPpgGxfzZj+BMXkPQKdFySFZQLBODfBW+w/emek1WTwGiOauxV+VYmNLU3EPRVAjeJioHi2kd8cd5O6ISAHOocnwupoAi7siuRORfKLnqY5FvD0tfUDDgqcX3sDgeua58p5v0lpWu4c7k/1rNlkH/Sv4ez/APKJ6tkKORpMNoJ4QUVXdRIbjIuuxmTfl2yWzKr2L5HO1SQD5E0c8fge8YgSqrUauTwPuYi/kJkIFAxSheAMADymW6pKq+fj+GPhK6ScTTFpY2We2SKRjV8cgS9dfaNgRqBCg2maUcW2ZBrDKf8Acf8AQ8aPLc1E3VKRdVYtTK7vZeM8LU1t1grVAHJTveRtY37pxAdfigX/AKX4/p+MnXSrIYt9y8K5ApQO59ZP0/VFxuoAWow7NncO1DsYJFvkZVrfSKg5K3QNMSvc1YIsjHaUdP1hZd5ZQuc2NvNDxd5Hr9LvbdV4A94jgny+M2qm9tnahoCyQzAncSSLNFtv8t95PrNKuTYdd1SsAiOMt4tpXxAAnPpYFzzNRk2mkIsHOwjNck18Mz1tZfCTfFnz5BH955wDeY+4/wCZCK7/AHOFt9pp0TWTdBburOfI8Sv2aqKUAedACZ6JMF2ObrAr3Sw9fOd1TOrw6vFeX9xa2RPqn8Z53VPLdZ55msczqVo5XJn6wXCEJuc8IQhAAhCEACAhAQAp0pZpSLSlmlMJj9JYhjSxA8NWSozn3mAP4GTgxrglQF53add/+osVueQbOhX2c6rTb/l77VQF92uK9eTUNTA4J9BX9yL/AN5xy7O3iX3qvYc0a/ei6c/aX+k/+U4A6OTOdpX/ALqyfkZN1HWhV1UJomyK73pixQ9B+E1pObYNR44FDI+JneoNaerfqR/9Qv8AXpLIGNTqRdHdmhlX5JoZI841hnP6/VROooIzxj0OMjI9RMDp7ON2BXvPWK9ZUBmoviW8+Lj+R/1U2XPb8BmLXo1Obaxx4mxWL59Ya2gBRts+TN25vOfP5wJNainFkgg2Ls9q/vNam5qsg5F0PI2O8T7CuC3HZ3/zGPpD2bm2sIxve94Ukd/SAaW9MOJgCmYci9w/m8R/EmZ6fqtMAn2i4B+0PgO/mZjpOoXUL7SCRRoG/DQz8j+cgBf1dwzMHpWrBPbyorj5SfU6dnfYoQ7drEsbGdw92s8HuJbrl/Ds2nOdwvsfUesV0b6h1CH24Ug7fQgi8n94+U2pj5SWkSKDphRtUADyAoSbVleoZHrGdqCz0hOxkHUtPPcyzqTImjta9HI5D1nIQhNBYIQhAAhCEACAhAQAo05XpSPTluhMZj1I9eZkncXYbwU03PuDkcFdym89x6RgEdQ8JPmFOSLB5BrkRHlRcq3h0qHkiTpdUiyVyHvatD3qbgmh73nG6b3XhYfHbQ+NMYzqDp6bsoYDN0SL4HNn4TCayE++n9QnE0cEaiqHbcm7jIXdwPQGox9FS+EApaNptyAl8ia0eqVSxDJeACXAqhfHz/Cb0NZSbZ04PDBrJI/xJwBirVKeTfyjfYNYYAcTg6nTGNy/ev5nM19bT99f6h/7h4kmnQj3avvfFfL1r74gaLk2dpGSNpJOR8PSMPUaZzvQfzKQflfM0vU6YFb07faHYZvPqJZxSWojSdNO7A+OcY4lHTrRIPl/ab0uoRyQrWRV1VZ4yJrqmVEbUc7QLzizYuh5sa4meEk3X6gGlj7ToPkHUn8a+6ITJVgaZSaOCciiMg4IMTrftHLFSAAoVSQa2knsa5N35xyih8ZOAVnQVvESW7U1eE5vgDm+YnQ6UEbrI8bYG0DwuQBxfCjvHdGeQfL8ri12jVAUC6bcBV5Km2/HnzmvHlk/f2VkvQdQH+yyjztST9+4VJtQGvEQT6CvwJMs1TJdXiduInYeZriRvL9cSHUjcDk3r2ZhCE0FghCEACEIQAICEBAB+nLOmMiSVaJmMxyl4XATesDstTRGRfpMI0bWK7HB+cWnHyTR0q5Y9N/VWtnB3BmLA8ECgAGBz2iwTkD0/XrHaQIHhZr7WxI+BHlOanTLqEbk2tZA7qasjaRngXRE41nHnW97Q7GSl0LGoNxsqu7I3MFG7bkE9r2g49ZTrKyqWIG4A1stjexqwRzN630fpIu33bwLOGsZH3CQvqkKbUOdNi1tqkqy5OQ2AQtjvdX8LQg99luij6J6rexVg4YKotsFqJ3Hgfvrib0lUBgrDdufBY8e0+GOYnR0en1WD6T6e5aY7KIGRRKAgY4vF36S5twKsX3+8KBRcEWaBIHIX15msYf9iUKRCbsoRm6Zr4m9J9QqMpxx4qugAMTKsTY1CuGRRarjxKxPvmxRHBE6yKWssooA39jkgCt92M9vKXUUiwdPpMdRtxWgqe7n7T3n9czyOq6k6i73027bDTbUVmBFHaBnBJPNduJ6euAy7l9kVsAEpYIzgC/4r+Ul6jpH252FQOBa49LJ8vLtzFZqKbwqxemtmc+kejRtt5aq7HHPcesx0zHYmTe1c/KNOoBkkD4zNTUYtLtlSnoRQJJ7fmCMzvRam4M44Y2ODjao7fCed1vXhLUZoKWYbiBuwBhSMA+fc+Ur6JrPxRSReLGL9MY+QmnG9WLUVl0N1ZM/EpcSZxOxDc9ikyHXEg1Z6GvPP1Y3WcvkGIQhNRQIQhAAhCEACAhAQAckehk6R6TKQ1WVabylHkKmORpk0OQkXoY9QGwwBHkQD+chR4z62gNFgD5EgTGSGoSG6AfSejqEoCW0lYLQAQ+AMKNjJG4HA5NShurGoSqvY42EBbBAsAkghvl3x2k3V6u/SpVGpuIUcFRf2m58IPODEPoHYVdVU6YLgoCWJK4YKqgCiCTQ5VTXeITXxv8AJjsJasHdB0yindQ43KqkuxpSVUHawrLZvnA8hK9V9MgpQDZAPFMVoHcq+p4kqMxa8lKDbKQBckbfEATW08eXMq0NRkXa60AjEeIFqQrQYVQxXcyWkWQshaBIdfaVQClxkAZZVOaH3ESLT6XTRgdBcsHBt9tCxW4MCRwe09XR3qig7BS175AJoA/ZzgVJf+GAszhVFsWsajkZGVNqQMseK5oSPQYgXpl9iDtqlRrF9ipsgc94ahRMsdSrwCNVhZ3XyMjP3RuhpH2Q8SBfZ1W193uj7V1+E51wcpuOzGRhsi6F/IiZ2RWagz0eNoAsNMLu4F0GXG09yPOpbpaIWmBJK5sm1XBGPM0Tn1x5yXQ0nak91AfsswJAWhuIqwCbye3E1qsFLKWpQwrcxIW0Q1bH1+8mJlCldhwRZ8yBj1Bub6MCmYG7JF3yFJArtzfEjU7wF0yDYNmwQowD8T4uJ6LYwOBiO8OvX5Mzsf0L1ZPqmN1R6ybWM6kUKTZJrmQakt1jItSNQOZezMIQmgqEIQgAQhCABAQgIANSOWJSOWZyGYDVjFi1jFmTGYjVMo0mk6SjSEoxiJVpGp36QVqGorbdt7jW7wH3sWLqgf5T5zmn5R7awHhosx4VQWPby45HNRa2KksY5W2hXTdPsLadlsIVNkmjuFcnAIJ/m+ce3TsaXUUAU3uu1ndVigBz/aI6TpmRiRtXcBa7OKHC03qZRqdSNlagO7cBjTeiN9KeCMiu8WW5jGPzI0ZizJaEK+N25zVd133i/LvKOl2sFCeVttJAHhrK98nv5GR9Fqsj7WNkB6P7UKAxTBZkoccS3S6jT1ATqBaBqskKVLAEGvI/jJJTO6TbdyNnaKtUPAQHPPw5nG0lbDClKgUQQb3NVA/ARfS6qbX3Oilgp27gNoKLj7h5d4ldBvGdPWULe4BUB+zfOAc3mUseRBdC/boAw0ip2gkgENx+8R+qkurpFi+8htzdgRQAAHf+G4xdDZpahY221ySBtFFSAKnFrv5H5RB/kQzKn2fjFEAEEEnN1Vc5sAV3uWtx8cyIvu2gBjlDlWAoMDdkeks1DOlw1LP6voXsYpjJtUygtJdWdGInYyXWkmpKtWS6kYic24zCEJoLhCEIAEIQgAQEICADUjlikjkmchqsYsaJhY1BMmMxQ1BKUFRWmsoVZk2NQRovtBarOaABNtRIFD4T0Ok0NiszG2JJuq9MegAA78STQTdqZ4RQwrzYspJ86Ar+Yz1WVWG0gEeR/Ig8xSx6x6qOLSdX7Z7AZGZL1zYocbk+fjWM1OgRPEiLfAIUeGyTfpyfvnlMjNTAt/zGvxN21RWNwqgp8/hKxWkzlh6n1YEG2IvJHhrj1H5mcHTqo98i6ugvcjtt9JK2irXZY3z43o/jN9LpqNLSYABiFO6s2Rzcu1JMhSTH9G23TUlWONPIxjZ5zGnQLN6gdv3FH6+MB0iNYG3w7eLoe/8A7SV+n09rFdrUM7bx6n7phZW5rNJba+jPXCtLU4yjAD5SYpvvT5FEOSLCgg45942PgM+Vt09BNotQbAv1sd45KGFFSKuE09kzKVum9YtXhIB9bI/Ayc7rO6vSr/G46cczoJGMmIeS6sp1DJNWaxFrGTahkzyjUk7xiJzrTMJwmANy5gdhM7xx8p2AHYQhAAgIQgA1I9ZOpjFeZtDEJFSmO05ENWMXXmbixiNiR6emY4vPKHVTX1yUdbGFfFHoDWIYOpzwQThhmuxogm7HrKNP6W2i2Vl8zYZR5mwbrPNTxj1UyepmcuPppHmKP2fWL1aVdgDvkfqp4Wl1AIJGBv1D8vaNPN9uv7o+4TadTUiFDiTZy4yLU65LHjH3/rzndPqiERPZt4QoJtaNA8Z9ZH9ZEPrIl3VpRclLpnodN17KxPs2IIXug4v19YzqfpMspX2TZBHKf5nlHqJz6xK/Auy3/L9ZpYjUAPIAfhNBpENed+szTwZn80T0N8yzSH6zOfWYeDI+eJTqGS6hgdeKfUl1EynYmL1DJ2jXMUZtESsZjU4PwP5TBUX55AzmbcWCJjN59OATxJM0YNANQ7zarXArIx/mGw59czW0+nN8QJNwhCSVCEIQA6J2EJUsdhCECQE7CEACEIQLHBOwhAgITsIEhAQhAAhCEACAhCABCEIAYMzCElFJBCEJJUIQhAAhCEAP/9k=')
		.setFooter('Suggestions ?')
		message.channel.send(dmapEmbed)
	}

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
        if(!message.mentions.users.first()) return message.reply("Utilisateur non spécifié");
        else{
          var search = message.guild.member(message.mentions.users.first()); 
          var name = db.get('personnage')
          //console.log(name);
          if(name.find({ name: `${search.username}`}).value()){
              //console.log(name);
              var name2 = db.get('personnage').find({ name: `${search.username}`}).value()
              var author = name2.name;
              var searchfound = name2.present;
              message.channel.send(`Personnage de ${author}, ${searchfound}`);    
          }else{
              //console.log(name);
              message.channel.send(`${search} n'est pas dans la base de donée`);
          }
        }


        break;

        case "permis":
        if(!message.mentions.users.first()) return message.reply("Utilisateur non spécifié");
        else{
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
          
        if(!TypePermis === "AvM true" || "AvR true" || "Hl true" || "PdL true" || "moto true" || "voiture true"){
           message.channel.send(`Veuillez spécifier le type de permis, ps: ${prefix}help 😉`);
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
        if(!message.mentions.users.first()) return message.reply("Utilisateur non spécifié");
        else{
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
        }
        break;
        case "permisof":
        if(!message.mentions.users.first()) return message.reply("Utilisateur non spécifié");
        else{
          var gMember = message.guild.member(message.mentions.users.first());
          //console.log(gMember);
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
        }
        break;
    }
});

bot.login(process.env.SECRET);
