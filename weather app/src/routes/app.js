const router = require('express').Router()
    , request = require('request-promise')

    , send = require('../send')
    , html = require('../client/html')

    , apiKey = process.env.API_KEY

function getWeatherUrl(city){
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
}

async function getWeather(city){
    return JSON.parse(await request.get({
        url: getWeatherUrl(city),
        headers: {
            'User-agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36`
        }
    }));
}

module.exports=(passport)=>{    
    router.get('/', function (req, res) {
        // get user from db and populate to hisstory
        // get weather from last histrory city
        // and set it to derssion
    })
    router.post('/', function (req, res) {
        // add city to user hisotry
        // redirect to get app
    })
    return router;
};