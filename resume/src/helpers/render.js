const { log } = require('./log')
    , socialMediaLinks = require('../assets/socialMediaLinks')
    , navigationLinks = require('../assets/navigationLinks')
    , handleError = require('./handleError')

module.exports = (req, res, templatePath, params={}, isErrorCallbackActive=true)=>{
    log(`rendering template "${templatePath}"`, req, params)
    return res.render('layout', {
        ...params, 
        body: templatePath,
        socialMediaLinks,
        navigationLinks,
        path: req.baseUrl,
        route: '/' + req.baseUrl.split('/')[1],
        section: req.baseUrl.split('/')[1]
    }, (err, html)=>{
        if (err && isErrorCallbackActive) 
            return handleError(err, req, res)
        return res.send(html)
    })
}