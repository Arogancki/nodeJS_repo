const log = require('./src/helpers/log')
    , app = require('./src/app')

app()
.then(({wsdl, rest})=>{
    log.info(`Server wsdl is working`)
    log.info(`Server rest is working on ${rest.app.get("port")}`)
})
.catch(e=>
    process.env.NODE_ENV !== 'production'
    ? log.error(`${e.stack}`)
    : log.error(`${e.name}: ${e.message}`)
)