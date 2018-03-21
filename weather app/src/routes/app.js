const router = require('express').Router()
    , request = require('request-promise')
    , Joi = require('joi')

    , send = require('../send')
    , html = require('../client/html')
    , app = require('../client/app')
    , queries = require('../models/queries')
    , redirect = require('../redirect')
    , isLogged = require('../isLogged')

    , apiKey = process.env.API_KEY
    , appSchema = {
        city: Joi.string().alphanum().min(3).max(40).required(),
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
    router.get('/', function (req, res) {
        // get last weather form user.querises.city 
        // wysalac zapytanie do api i drukowac strone
        send(req, res, 200, html(app(req.flash('appMessage')||"")));
    })
    router.post('/', function (req, res) {
        // przerobic na async
        const validation = Joi.validate(req.body, appSchema);
        if (validation.error){
            req.flash('appMessage', validation.error.details[0].message);
            redirect(req, res, '/app');
        }
        let user = req.user;
        if (!user.queries){
            let query = new queries();
            query.cities.unshift(req.body.city);
            query.save(err=>{
                if (err) {
                    req.flash('appMessage', err.message);
                    redirect(req, res, '/app');
                    return
                }
                user.queries = query;
                user.save(err=>{
                    if (err){
                        req.flash('appMessage', err.message);
                    }
                    redirect(req, res, '/app');
                });
            })
            return
        }
        user.populate('queries', (err, model)=>{
            let queries = model.queries;
            queries.cities = [ req.body.city, ...queries.cities.slice(0, 9)];
            queries.save((err)=>{
                if (err){
                    req.flash('appMessage', err.message);
                }
                redirect(req, res, '/app');
            });
        })
    })
    return router;
};