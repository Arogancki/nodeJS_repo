const router = require('express').Router()
    , matrixLib = require('../../matrix')
    
    , Joi = require('joi')
    , randomstring = require("randomstring")

    , put = {
        matrix: Joi.array().required(),
    },

    multiplicate = {
        m1: Joi.string().required(),
        m2: Joi.string().required(),
        threads: Joi.number().required().min(1).max(16)
    }

module.exports = (app) => {
    
    router.get('/:id?', async (req, res)=>{
        if (!req.params.id){
            return res.render('matrix/index.ejs', {
                matrixes: req.session.matrixes || {}
            })
        }
        return (req.session.matrixes||{})[req.params.id]
        ? res.json({matrix: req.session.matrixes[req.params.id]})
        : res.status(404).end()
    })

    router.delete('/:id?', async (req, res)=>{
        if ((req.session.matrixes||{})[req.params.id||'']){
            delete req.session.matrixes[req.params.id]
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
		// custom validation
		if (req.body.matrix.length===0 || req.body.matrix.length>50){
			return res.status(400).json({message: 'Invalid matrix'})
        }
        let prevColums
		for (let arr of req.body.matrix){
			if (!Array.isArray(arr)){
				return res.status(400).json({message: 'Invalid matrix'})
			}
			prevColums = prevColums || arr.length
			if (prevColums!==arr.length || arr.length===0 || arr.length>50){
				return res.status(400).json({message: 'Invalid matrix'})
			}
			for (let v of arr){
				if (isNaN(v)){
					return res.status(400).json({message: 'Invalid matrix'})
				}
			}
		}
		// end custom validation
        req.session.matrixes=req.session.matrixes||{}
        const id = randomstring.generate(8)
        req.session.matrixes[id]=req.body.matrix
        return res.json({id, matrix: req.body.matrix})
    })

    router.post('/', async (req, res)=>{
        const validation = Joi.validate(req.body, multiplicate)
        if (validation.error){
            return res.status(400)
            .json({message: validation.error.details[0].message})
        }
        if (!req.session.matrixes[req.body.m1] 
            || !req.session.matrixes[req.body.m1]){
            return res.status(400).json({message: "invalid id"})
        }
        try{
            return res.json( 
                await matrixLib.multiplicate(req.session.matrixes[req.body.m1],
                req.session.matrixes[req.body.m2], req.body.threads))
        }
        catch(e){
            return res.status(400)
            .json({message: e.message})
        }
    })
    
    return router
}