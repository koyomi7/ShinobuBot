module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const reactionChannel = '872046539298713650';
        const warzoneRole = message.guild.roles.cache.find(role => role.name === "WARZONE");
        const overwatchRole = message.guild.roles.cache.find(role => role.name === "OVERWATCH");
        const valorantRole = message.guild.roles.cache.find(role => role.name === "VALORANT");
        const csgoRole = message.guild.roles.cache.find(role => role.name === "CSGO");
        const lolRole = message.guild.roles.cache.find(role => role.name === "LOL");
        const steamRole = message.guild.roles.cache.find(role => role.name === "STEAM");
        const blizzardRole = message.guild.roles.cache.find(role => role.name === "BLIZZARD");
        const mhwRole = message.guild.roles.cache.find(role => role.name === "MHW");
        const rdrRole = message.guild.roles.cache.find(role => role.name === "RED DEAD REDEMPTION");
        const minecraftRole = message.guild.roles.cache.find(role => role.name === "MINECRAFT");
 
        const warzonePlayer = '🪂';const overwatchPlayer = '☮️';const valorantPlayer = '🔰';
        const csgoPlayer = '♿';const leaguePlayer = '♊';const steamPlayer = '🛒';
        const blizzardPlayer = '❄️';const MHWPlayer = '😺';const RDRPlayer = '🤠';
        const minecraftPlayer = '📦';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#FEE75C')
            .setTitle('What games do you play!??')
            .setDescription('Let us see if anyone else play the same games!\n\n'
                + `${warzonePlayer} for warzone\n`
                + `${overwatchPlayer} for overwatch\n`
                + `${valorantPlayer} for valorant\n`
                + `${csgoPlayer} for csgo\n`
                + `${leaguePlayer} for league of legends\n`
                + `${steamPlayer} for other steam games\n`
                + `${blizzardPlayer} for blizzard games\n`
                + `${MHWPlayer} for monster hunter\n`
                + `${RDRPlayer} for red dead redemption\n`
                + `${minecraftPlayer} for minecraft`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(warzonePlayer);
        messageEmbed.react(overwatchPlayer);
        messageEmbed.react(valorantPlayer);
        messageEmbed.react(csgoPlayer);
        messageEmbed.react(leaguePlayer);
        messageEmbed.react(steamPlayer);
        messageEmbed.react(blizzardPlayer);
        messageEmbed.react(RDRPlayer);
        messageEmbed.react(MHWPlayer);
        messageEmbed.react(minecraftPlayer);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == reactionChannel) {
                if (reaction.emoji.name === warzonePlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(warzoneRole);
                }
                if (reaction.emoji.name === overwatchPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(overwatchRole);
                }
                if (reaction.emoji.name === valorantPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(valorantRole);
                }
                if (reaction.emoji.name === csgoPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(csgoRole);
                }
                if (reaction.emoji.name === leaguePlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(lolRole);
                }
                if (reaction.emoji.name === steamPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(steamRole);
                }
                if (reaction.emoji.name === blizzardPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blizzardRole);
                }
                if (reaction.emoji.name === minecraftPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(minecraftRole);
                }
                if (reaction.emoji.name === MHWPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(mhwRole);
                }
                if (reaction.emoji.name === RDRPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(rdrRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == reactionChannel) {
                if (reaction.emoji.name === warzonePlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(warzoneRole);
                }
                if (reaction.emoji.name === overwatchPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(overwatchRole);
                }
                if (reaction.emoji.name === valorantPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(valorantRole);
                }
                if (reaction.emoji.name === csgoPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(csgoRole);
                }
                if (reaction.emoji.name === leaguePlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(lolRole);
                }
                if (reaction.emoji.name === steamPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(steamRole);
                }
                if (reaction.emoji.name === blizzardPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blizzardRole);
                }
                if (reaction.emoji.name === minecraftPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(minecraftRole);
                }
                if (reaction.emoji.name === MHWPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(mhwRole);
                }
                if (reaction.emoji.name === RDRPlayer) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(rdrRole);
                }
            } else {
                return;
            }
        });
    }
 
}   