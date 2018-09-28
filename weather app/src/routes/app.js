const router = require('express').Router()
    , request = require('request-promise')
    , Joi = require('joi')

    , send = require('../send')
    , html = require('../client/html')
    , app = require('../client/app')
    , redirect = require('../redirect')
    , isLogged = require('../isLogged')

    , apiKey = process.env.API_KEY
    , appSchema = {
        city: Joi.string().min(3).max(40).required(),
    };

function getWeatherUrl(city){
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

function getWeather(city){
    return request.get({
        url: getWeatherUrl(city),
        headers: {
            'User-agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36`
        }
    });
}


module.exports=(passport)=>{    
    router.use((req, res, next)=>{
        if (!isLogged(req)){
            redirect(req, res, '/signIn');
            return
        }
        next();
    })
    router.get('/', async function (req, res) {
        if (req.user.data.length){
            try{
                let weatherInfo = JSON.parse(await getWeather(req.user.data[0]));
                req.flash('background', weatherInfo.weather[0].description);
                send(req, res, 200, html(app(weatherInfo, req.flash('appMessage')||"")));
            }
            catch(err){
                send(req, res, 200, html(app(undefined, err.message)));
            }
        }
        else
            send(req, res, 200, html(app(undefined, req.flash('appMessage')||"")));
    })
    router.post('/', async function (req, res) {
        const validation = Joi.validate(req.body, appSchema);
        if (validation.error){
            req.flash('appMessage', "Is this even a city?");
            redirect(req, res, '/app');
            return;
        }
        let user = req.user;
        user.data = [ req.body.city, ...user.data.slice(0, 9)];
        try{
            await user.save();
        }
        catch(err){
            req.flash('appMessage', err.message);
        }
        redirect(req, res, '/app');
    })
    return router;
};