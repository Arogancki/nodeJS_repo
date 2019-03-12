module.exports = (req, key, carrier) => {
    switch(typeof carrier){
        case typeof '':
            return req[carrier][key]
        case typeof {}:
            return carrier[key]
        default: 
            return req.body[key] || req.params[key] || req.query[key]
    }   
}