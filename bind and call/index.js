Function.prototype.bind2 = function bind(caller) {
    fun = this;
    return function binded(...args){
        return fun.apply(caller, args)
    }
}

Function.prototype.bind3 = function bind(caller) {
    return (...args) => this.apply(caller, args)
}

Function.prototype.call2 = function call(caller, ...args){
    let funAllias = '_fun';
    while(caller[funAllias])
        funAllias = '_' + funAllias;
    return Object.assign({}, caller, {funAllias: this}).funAllias(...args);
}

let obj = {
    a:1
}

function log(b,c){
    console.log(this.a, b, c)
    return 0;
}

log.bind(obj)(2,3)
log.bind2(obj)(2,3)
log.bind3(obj)(2,3)

console.log(log.call(obj, 2, 3))
console.log(log.call2(obj, 2, 3))