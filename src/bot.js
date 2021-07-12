require("dotenv").config();

const { Client, GuildMember, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { readdirSync, read } = require('fs');
const { join } = require('path');
const welcome = require("./welcome");
const fetch = require('node-fetch');
//const mongoose = require('mongoose');
//const Levels = require('discord-xp');
const randomPuppy = require('random-puppy');
const akaneko = require('akaneko');
//const image = require('./image');

const client = new Discord.Client();

mongoose.connect(process.env.MONGO_SRV,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Connected to the database');
}).catch((err)=>{
    console.log(err);
});

client.commands = new Discord.Collection();
const PREFIX = "!";
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
        if(!client.commands.has(command)) return;
        try {
            client.commands.get(command).run(client, message, args);
        }
        catch (error){
            console.error(error);
        }
    }
})

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
    if (command == 'lewdneko') {
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.lewdNeko());
            return message.channel.send(embed);
        }
    }
    else if (command == 'maid'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.maid());
            return message.channel.send(embed);
        }
    }
    else if (command == 'ass'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.ass());
            return message.channel.send(embed);
        }
    }
    else if (command == 'bdsm'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.bdsm());
            return message.channel.send(embed);
        }
    }
    else if (command == 'blowjob'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.blowjob());
            return message.channel.send(embed);
        }
    }
    else if (command == 'cum'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.cum());
            return message.channel.send(embed);
        }
    }
    else if (command == 'doujin'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.doujin());
            return message.channel.send(embed);
        }
    }
    else if (command == 'feet'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.feet());
            return message.channel.send(embed);
        }
    }
    else if (command == 'femdom'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.femdom());
            return message.channel.send(embed);
        }
    }
    else if (command == 'foxgirl'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.foxgirl());
            return message.channel.send(embed);
        }
    }
    else if (command == 'gifs'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.gifs());
            return message.channel.send(embed);
        }
    }
    else if (command == 'glasses'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.glasses());
            return message.channel.send(embed);
        }
    }
    else if (command == 'hentai'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.hentai());
            return message.channel.send(embed);
        }
    }
    else if (command == 'netorare'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.netorare());
            return message.channel.send(embed);
        }  
    }
    else if (command == 'masturbation'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.masturbation());
            return message.channel.send(embed);
        } 
    }
    else if (command == 'orgy'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.orgy());
            return message.channel.send(embed);
        }
    }
    else if (command == 'panties'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.panties());
            return message.channel.send(embed);
        }
    }
    else if (command == 'pussy'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.pussy());
            return message.channel.send(embed);
        }
    }
    else if (command == 'succubus'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.succubus());
            return message.channel.send(embed);
        }
    }
    else if (command == 'tentacles'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.tentacles());
            return message.channel.send(embed);
        }
    }
    else if (command == 'thighs'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.thighs());
            return message.channel.send(embed);
        }
    }
    else if (command == 'uglybastard'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.uglyBastard());
            return message.channel.send(embed);
        }
    }
    else if (command == 'uniform'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.uniform());
            return message.channel.send(embed);
        }
    }
    else if (command == 'yuri'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.yuri());
            return message.channel.send(embed);
        }
    }
    else if (command == 'zettairyouiki'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.zettaiRyouiki());
            return message.channel.send(embed);
        } 
    }
    else if (command == 'mobilewallpapers'){
        embed.setImage(await akaneko.mobileWallpapers());
        return message.channel.send(embed);
    }
    else if (command == 'wallpapers'){
        embed.setImage(await akaneko.wallpapers());
        return message.channel.send(embed);
    }
    else if (command == 'nsfwmobilewallpapers'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.mobileWallpapers());
            return message.channel.send(embed);
        }
    }
    else if (command == 'nsfwwallpapers'){
        if (!message.channel.nsfw){
            if(message.author.bot) return;
            message.reply('At least go to NSFW channel for this, not everyone is hentai like you');
            return;
        }
        else{
            embed.setImage(await akaneko.nsfw.wallpapers());
            return message.channel.send(embed);
        }
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
        url: "https://www.twitch.tv/xqcow"
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
            {name:'!ily', value: 'Show your love to me!\nMy responses may vary tho', inline: true},
            {name:'!avatar', value: 'I will upload your avatar', inline: true},
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
            {name:'!hentaihelp for nsfw shit', value: '-----', inline: false}
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
else if (message.content.includes('-p ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||"762376934138445824"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-P ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||"762376934138445824"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-play ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||"762376934138445824"){
        return;
    }
    else{
        message.reply('GO TO THE MUSIC CHANNEL FOR THIS SHIT YOU FUCKING DONUT');
    }
}
else if (message.content.includes('-PLAY ')){
    if(message.author.bot) return;
    if (message.channel.id === "625114609279303730"||"762376934138445824"){
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
    message.channel.send('<@381646671559262219> 操你妈的小逼崽子');
    message.channel.send('https://www.youtube.com/watch?v=O5MM5_lrZ2U');
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

//Levels.setURL(process.env.MONGO_SRV)
//client.on("message", async message => {
    //Levels.setLevel("296502875587215361", "850584649041575956", 777);
    //Levels.setLevel("296502875587215361", "519089447380320256", 777);

    //if (!message.guild) return;
    //if (message.author.bot) return;

    //const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    //const command = args.shift().toLowerCase();

    //const randomXp = Math.floor(Math.random() * 9) + 1;
    //const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    //if (hasLeveledUp) {
        //const user = await Levels.fetch(message.author.id, message.guild.id);
        //message.channel.send(`Yo, you leveled up to ${user.level}! Keep it going!`);
    //}
    
    //if(command === "rank") {
        //const user = await Levels.fetch(message.author.id, message.guild.id);
        //message.channel.send(`You are currently level **${user.level}**!`)
    //}
    
    //if(command === "leaderboard" || command === "lb") {
        //const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 5); 

    //if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        //const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        //const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

       // message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    //}
//})