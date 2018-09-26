const router = require('express').Router()
    , path = require('path')
    , fs = require('fs')

module.exports = (app) => {

    const backgroundDir = path.resolve(app.public, "images/background/")    

    let imagesAmonth = 0
    while (true){
        const file = path.join(backgroundDir, 1+imagesAmonth+"")
        if (fs.existsSync(file+".jpg") && fs.existsSync(file+"-min.jpg")){
            imagesAmonth++
        }
        else {
            break
        }
    }

    if (!imagesAmonth){
        throw new Error("No images for background found!")
    }

    router.get('/.jpg', (req, res) => {
            res.sendFile(path.join(backgroundDir, 
                ( ( new Date().getDay() % imagesAmonth ) + 1 ) + ".jpg"))
    })
    
    router.get('/-min.jpg', (req, res) => {
        res.sendFile(path.join(backgroundDir, 
            ( ( new Date().getDay() % imagesAmonth ) + 1 ) + "-min.jpg"))
    })
    
    return router
}