const router = require('express').Router()
    , request = require('request-promise')

    , redirect = require('../redirect')

const getLink = (text, number=0) => 
    `https://api.qwant.com/api/search/`
    +`images?count=1`
    +`&offset=${number}`
    +`&size=large`
    +`&color=black`
    +`&imagetype=photo`
    +`&q=weather%20${text}`

const rand = max => Math.floor(Math.random() * 10 * max) % (max+1)

const getImage = async (text, max=32) => {
    // mocked 
    return `/${text}`
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
    return `/${text}`
}

module.exports=(passport)=>{
    router.get('/', function (req, res) {
        let text = "rain";
        // for unsigned and empty session
        res.redirect('/defaultBackground');
        // for signed take this from session
        return;
        getImage(text).then(url=>{
            redirect(req, res, url);
        });
    })
    return router;    
};