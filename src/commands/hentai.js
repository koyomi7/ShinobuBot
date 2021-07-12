const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name:"hentai",
    description: "hentai command, sends nsfw content",

    async run(bot, message, args){
        const subReddits = ["hentai", "rule34", "thighhighhentai"]
        const random = subReddits[Math.floor(Math.random()*subReddits.length)]
        const image =  await randomPuppy(random)
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(image)
        .setTitle(`Your **Ecchiness** has been granted. All the way from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed)
    }
}