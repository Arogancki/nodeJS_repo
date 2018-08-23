const { log } = require('./log')
    , socialMediaLinks = require('../assets/socialMediaLinks')
    , navigationLinks = require('../assets/navigationLinks')

module.exports = (req, res, templatePath, params={})=>{
    log(`rendering template "${templatePath}"`, req, params)
    return res.render('layout', {
        ...params, 
        body: templatePath,
        socialMediaLinks,
        navigationLinks
    })
}