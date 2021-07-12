var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer:{
        headless: true
    }
})

module.exports = {
    name:'image',
    description: 'this sends a image to the channel',
    async execute(client, messgae, args){
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send('Enter an image name will ya');

        const image_results = await google.scrape(image_query, 1);
        messgae.channel.send(image_results[0].url);
    }
}