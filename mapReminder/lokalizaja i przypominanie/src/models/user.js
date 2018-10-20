module.exports = (docClient, name)=>{
    
    const setParams = params=>Object({
        TableName: name,
        ...params
    })

    const get = email=>new Promise((res, rej)=>
        docClient.get(setParams({
            Key: {email}
        }), (err, data)=>!err && data.Item ? res(data.Item) : rej(err || {message: 'Not found'}))
    )

    const putHistory = (email, value) =>new Promise((res, rej)=>
        docClient.update(setParams({
            Key: {email},
            ReturnValues: 'ALL_NEW',
            ExpressionAttributeNames: {
                '#history': 'history',
                '#key': value
            },
            ExpressionAttributeValues: {':history': new Date().toGMTString()},
            UpdateExpression: 'set #history.#key = :history'
        }), (err, data)=>!err && data.Attributes ? res(data.Attributes) : rej(err || {message: 'Not found'}))
    )

    const deleteHistory = (email, value)=>new Promise((res, rej)=>
        docClient.update(setParams({
            Key: {email},
            ReturnValues: 'ALL_NEW',
            ExpressionAttributeNames: {
                '#history': 'history',
                '#key': value
            },
            UpdateExpression: 'REMOVE #history.#key'
        }), (err, data)=>!err && data.Attributes ? res(data.Attributes) : rej(err || {message: 'Not found'}))
    )
    
    const putLocation = (email, value) =>new Promise((res, rej)=>
        docClient.update(setParams({
            Key: {email},
            ReturnValues: 'ALL_NEW',
            ExpressionAttributeNames: {
                '#locations': 'locations',
                '#key': value
            },
            ExpressionAttributeValues: {':location': value},
            UpdateExpression: 'set #locations.#key = :location'
        }), (err, data)=>!err && data.Attributes ? res(data.Attributes) : rej(err || {message: 'Not found'}))
    )

    const deleteLocation = (email, value) =>
    putHistory(email, value)
    .then(history=>new Promise((res, rej)=>
        docClient.update(setParams({
            Key: {email},
            ReturnValues: 'ALL_NEW',
            ExpressionAttributeNames: {
                '#locations': 'locations',
                '#key': value
            },
            UpdateExpression: 'REMOVE #locations.#key'
        }), (err, data)=>!err && data.Attributes ? res(data.Attributes) : rej(err || {message: 'Not found'}))
    ))

    return {
        get,
        deleteLocation,
        putLocation,
        deleteHistory,
        create: (email, password)=>new Promise((res, rej)=>
            get(email)
            .then(_=>rej({message: "already exist"}))
            .catch(e=>e)
            .then(_=>docClient.put(setParams({
                Item:{email, password, locations:{}, history:{}}
            }), (err, user)=>!err ? res(user) : rej(err)))
        ),
        getLocationIds: email=>get(email).then(user=>Object({
            locations: user.locations,
            history: user.history
        }))
    }
}