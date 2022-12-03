require("dotenv").config();

const { Client, GuildMember, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { readdirSync, read } = require('fs');
const fs = require('fs');
const { join } = require('path');
const welcome = require("./welcome");
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Levels = require('discord-xp');
const randomPuppy = require('random-puppy');
const akaneko = require('akaneko');
const DisTube = require('distube');
const db = require('quick.db');
const HMtai = require('hmtai');
const hmtai = new HMtai()
//const image = require('./image');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

mongoose.connect(process.env.MONGO_SRV,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Connected to the database');
}).catch((err)=>{
    console.log(err);
});

//direct to command folder
client.commands = new Discord.Collection();
const PREFIX = "!";
const PREFIX1 = ".";
const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on("error", console.error);
client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(message.content.startsWith(PREFIX)) {
        const args = message.content.slice(PREFIX.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'reactionrole') {
            client.commands.get('reactionrole').execute(message, args, Discord, client);
        } 
        if(!client.commands.has(command)) return;
    }
})

//music
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX1)) return;
    const args = message.content.slice(PREFIX1.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play" || command == "p")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

//roles
    client.on('message', async (message) => {
    if (message.content.startsWith(`${PREFIX}giverole`)) {
      if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send("You do not even have the permission to do so you punk.")
        message.channel.send("https://tenor.com/view/your-not-that-guy-yourenotthatguy-gif-22098263");
        return;
    }
  
      const user = message.mentions.users.first();
      const member = message.guild.member(user);
      const role = message.mentions.roles.first();
  
      if (!member) {
        return message.reply('Tell me who do you want to give role to plz');
      }
  
      if (!role) {
        return message.reply(`Please mention a role to add to ${member}.`);
      }
  
      try {
        await member.roles.add(role);
        if(role == "520022892533252127"){
            message.channel.send(`有姐姐哇kibo要发情了哇哦哇哦哇`)
        }
        else{
            message.reply(`${member} now has the "${role}" role, be thankful pleb`);
        }
      } catch (error) {
        console.log(error);
        message.reply(`Role "${role}" is not added to ${member}.\n_${error}_`);
      }
    }
  });

//nsfw part
client.on('message', async message => {
    const embed = new Discord.MessageEmbed();
    var command = message.content.toLowerCase().slice(PREFIX.length).split(' ')[0];
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    if (!message.channel.nsfw){
        if(message.author.bot) return;
        message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
        return;
    }
    if (command == 'anal') {
        embed.setImage(await hmtai.nsfw.anal());
        return message.channel.send(embed);
        
    }
    if (command == 'ass') {
        embed.setImage(await hmtai.nsfw.ass());
        return message.channel.send(embed);
        
    }
    if (command == 'bdsm') {
        embed.setImage(await hmtai.nsfw.bdsm());
        return message.channel.send(embed);
        
    }
    if (command == 'cum') {
        embed.setImage(await hmtai.nsfw.cum());
        return message.channel.send(embed);
        
    }
    if (command == 'creampie') {
        embed.setImage(await hmtai.nsfw.creampie());
        return message.channel.send(embed);
        
    }
    if (command == 'femdom') {
        embed.setImage(await hmtai.nsfw.femdom());
        return message.channel.send(embed);
        
    }
    if (command == 'incest') {
        embed.setImage(await hmtai.nsfw.incest());
        return message.channel.send(embed);
        
    }
    if (command == 'masturbation') {
        embed.setImage(await hmtai.nsfw.masturbation());
        return message.channel.send(embed);
        
    }
    if (command == 'ero') {
        embed.setImage(await hmtai.nsfw.ero());
        return message.channel.send(embed);
        
    }
    if (command == 'orgy') {
        embed.setImage(await hmtai.nsfw.orgy());
        return message.channel.send(embed);
        
    }
    if (command == 'elves') {
        embed.setImage(await hmtai.nsfw.elves());
        return message.channel.send(embed);
        
    }
    if (command == 'yuri') {
        embed.setImage(await hmtai.nsfw.yuri());
        return message.channel.send(embed);
        
    }
    if (command == 'blowjob') {
        embed.setImage(await hmtai.nsfw.blowjob());
        return message.channel.send(embed);
        
    }
    if (command == 'footjob') {
        embed.setImage(await hmtai.nsfw.footjob());
        return message.channel.send(embed);
        
    }
    if (command == 'handjob') {
        embed.setImage(await hmtai.nsfw.handjob());
        return message.channel.send(embed);
        
    }
    if (command == 'thighs') {
        embed.setImage(await hmtai.nsfw.thighs());
        return message.channel.send(embed);
        
    }
    if (command == 'pussy') {
        embed.setImage(await hmtai.nsfw.pussy());
        return message.channel.send(embed);
        
    }
    if (command == 'ahegao') {
        embed.setImage(await hmtai.nsfw.ahegao());
        return message.channel.send(embed);
        
    }
    if (command == 'uniform') {
        embed.setImage(await hmtai.nsfw.uniform());
        return message.channel.send(embed);
        
    }
    if (command == 'gangbang') {
        embed.setImage(await hmtai.nsfw.gangbang());
        return message.channel.send(embed);
        
    }
    if (command == 'tentacles') {
        embed.setImage(await hmtai.nsfw.tentacles());
        return message.channel.send(embed);
        
    }
    if (command == 'gif') {
        embed.setImage(await hmtai.nsfw.gif());
        return message.channel.send(embed);
        
    }
    if (command == 'neko') {
        embed.setImage(await hmtai.nsfw.nsfwNeko());
        return message.channel.send(embed);
        
    }
    if (command == 'zettaiRyouiki') {
        embed.setImage(await hmtai.nsfw.zettaiRyouiki());
        return message.channel.send(embed);
        
    }

});



function doKissAction() {
    var rand = [
        `https://tenor.com/view/love-cheek-peck-kiss-anime-gif-17382412`,
        `https://tenor.com/view/anime-kiss-love-sweet-gif-5095865`,
        `https://tenor.com/view/kiss-anime-cute-kawaii-gif-13843260`,
        `https://tenor.com/view/kiss-anime-love-gif-4958649`,
        `https://tenor.com/view/anime-zero-kiss-couple-lover-gif-12925177`,
        `https://tenor.com/view/aho-girl-kiss-anime-gif-9903014`,
        `https://tenor.com/view/koi-to-uso-anime-kiss-gif-13344389`,
        `https://tenor.com/view/anime-kiss-cute-couple-make-out-kiss-gif-13975815`,
        `https://tenor.com/view/anime-kiss-cute-couple-tongue-gif-14816388`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function doHugAction() {
    var rand = [
        `https://tenor.com/view/hug-anime-gif-11074788`,
        `https://tenor.com/view/anime-cheeks-hugs-gif-14106856`,
        `https://tenor.com/view/hug-anime-gif-7552075`,
        `https://tenor.com/view/hug-cuddle-comfort-love-friends-gif-5166500`,
        `https://tenor.com/view/hug-hugs-attackhug-love-gif-4977890`,
        `https://tenor.com/view/anime-cute-sweet-hug-gif-12668673`,
        `https://tenor.com/view/anime-choke-hug-too-tight-gif-14108949`,
        `https://tenor.com/view/anime-hug-hearts-hug-bff-gif-13857541`,
        `https://tenor.com/view/anime-cute-hug-gif-12668669`,
        `https://tenor.com/view/hug-anime-sweet-couple-imissed-you-gif-17897599`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function doPunchAction() {
    var rand = [
        `https://tenor.com/view/one-punch-man-%E3%83%AF%E3%83%B3%E3%83%91%E3%83%B3%E3%83%9E%E3%83%B3-manga-series-superhero-rage-gif-17175633`,
        `https://tenor.com/view/saitama-one-punch-man-gif-4973550`,
        `https://tenor.com/view/die-anime-punch-kill-angry-gif-8932977`,
        `https://tenor.com/view/anime-punch-mad-angry-gif-16962926`,
        `https://tenor.com/view/anime-punch-gif-20094842`,
        `https://tenor.com/view/purple-haze-barrage-punch-anime-jojos-bizarre-adventure-gif-17777658`,
        `https://tenor.com/view/anime-punch-hook-gif-10194762`,
        `https://tenor.com/view/ora-anime-punch-gif-15998680`,
        `https://tenor.com/view/berserk-anime-punch-golden-age-arc-gif-12045798`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function doSlamAction() {
    var rand = [
        `https://tenor.com/view/tom-and-jerry-cartoon-slam-fight-gif-17791390`,
        `https://tenor.com/view/equality-slam-gif-4882432`,
        `https://tenor.com/view/gotcha-body-slam-cats-hugs-ive-missed-you-gif-12249242`,
        `https://tenor.com/view/xqc-slam-slam-desk-desk-slam-xqc-slam-gif-19145485`,
        `https://tenor.com/view/animepound-slam-gif-4880762`,
        `https://tenor.com/view/gintama-gintoki-tsukuyo-suplex-anime-gif-16956209`,
        `https://tenor.com/view/bsd-anime-chubby-cheeks-body-slam-gif-16950031`,
        `https://tenor.com/view/gintama-gintoki-tsukuyo-suplex-anime-gif-16956209`,
        `https://tenor.com/view/anime-deer-suplex-smash-lol-gif-9716006`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function doTickleAction() {
    var rand = [
        `https://tenor.com/view/tickle-spongebob-patrick-best-friends-bff-gif-5674582`,
        `https://tenor.com/view/slow-loris-scratch-arms-up-surrender-tickle-gif-5569344`,
        `https://tenor.com/view/tickle-polarbear-cub-cute-adorable-gif-5676719`,
        `https://tenor.com/view/blue-bugcat-capoo-cat-tickle-gif-14132355`,
        `https://tenor.com/view/tickle-laugh-gif-19915995`,
        `https://tenor.com/view/ijiranaide-nagatoro-nagataro-tickle-anime-ticking-gif-21480366`,
        `https://tenor.com/view/cute-anime-tickle-laughing-gif-17555948`,
        `https://tenor.com/view/anime-tickle-spine-gif-7283507`,
        `https://tenor.com/view/cat-cute-anime-flying-witch-chito-gif-17093994`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function furryDansGame() {
    var rand = [
        `https://cdn.discordapp.com/attachments/722037415656685569/858069837011222578/image0.jpg`,
        `https://cdn.discordapp.com/attachments/722037415656685569/858069993589964810/image0.gif`,
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

function doCringeAction() {
    var rand = [
        `https://tenor.com/view/dog-smile-awkward-gif-11954393`,
        `https://tenor.com/view/evil-laugh-laugh-laughing-willem-dafoe-evil-gif-4145161`,
        `https://tenor.com/view/what-laugh-shock-cringe-oh-gif-6174100`
    ];
 
    return rand[Math.floor(Math.random() * rand.length)];
}

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);

    client.user.setActivity("the juicer", { 
        type: "STREAMING", 
        url: "https://www.twitch.tv/xqc"
    })

    welcome(client);
});

client.login(process.env.BOT_TOKEN);

client.on('message', (message) => {
if (message.content === '!help'){
    
    const embed = new MessageEmbed()
        .setTitle('MY NAME IS SHINOBU OSHINO!!!!!')
        .setColor(0xFFFF00)
        .setDescription('See this as an introduction of me')
        .addFields(
            {name:'!name of a peepo', value: 'I will describe the person from what I have heard,\nif I know them', inline: true},
            {name:'!rank', value: 'Your level based on your activities', inline: true},
            {name:'!lb/leaderboard', value: 'ranks in the server', inline: true},
            {name:'-----', value: '-----', inline: false},
            {name:'!gif', value: 'I will send you a gif of myself,\nor what you want based on what you type after', inline: true},
            {name:'!playlist', value: 'I will send you my playlist', inline: true},
            {name:'!meat', value: 'The truth about meat...', inline: true},
            {name:'-----', value: '-----', inline: false},
            {name:'!giverole @role @member', value: 'Admins only', inline: true},
            {name:'!tickle @...', value: 'who tf tickles people anyway', inline: true},
            {name:'!hug @...', value: 'If you want to comfort someone', inline: true},
            {name:'-----', value: '-----', inline: false},
            {name:'!punch @...', value: 'If you hate someone that much', inline: true},
            {name:'!kiss @...' , value: 'If you love someone that much', inline: true},
            {name:'!slam @...' , value: 'SUPELX CITY!!', inline: true},
            {name:'!meme' , value: 'I will send you some meme off reddit', inline: true},
            {name:'WIP...', value: '-----', inline: true},
            {name:'too many other shit I dont wanna list', value: '-----', inline: false},
            {name:'!hentaihelp for nsfw shit', value: '-----', inline: false},
            {name:'!musichelp for music commands', value: '-----', inline: false}
        )
        .setImage("https://i.imgur.com/fa65kSx.jpeg");
    message.channel.send(embed);
}
else if (message.content === '!hentaihelp'){
    
    const embed = new MessageEmbed()
        .setTitle('So my master really coded this for you huh....')
        .setColor(0xFFFF00)
        .setDescription('I would roast tf out of you, but my master said it would be better not say anything...')
        .addFields(
            {name:'!ass', value: 'who does not like ass right?', inline: true},
            {name:'!bdsm', value: 'if you are into this stuff...', inline: true},
            {name:'!blowjob', value: 'umm well its common', inline: true},
            {name:'!cum', value: 'wouldnt check that out ', inline: true},
            {name:'!doujin', value: 'classic haha', inline: true},
            {name:'!feet', value: 'who tf likes feet', inline: true},
            {name:'!femdom', value: 'bruh you gay', inline: true},
            {name:'!foxgirl', value: 'well, this is understandable', inline: true},
            {name:'!gifs', value: 'just go to pornhub you fuck', inline: true},
            {name:'!glasses', value: 'reminds me of someone i know', inline: true},
            {name:'!hentai' , value: 'i mean no shit', inline: true},
            {name:'!netorare' , value: 'what even is this', inline: true},
            {name:'!maid' , value: 'i like this', inline: true},
            {name:'!masturbation', value: 'you never touched a girl huh', inline: true},
            {name:'!orgy' , value: 'i wouldnt do that', inline: true},
            {name:'!panties' , value: 'what you 12??', inline: true},
            {name:'!pussy', value: 'go to biology class ', inline: true},
            {name:'!school' , value: 'i bet you have no friend', inline: true},
            {name:'!succubus' , value: 'i think i have done this', inline: true},
            {name:'!tentacles', value: 'why just why', inline: true},
            {name:'!thighs' , value: 'this i like, as well as my master', inline: true},
            {name:'!uniform' , value: 'what is up with your fetish aye?', inline: true},
            {name:'!yuri', value: 'haha watch out you might get cancelled', inline: true},
            {name:'!zettaiRyouiki' , value: 'this is playing on the edge', inline: true},
            {name:'!uglyBastard', value: 'I should have deleted this', inline: true},
            {name:'!mobilewallpapers', value: 'sfw wallpapers for phones', inline: true},
            {name:'!wallpapers', value: 'sfw wallpapers for pc', inline: true},
            {name:'!nsfwmobilewallpapers', value: 'nsfw wallpapers for phones', inline: true},
            {name:'!nsfwwallpapers', value: 'nsfw wallpaper for pc', inline: true},
        )
        .setImage("https://i.imgur.com/wEW6Phc.jpeg");
    message.channel.send(embed);
}
else if (message.content === '!musichelp'){
    const embed = new MessageEmbed()
        .setTitle('I told him this was useless but he insisted to add a music function')
        .setColor(0xFFFF00)
        .setDescription('Here are the commands, pretty basic you should know them without this')
        .addFields(
            {name:'.play', value: 'search the music and you have to give answer', inline: false},
            {name:'.repeat/.loop', value: 'i mean, loop music', inline: false},
            {name:'.stop', value: 'i will gtfo', inline: false},
            {name:'.skip', value: 'if you hate that song', inline: false},
            {name:'.queue', value: 'see all songs in queue', inline: false},
            {name:'my gaming recommandation would be', value: 'search for xqcJAM and leave the autoplay on', inline: false}
        )
        .setImage("https://www.wallpaperup.com/uploads/wallpapers/2012/09/26/16548/7d7ed8e95e1e5ace57a15a48e423e266-700.jpg");
    message.channel.send(embed);
}
else if (message.content.includes('-p ')||message.content.includes('!p ')||message.content.includes(';;')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||message.channel.id === "762376934138445824"||message.channel.id === "574754006895689778"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-P ')||message.content.includes('!P ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||message.channel.id === "762376934138445824"||message.channel.id === "574754006895689778"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-play ')||message.content.includes('!play ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||message.channel.id === "762376934138445824"||message.channel.id === "574754006895689778"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-PLAY ')||message.content.includes('!PLAY ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||message.channel.id === "762376934138445824"||message.channel.id === "574754006895689778"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('furry')){
    message.channel.send(furryDansGame());
    message.channel.send(`https://www.youtube.com/watch?v=O5MM5_lrZ2U`);
}
else if (message.content.includes('姐姐')){
    if(message.author.bot) return;
    message.reply('有姐姐？');
    message.channel.send(`https://tenor.com/view/booba-gif-20640480`);
}
//-------------------------------
else if (message.content === 'hello'){
    message.reply('Nobody is probably going to reply you, so here I am, hello there! Welcome! <3');
}
else if (message.content ==='hey'){
    message.reply('Nobody is probably going to reply you, so here I am, hello there! Welcome! <3');
}
else if (message.content === 'hi'){
    message.reply('Nobody is probably going to reply you, so here I am, hello there! Welcome! <3');
}
else if (message.content === 'sup'){
    message.reply('Nobody is probably going to reply you, so here I am, hello there! Welcome! <3');
}
else if(message.content === '!koyomi'){
    message.reply('Bruh he is a great dude, also he is my master, show some respect will ya?');
}
else if(message.content === '!kibo'){
    db.add('times.kibo', 1);
    const timesUsed = db.get('times.kibo');
    message.channel.send('<@381646671559262219> 操你妈的小逼崽子');
    message.channel.send('https://www.youtube.com/watch?v=O5MM5_lrZ2U');
    message.channel.send('今日Kibo已经被投喂了'+timesUsed+'次!');

}
else if(message.content === '!kibo?'){
    message.channel.send('<@381646671559262219> 这里发生了什么？');
    message.channel.send('https://cdn.discordapp.com/attachments/850584649041575959/869510325177843732/Red_Dead_Redemption_2_Screenshot_2021.07.26_-_16.53.13.20.png');
}
else if(message.content === '!laosiji'){
    message.channel.send("你说话啊BAKA你说话啊！ <@371268250941521924>");
    message.channel.send("https://tenor.com/view/xqc-sex-penis-funny-awesome-shaking-gif-16660244");
}
else if(message.content === '!luna'){
    if(message.author.id == "394963126572941322"){
        message.reply(`Well well well, look who it is. Isn't that the sweetest person I've met! Welcome welcome.`);
    }
    else{
        message.reply(`She's a smooth killa`)
    }
}
else if(message.content === '!raymin'){
    message.channel.send("LEAVE THE WOMEN ALONE AND GET ON <@408825546852794369>");
    message.channel.send("https://tenor.com/view/xqc-sex-penis-funny-awesome-shaking-gif-16660244");
}
else if(message.content === '!eddy'){
    message.reply('I do not know this guy very well I will keep it on a stack, he sounds legit tho.');
}
else if(message.content === '!riko'){
    message.channel.send("Get on and play PUSSY <@388933290339467265>");
    message.channel.send("https://tenor.com/view/xqc-evil-laugh-gif-13792006");
}
else if(message.content === '!shinobu'){
    message.reply('I am the best.', 'I like donuts.');
}
else if(message.content === 'haHAA'){
    message.channel.send('wow funny person');
    message.channel.send(doCringeAction());
}
//---------------------------------------------------------------------------
else if(message.content === '!ily'){
    if(message.author.id === "296502875587215361"){
        message.reply('Aww I love you too <33333');
    }
    else{
        message.reply('Uhh ok thanks I guess.');
    }
}
else if(message.content === '!playlist'){
    message.reply('Here is my playlist~');
    message.reply('https://www.youtube.com/playlist?list=PLhFw0ftuwhqutXgKGvXLpik1JI4-E29UY');
}
else if(message.content === '!meat'){
    message.reply('About meat... Let my friend Kaiki lecture you about that');
    message.channel.send('https://www.youtube.com/watch?v=TFFeYLmEARw');
}
else if(message.content === '!chopstick'){
    message.channel.send('<@381646671559262219>');
    message.channel.send('https://tenor.com/view/pepe-laugh-he-doesnt-know-pepe-gif-14019260');
    message.channel.send('https://cdn.discordapp.com/attachments/519089447380320259/859897521135812638/image0.jpg');
}
else if (message.content === '!avatar') {
    message.reply(message.author.displayAvatarURL());
  }
  //else if (message.content === '!image') {
    //image(client);
  //}
});

client.on("message", message => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        if(message.author.id == "296502875587215361"){
            message.channel.send("HELLO MY MASTER! Glad to see you again!");
        }
        else if(message.author.id == "381646671559262219"||"371268250941521924"){
            message.channel.send("Stop it. Get some help");
        }
        else{
            message.channel.send("STOP");
        }
    };
});

//intereactions
client.on("message", message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
                
    case 'kiss':
    const personTagged = message.mentions.members.first();
    if(!args[1]) {
        message.channel.send('You are retarded!')
    }else{
        message.channel.send('`' + message.author.username + '`' + ' kissed ' + personTagged.displayName + ' ');
        message.channel.send(doKissAction());
    }
    break;

    case 'hug':        
    const member = message.mentions.members.first();
    if(!args[1]) {
        message.channel.send('You are retarded!')
    }else{
        message.channel.send('`' + message.author.username + '`' + ' hugged ' + member.displayName + ' ')
        message.channel.send(doHugAction());
    }
    break;

    case 'punch':        
    const target = message.mentions.members.first();
    if(!args[1]) {
        message.channel.send('You are retarded!')
    }else{
        message.channel.send('`' + message.author.username + '`' + ' punched the fuck out of ' + target.displayName + ' ');
        message.channel.send(doPunchAction());
    }
    break;

    case 'slam':        
    const slamTarget = message.mentions.members.first();
    if(!args[1]) {
        message.channel.send('You are retarded!')
    }else{
        message.channel.send('`' + message.author.username + '`' + ' just slamed ' + slamTarget.displayName + ' out of exsitence, quite impressive!' + ' ' );
        message.channel.send(doSlamAction());
    }
    break;

    case 'tickle':        
    const tickleTarget = message.mentions.members.first();
    if(!args[1]) {
        message.channel.send('You are retarded!')
    }else{
        message.channel.send('`' + message.author.username + '`' + ' tickled ' + tickleTarget.displayName + ', and now they are shitting themselves!' + ' ' );
        message.channel.send(doTickleAction());
    }
    break;

   }
})

client.on('message', gotMessage);
async function gotMessage(msg) {
  if (msg.channel.id == "519089447380320259"||"850584649041575959") {
  
  let tokens = msg.cleanContent.split(" ");

  if (tokens[0] === "!oshino") {
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  } 
  else if (tokens[0] == "!gif") {
    let keywords = "shinobu oshino";
    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ");
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
  }
 }
};

Levels.setURL(process.env.MONGO_SRV)
client.on("message", async message => {
    Levels.setLevel("296502875587215361", "850584649041575956", 777);
    Levels.setLevel("296502875587215361", "519089447380320256", 777);

    if (!message.guild) return;
    if (message.author.bot) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Yo, you leveled up to ${user.level}! Keep it going!`);
    }
    
    if(command === "rank") {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**!`)
    }
    
    if(command === "leaderboard" || command === "lb") {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); 

    if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    }
})