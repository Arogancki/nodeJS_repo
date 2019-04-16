//const log = require('./src/helpers/log')
  //  , app = require('./src/app')
/*
app()
.then(({wsdl, rest})=>{
    log.info(`Server wsdl is working`)
    log.info(`Server rest is working on ${rest.app.get("port")}`)
})
.catch(e=>
    process.env.NODE_ENV !== 'production'
    ? log.error(`${e.stack}`)
    : log.error(`${e.name}: ${e.message}`)
)*/

const http = require('http')
    , soap = require('soap')
    , wsdlFile = require('fs').readFileSync('./service.wsdl', 'utf8')
    , crypto = require('./crypto')

    ;(async ()=>soap.listen(await new Promise(async r=>{
        const server = http.createServer((req, res)=>res.end('404: Not Found')).listen(8082, ()=>r(server))
    }), '/crypto', {
        cryptoService: {
            cryptoPort: {
                decipher: (args)=>{
                    console.log("decipher runing with ", args)
                    const response = crypto.decipher(args.coded, args.password, args.algorithm)
                    console.log("decipher finished with ", response)
                    return {response}
                },   
                cipher: (args)=>{
                    console.log("cipher runing with ", args)
                    const response = crypto.cipher(args.text, args.password, args.algorithm)
                    console.log("cipher finished with ", response)
                    return {response}
                },
                getAlgorithms: (args)=>{
                    console.log("getAlgorithms runing", args)
                    const algorithms = crypto.algorithms.join(', ')
                    console.log("getAlgorithms finished with ", algorithms)
                    return {algorithms}
                }
            }
        }
    }, wsdlFile)
        
    )()