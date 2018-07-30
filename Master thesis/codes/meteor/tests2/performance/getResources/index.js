const getText = require('./getText')
    , getImage = require('./getImage')
    , getVideo = require('./getVideo')

module.exports = function test(config){
    describe('get resources', ()=>{
        getText(config)
        getImage(config)
        getVideo(config)
    })
}