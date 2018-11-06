const router = require('express').Router()
    , fractalLib = require('../../fractal')
    , fs = require('fs-extra')
    , path = require('path')
    , Joi = require('joi')
    , randomstring = require("randomstring")

    , put = {
        width: Joi.number().required().min(20).max(12000),
        height: Joi.number().required().min(20).max(12000),
        threads: Joi.number().required().min(1).max(16)
    }

module.exports = (app) => {

    // clear fractals from prev session
    const fractalsDir = path.join(app.public, 'fractals')
    if (fs.existsSync(fractalsDir)){
        fs.removeSync(fractalsDir)
    }
    fs.mkdir(fractalsDir)

    router.get('/:id?', async (req, res)=>{
        if (!req.params.id){
            return res.render('fractal/index.ejs', {
                fractals: req.session.fractals || {}
            })
        }
        return (req.session.fractals||{})[req.params.id] 
        ? res.redirect(`/fractals/${req.params.id}.png`)
        : res.status(404).end()
    })

    router.delete('/:id?', async (req, res)=>{
        if ((req.session.fractals||{})[req.params.id||'']){
            await fs.remove(path.join(fractalsDir, req.params.id + '.png'))
            delete req.session.fractals[req.params.id]
            return res.end()
        }
        return res.status(404).end()
    })

    router.put('/', async (req, res)=>{
        const validation = Joi.validate(req.body, put)
        if (validation.error){
            return res.status(400)
            .json({message: validation.error.details[0].message})
        }
        req.session.fractals=req.session.fractals||{}
        const id = randomstring.generate(8)
        try{
            const {time, file} = await fractalLib.generateFractal(
                req.body.width, req.body.height, path.join(fractalsDir, id), req.body.threads)
            req.session.fractals[id]={
                file, time, threads: req.body.threads
            }
            return res.json({time, id})
        }
        catch(e){
            return res.status(400).json({message: e.message})
        }
    })
    
    return router
}