const { fork } = require('child_process')
    , { isAbsolute } = require('path')
    , { exists } = require('fs-extra')
    , numCPUs = require('os').cpus().length

exports.parallel = async function parallel(config){
    if (!config.pathToScript) 
        throw new Error(`Missing pathToScript`)
    if (!isAbsolute(config.pathToScript))
        throw new Error('Path to script is not absolute')
    if (!exists(config.pathToScript))
        throw new Error('Script does not exists')
    config.threads = config.threads || numCPUs
    config.data = config.data || {}
    config.data.threads = config.threads

    const promises = []
    for (let i=0; i<config.threads; i++){
        config.data.id=i
        promises.push(createThread(config.pathToScript, config.data))
    }
    return Promise.all(promises)
}

function createThread(pathToScript, data){
    return new Promise(async (res, rej)=>{
        //return res(require(pathToScript)(data))
        const process = fork('./src/threads/worker')
        process.send({
            args: data,
            pathToScript: pathToScript
        })
        process.on('message', out=>{
            out.resolve 
            ? res(out.resolve) 
            : rej(out.reject)
            process.kill()
        })
        process.on('error', out=>{
            rej(out.reject)
            process.kill()
        })
    })
}