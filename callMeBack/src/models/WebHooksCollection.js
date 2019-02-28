
const mongoose = require('mongoose')
    , log = require('../helpers/log')
    , config = require('../config')
    , rp = require('request-promise')
    , randomstring = require('randomstring')
    , webHooks = new mongoose.Schema({
        uri: {
            type: String,
            required: true
        },
        method: {
            type: String,
            enum: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
            required: true
        },
        headers: {
            type: Object
        },
        auth: {
            type: Object
        },
        body: {
            type: Object
        },
        when: { 
            type: Date,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        retry: {
            gap: {
                type: Number,
                default: 3
            },
            times: {
                type: Number,
                default: 3
            },
            done: {
                type: Number,
                default: 0
            }
        }
    })

function getTimeInterval(t){
    let ms = t - new Date()
    return ms < 0 ? 0 : ms
}

async function invoke(hook, ms){
    await new Promise((res, rej)=>{
        return setTimeout(async () => {
            log.trace(`webHook id: "${hook._id}" triggered`)
            if (!await model.findById(hook._id)){
                log.trace(`webHook id "${hook._id}" has been canceled`)
                return rej(model.timerCanceledError)
            }
            res()
        }, ms)
    })
    let response;
    try {
        response = await rp({
            method: hook.method,
            uri: hook.uri,
            qs: {
                token: hook.token,
                id: hook._id.toString()
            },
            headers: hook.headers,
            auth: hook.auth,
            body: hook.body,
            simple: false,
            resolveWithFullResponse: true,
            json: hook.body ? true : false
        })
    }
    catch(err){
        response = {statusCode: 404}
    }
    if (response.statusCode < 400){
        await model.deleteById(hook._id)
        return log.trace(`webHook: "${hook._id}" (status: ${response.statusCode}) has finished execution`)
    }
    const newHook = await model.findByIdAndUpdate(hook._id, {$inc: {"retry.done": 1}}, {new: true})
    if (!newHook){
        throw model.timerCanceledError
    }
    if (newHook.retry.times !== -1 && newHook.retry.done >= newHook.retry.times){
        try{
            await model.deleteById(hook._id)
        }
        catch(err){}
        return log.trace(`webHook: "${hook._id}" (status: ${response.statusCode}) has finished execution (did not reach the hook)`, response.statusCode)
    }
    ms = newHook.retry.gap*1000
    log.trace(`webHook: "${hook._id}" (status: ${response.statusCode}) retrying in ${ms/1000.0} sec`)
    return invoke(newHook, ms)
}

webHooks.methods.invokeOnTime = async function invokeOnTime(emitter) {
    let ms = getTimeInterval(this.when)
    log.trace(`webHook id: "${this._id}" is going to be executed in ${ms/1000.0} sec`)
    try {
        return await invoke(this, ms)
    }
    catch (err){
        if (err!==model.timerCanceledError){
            return log.error(`webHook: "${this._id}" has thown an error: ${err.name}: ${err.message}`)
        }
    }
}

const model = mongoose.model(config.WEBHOOKS_DATABASE_NAME, webHooks)

model.timerCanceledError = new Error('Timer canceled')

model.deleteById = async function deleteById(id){
    try {
        return !!(await model.findByIdAndDelete(id))
    }
    catch(e){
        return false
    }
}

model.createNew = async function createNew(sec, hookOptions){
    const when =  new Date().getTime() + sec * 1000
    const hook = await model.create({...hookOptions, when, token: randomstring.generate(16)})
    hook.invokeOnTime()
    return {
        id: hook._id.toString(), 
        token: hook.token
    }
}

async function retrive(){
    const retrieved = await model.find({}) || []
    log.info(`${retrieved.length} calls has been restored`)
    retrieved.forEach(hook=>hook.invokeOnTime())
}
retrive()

module.exports = model