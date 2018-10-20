const { generateFractalParallel, generateFractal} = require('./index')
    , { exists } = require('fs-extra')
    
generateFractal(500, 500, 'fr1', 5, 5)
.then(({file})=>exists(file))
.then(exists=>console.log('generateFractal:', 
    exists ? 'passed' : 'failed')
)
.catch(e=>console.error(e.stack || e.message))

generateFractalParallel(500, 500, 4, 'fr2', 5, 5)
.then(({file})=>exists(file))
.then(exists=>console.log('generateFractalParallel:', 
    exists ? 'passed' : 'failed')
)
.catch(e=>console.error(e.stack || e.message))
