const AWS = require('aws-sdk')
    
AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.DYNAMO_ACCESS_KEY, 
    secretAccessKey: process.env.DYNAMO_SECRET,
})

const userTableName = 'mapusers'
    , locationTableName = 'maplocations'
    , docClient = new AWS.DynamoDB.DocumentClient()
    , user = require('./user')(docClient, userTableName)
    , location = require('./location')(docClient, locationTableName)
    , handleError = require('../helpers/handleError')

const deleteLocation = (id, email) => 
    location.get(id)
    .then(location=>{
        if (location.userEmail!==email)
            return Promise.reject({message: 'Not found'})
        return user.deleteLocation(location.userEmail, id)
        .then(_=>location)
    })

const deleteHistory = (id, email) => 
    location.get(id)
    .then(location=>{
        if (location.userEmail!==email)
            return Promise.reject({message: 'Not found'})
        return user.deleteHistory(location.userEmail, id)
        .then(location.deleteLocation(id))
        .then(_=>location)
    })

const putLocation=(name, description, latitude, longitude, tolerance, userEmail)=>
    location.putLocation(name, description, latitude, longitude, tolerance, userEmail)
    .then(item=>
        user.putLocation(userEmail, item.id)
        .then(_=>item)
    )

const getLocations = email=>user.getLocationIds(email)
    .then(({locations, history})=>{
        const list = [...Object.keys(locations), ...Object.keys(history)]
        if (!list.length)
            return Object({locations: [], history: []})
        return location.getLocalizations(list)
        .then(ids=>{
            const locs = {
                locations: [],
                history: []
            }
            ids.forEach(v => locations[v.id] 
                ? locs.locations.push(v) 
                : locs.history.push(v)
            )
            return locs
        })
    })

const models = {
    user: {
        ...user,
        deleteLocation,
        putLocation,
        getLocations,
        deleteHistory
    },
    location: {
        ...location,
        putLocation,
        deleteLocation,
        getLocations
    }
}

module.exports = models