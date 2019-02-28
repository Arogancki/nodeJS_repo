
const mongoose = require('mongoose')
    , config = require('../config')
    , statuses = require('../assets/reminderStatuses')
    , httpStatuses = require('http-status-codes')
    , callMeBack = require('../helpers/callMeBack')
    , log = require('../helpers/log')
    , places = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        tolerance: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(statuses)
        },
        changeStatusToActiveHandler: {
            id: mongoose.Schema.Types.ObjectId,
            token: String,
            time: Date,
        },
        changeStatusToExpiredHandler: {
            id: mongoose.Schema.Types.ObjectId,
            token: String,
            time: Date
        },
        timestamps: {
            created: {
                type: Date,
                default: Date.now
            },
            closed: {
                type: Date
            }
        }
    })

const model = mongoose.model(config.PLACES_DATABASE_NAME, places)

const _userPropsFilter = place =>{
    const filtered = {
        _id: place._id.toString(),
        name: place.name,
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        tolerance: place.tolerance,
        timestamps: place.timestamps,
        status: place.status
    }
    if (place.status === statuses.SLEPT){
        filtered.changeStatusToActiveTime = place.changeStatusToActiveHandler.time
    }
    if (place.changeStatusToExpiredHandler.time){
        filtered.changeStatusToExpiredTime = place.changeStatusToExpiredHandler.time
    }
    return filtered
}

const userPropsFilter = async place => {
    place = await Promise.resolve(place)
    if (Array.isArray(place)){
        return place.map(_userPropsFilter)
    }
    return _userPropsFilter(place)
}

const create = async ({userId, name, description, latitude, longitude, tolerance, active})=>model.create({
    userId, name, description, latitude, longitude, tolerance
})

const get = _id => model.findOne({_id})

const getAll = userId => model.find({userId})

const update = async (_id, options) => model.findOneAndUpdate({_id}, options, {new: true})

const setStatusTimeout = (modelElement, timeoutStatus) => async (_id, minutes, status) => {
    const when =  new Date().getTime() + minutes * 60 * 1000
    const oldPlace = await model.findOneAndUpdate({_id, }, {
        [modelElement]: {
            id: null,
            token: null,
            time: null
        }
    }, {old: true})
    if (!oldPlace){
        throw {httpStatus: httpStatuses.NOT_FOUND}
    }
    if (oldPlace[modelElement].id){
        try {
            await callMeBack.delete(oldPlace[modelElement].id, oldPlace[modelElement].token)
            log.trace(`${modelElement} deleted for place ${_id}`)
        }
        catch(err){
            log.trace(`can not delete ${modelElement} for place ${_id}`)
        }
    }
    const response = await callMeBack.put({
        route: `/places/${_id}/set_status`,
        method: 'post',
        sec: (when - new Date().getTime()) / 1000,
        body: {status: timeoutStatus}
    })
    const options = {
        [modelElement]: {
            id: response.id,
            token: response.token,
            time: when
        }
    }
    if (status){
        options.status = status
    }
    return update(_id, options)
} 

const setExpiredTimeout = setStatusTimeout('changeStatusToExpiredHandler', statuses.EXPIRED)
const setActiveTimeout = setStatusTimeout('changeStatusToActiveHandler', statuses.ACTIVE)

const setStatus = (_id, status, minutes) => {
    if (status===statuses.ACTIVE){
        return update(_id, {
            status,
            changeStatusToActiveHandler: {
                id: null,
                token: null,
                time: null
            }
        })
    } else if (status===statuses.DONE || status===statuses.EXPIRED){
        return update(_id, {
            status,
            changeStatusToExpiredHandler: {
                id: null,
                token: null,
                time: null
            },
            changeStatusToActiveHandler: {
                id: null,
                token: null,
                time: null
            },
            'timestamps.closed': Date.now()
        })
    } else if (status===statuses.SLEPT){
        return setActiveTimeout(_id, minutes, status)
    }
    throw new Error(`Invalid status: ${status}`)
}

module.exports = {
    userPropsFilter,
    get, getAll, create, update, 
    setStatus, setExpiredTimeout
}
