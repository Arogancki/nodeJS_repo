const log = require('./helpers/log')

module.exports = {
    squareService: {
        squarePort: {
            calculate: function(args) {
                log.trace("calculate runing with", args)
                const response = args.number * args.number
                log.trace("calculate finished with", response)
                return {response}
            }
        }
    }
};