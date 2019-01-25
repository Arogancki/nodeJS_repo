const handleError = require('./src/helpers/handleError')
const { log } = require('./src/helpers/log')
require('./src/app')()
.then(exp=>
    log(`Server is working on (${exp.protocol}) port ${exp.server.address().port}`)
)
.catch(e=>
    handleError(e)
)