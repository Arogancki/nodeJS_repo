Function.prototype.bind2 = function bind(caller) {
    fun = this;
    return function binded(...args){
        return fun.apply(caller, args)
    }
}

Function.prototype.bind3 = function bind(caller) {
    return (...args) => this.apply(caller, args)
}

// naiv way - doesnt handle proto
Function.prototype.call2 = function call(caller, ...args){
    let funAllias = this.name;
    while(caller[funAllias]) funAllias = '_' + funAllias;
    return Object.assign({}, caller, {funAllias: this}).funAllias(...args);
}

// handles proto
Function.prototype.call3 = function call(caller, ...args){
    let self = this;
    let selfCall = false;
    return new Proxy(caller, { get(target,name) {
        return selfCall ? target[name] : selfCall=self
    }})[selfCall](...args);
}


let obj = {
    a:1
}

function log(b,c){
    console.log(this.a, b, c)
    return 0;
}

console.log(log.bind(obj)(2,3))
console.log(log.bind2(obj)(2,3))
console.log(log.bind3(obj)(2,3))

console.log(log.call(obj, 2, 3))
console.log(log.call2(obj, 2, 3))
console.log(log.call3(obj, 2, 3))


/*
prototype tests for call3
let obj = {
    a:1,
    log: (b,c)=>{
        console.log('Pure fun', this.a, b, c);
        return 2;
    }
}

Object.setPrototypeOf(obj, {
    log: (b,c)=>{
        console.log('Proto fun', this.a, b, c);
        return 1;
    }
})

let log = function (b,c){
    console.log('Base fun', this.a, b, c, this.log(22+b, 22+c), this.__proto__.log(10+b, 10+c));
    return 0;
}

console.log(log.call3(obj, 2, 3))
*/