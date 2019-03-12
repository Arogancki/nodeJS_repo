const crypto = require('./helpers/crypto')
    , log = require('./helpers/log')

module.exports = {
    cryptoService: {
        cryptoPort: {
            decipher: function(args) {
                log.trace("decipher runing with ", args)
                const response = crypto.decipher(args.coded, args.password, args.algorithm)
                log.trace("decipher finished with ", response)
                return {response}
            },   
            cipher: function(args) {
                log.trace("cipher runing with ", args)
                const response = crypto.cipher(args.text, args.password, args.algorithm)
                log.trace("cipher finished with ", response)
                return {response}
            },
            getAlgorithms: function(args) {
                log.trace("getAlgorithms runing", args)
                const algorithms = crypto.algorithms.join(', ')
                log.trace("getAlgorithms finished with ", algorithms)
                return {algorithms}
            }
        }
    }
};