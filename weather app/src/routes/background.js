const router = require('express').Router()
    , request = require('request-promise')

    , redirect = require('../redirect')
    , defaultBackground = '/defaultBackground'

const getLink = (text, number=0) => 
    `https://api.qwant.com/api/search/`
    +`images?count=1`
    +`&offset=${number}`
    +`&size=large`
    +`&color=black`
    +`&imagetype=photo`
    +`&q=${text}`

const rand = max => Math.floor(Math.random() * 10 * max) % (max+1)

const getImage = async (text, max=16) => {
    let number = rand(Math.floor(max));
    let link = getLink(text, number);
    try{
        let res = JSON.parse(await request.get({
            url: getLink(text, number),
            headers: {
                'User-agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36`
            }
        }));
        if (res.data.result.items.length 
            && res.data.result.items[0].media)
            return res.data.result.items[0].media;
    }
    catch(err){}
    if (number > 0)
        return await getImage(text, max/2);
    return defaultBackground
}

module.exports=(passport)=>{
    router.get('/', function (req, res) {
        let weatherMain = req.flash('background')[0];
        if (!weatherMain){
            res.redirect(defaultBackground);
            return
        }
        getImage(weatherMain).then(url=>{
            redirect(req, res, url);
        });
    })
    return router;    
};