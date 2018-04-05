Function.prototype.bind2 = function bind(caller) {
    fun = this;
    return function binded(...args){
        return fun.apply(caller, args)
    }
}

Function.prototype.bind3 = function bind(caller) {
    return (...args) => this.apply(caller, args)
}

let obj = {
    a:1
}

function log(b,c){
    console.log(this.a, b, c)
}

log.bind(obj)(2,3)
log.bind2(obj)(2,3)
log.bind3(obj)(2,3)