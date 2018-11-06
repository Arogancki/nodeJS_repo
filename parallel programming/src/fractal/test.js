const { generateFractalParallel, generateFractal} = require('./index')
    , { exists, remove } = require('fs-extra')
    
async function ifExists(file){
	if (await exists(file)){
		remove(file)
		return true
	}
	return false
}
	
generateFractal(500, 500, 'fr1')
.then(({file})=>ifExists(file))
.then(exists=>console.log('generateFractal:', 
    exists ? 'passed' : 'failed')
)
.catch(e=>console.error(e.stack || e.message))

generateFractal(500, 500, 'fr2', 4)
.then(({file})=>ifExists(file))
.then(exists=>console.log('generateFractalParallel:', 
    exists ? 'passed' : 'failed')
)
.catch(e=>console.error(e.stack || e.message))
