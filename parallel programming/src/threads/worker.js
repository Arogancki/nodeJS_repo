process.on('message', async data => {
    try {
        process.send({resolve: await require(data.pathToScript)(data.args)})
    }
    catch (err){
        process.send({
            reject: {
                stack: err.stack, 
                message: err.message
            }
        })
    }
})