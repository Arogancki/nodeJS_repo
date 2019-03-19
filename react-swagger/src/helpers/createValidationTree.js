import merge from './merge'

function createValidationTree(validations=[]){
    if (!Array.isArray(validations)){
        throw new Error('Invalid validation structure')
    }
    const treeBranches = validations.map(validation=>{
        if (!Array.isArray(validation.path) || validation.path.length===0){
            return {
                [validation.name]: validation.severityLabel==='error'
                ? {
                    warns: 0,
                    errors: 1,
                    error: validation.message
                }
                : {
                    warns: 1,
                    errors: 0,
                    warn: validation.message
                }
            }
        }
        const leaf = validation.path.pop()
        return validation.path.reverse().reduce((children, path)=>{
                const childrenKeys = Object.keys(children)
                return {
                    [path]: {
                        warns: childrenKeys.reduce((reduced,key)=>reduced+children[key].warns, 0),
                        errors:  childrenKeys.reduce((reduced,key)=>reduced+children[key].errors, 0),
                        children: children
                    }
                }
            }, {
                [leaf]: validation.severityLabel==='error'
                ? {
                    warns: 0,
                    errors: 1,
                    error: validation.message
                }
                : {
                    warns: 1,
                    errors: 0,
                    warn: validation.message
                }
            })
    })
    return merge(...treeBranches)
}

export default createValidationTree