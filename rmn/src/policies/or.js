async function run(fun, req, res){
    if (typeof fun === typeof (()=>{})){
        return fun(req, res)
    }
    if (typeof fun === typeof []){
        for (f of fun){
            const err = await f(req, res)
            if (err){
                return err
            }
        }
    }
}

module.exports = (policies1, policies2) => async (req, res) => {
    const error1 = await run(policies1, req, res)
    const error2 = await run(policies2, req, res)
    if (error1 && error2){
        return error1
    }
}