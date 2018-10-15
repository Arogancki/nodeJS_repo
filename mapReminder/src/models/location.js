module.exports = (docClient, name)=>{
    
    const setParams = params=>Object({
        TableName: name,
        ...params
    })

    // quick and dirty solution 
    // here should be call to a scheduled events
    const scheduleCall = (fun, time) => new Promise((res, rej)=>
        setTimeout(()=>
            Promise.resolve(fun())
            .then(res)
            .catch(rej)
        , time)
    )

    const get = id=>new Promise((res, rej)=>
        docClient.get(setParams({
            Key: {id}
        }), (err, data)=>!err && data.Item ? res(data.Item) : rej(err || {message: 'Not found'}))
    )
    
    const changeActive = (id, status)=>new Promise((res, rej)=>
        docClient.update(setParams({
            Key: {id},
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #active = :a',
            ExpressionAttributeValues: {':a': status},
            ExpressionAttributeNames: {
                '#active': 'active'
            }
        }), (err, data)=>!err && data.Attributes ? res(data.Attributes) : rej(err || {message: 'Not found'}))
    )

    return {
        get,
        putLocation: (name, description, latitude, longitude, tolerance, userEmail)=>{
            const id = (1*new Date())+userEmail
            const Item = {id, name, description, latitude, longitude, tolerance, userEmail, active: true};
            return new Promise((res, rej)=>
            docClient.put(setParams({Item}), (err, user)=>!err ? res(user) : rej(err)))
            .then(_=>Item)
        },
        snooze: (id, time, userEmail, unsnoozeCb)=>
            get(id)
            .then(loc=>{
                if (loc.userEmail!==userEmail ){
                    return Promise.reject({message: `Not found`})
                }
                scheduleCall(()=>changeActive(id, true), time)
                .then(data=>unsnoozeCb(null, data))
                .catch(err=>unsnoozeCb(err))
                return changeActive(id, false)
            }),
        deleteLocation: id=>new Promise((res, rej)=>
            docClient.delete(setParams({
                Key: {id}
            }), err=>!err ? res(id) : rej(err))
        ),
        getLocalizations: ids=>new Promise((res, rej)=>{
            return docClient.batchGet({
                RequestItems: {
                   [name]: {
                        Keys: ids.map(id=>Object({id}))
                    }
                }
            }, (err, data)=>!err ? res(data.Responses.maplocations) : rej(err))
        })
    }
}