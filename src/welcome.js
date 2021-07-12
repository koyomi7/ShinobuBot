module.exports = client => {
    const channelID = "519089447380320259";
    client.on("guildMemberAdd", (member) => {
        console.log(member);

    const channel = member.guild.channels.cache.get(channelID);

    channel.send(`WELCOME ${member} TO THE JUNGLE!!!!!`);
    });
};