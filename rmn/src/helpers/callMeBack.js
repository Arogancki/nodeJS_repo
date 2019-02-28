const rp = require('request-promise')
    , config = require('../config')

module.exports = {
    put: ({route, method, sec, body}) => rp({
        method: 'PUT',
        uri: config.CMB_SERVICE_ADDRESS,
        json: true,
        body: {
            uri: `${config.SERVER_PUBLIC_ADDRESS}${route}`,
            method,
            sec,
            body,
            retry: {
                gap: 20,
                times: 10
            }
        }
    }),
    delete: (id, token) => rp({
        method: 'delete',
        uri: config.CMB_SERVICE_ADDRESS,
        json: true,
        body: {
            token, 
            id
        }
    }),
}