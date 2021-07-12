const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    description: "meme command, sends a meme from certain place",

    async run (bot, message, args) {
        const subReddits = ["meme","funny"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        const img = await randomPuppy(random)
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Your **meme** has been granted. All the way from r/${random}`)
        .setDescription(`If it fails to load it's because it is in mp4 format, and I cant afford that`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed)
    }
}