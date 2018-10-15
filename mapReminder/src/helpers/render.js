const { log } = require('./log')
    , handleError = require('./handleError')

module.exports = (req, res, templatePath, params={}, isErrorCallbackActive=true)=>{
    log(`rendering template "${templatePath}"`, req, params)
    return res.render('layout', {
        body: templatePath,
        path: req.baseUrl,
        route: '/' + req.baseUrl.split('/')[1],
        section: req.baseUrl.split('/')[1],

        ...params, 
    }, (err, html)=>{
        if (err && isErrorCallbackActive) 
            return handleError(err, req, res)
        return res.send(html)
    })
}