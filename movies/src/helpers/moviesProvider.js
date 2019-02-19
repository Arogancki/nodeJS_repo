const rp = require('request-promise')
    , config = require('../config')
    , baseApiUrl = `http://www.omdbapi.com`
    , apiUrl = `${baseApiUrl}/?apikey=${config.API_KEY}`

const fetch = query => rp({
    method: 'get',
    url: `${apiUrl}&${query}`,
    simple: false,
    resolveWithFullResponse: true,
    json: true

}).then(response=>{
    if (response.statusCode!==200){
        return response.statusCode
    }
    return response.body
})

exports.getById = id => fetch(`i=${id}`)

exports.getByTitle = title => fetch(`t=${title}`)