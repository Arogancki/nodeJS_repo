module.exports = {
    hide: hide,
    unhide: unhide,
    hideByKey: hideByKey,
    unhideByKey: unhideByKey,
    hideByVal: hideByVal,
    unhideByVal: unhideByVal
};

function hide(obj, ...keysOrVals){
    if (keysOrVals.length === 0)
        return hideByKey(obj, ...Object.keys(obj));
    hideByKey(obj, ...keysOrVals);
    hideByVal(obj, ...keysOrVals);
    return obj;
}

function hideByKey(obj, ...keys){
    for (let el in obj){
        if (typeof obj[el] === 'object')
            hideByKey(obj[el], ...keys);
        if (~keys.indexOf(el)){
            let desc = Object.getOwnPropertyDescriptor(obj, el);
            Object.defineProperty(obj, el, {
                value: {
                    hidden: true,
                    value: desc.value
                },
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: false
            });
        }
    }
    return obj;
}

function hideByVal(obj, ...vals){
    for (let el in obj){
        if (typeof obj[el] === 'object')
            hideByVal(obj[el], ...vals);
        if(~vals.indexOf(obj[el])){
            let desc = Object.getOwnPropertyDescriptor(obj, el);
            Object.defineProperty(obj, el, {
                value: {
                    hidden: true,
                    value: desc.value
                },
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: false
            });
        }
    }
    return obj;
}

function unhide(obj, ...keysOrVals){
    if (keysOrVals.length === 0)
        return unhideByKey(obj, ...Object.getOwnPropertyNames(obj));
    unhideByKey(obj, ...keysOrVals);
    unhideByVal(obj, ...keysOrVals);
    return obj;
}

function unhideByKey(obj, ...keys){
    for (let el of Object.getOwnPropertyNames(obj)){
        if (typeof obj[el] === 'object')
            unhideByKey(obj[el], ...keys);
        if (~keys.indexOf(el) && obj[el].hidden){
            let desc = Object.getOwnPropertyDescriptor(obj, el);
            Object.defineProperty(obj, el, {
                value: {
                    hidden: true,
                    value: desc.value.value
                },
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: true
            });
        }
    }
    return obj;
}

function unhideByVal(obj, ...vals){
    for (let el of Object.getOwnPropertyNames(obj)){
        if (typeof obj[el] === 'object')
            unhideByVal(obj[el], ...vals);
        if(~vals.indexOf(obj[el].value) && obj[el].hidden){
            let desc = Object.getOwnPropertyDescriptor(obj, el);
            Object.defineProperty(obj, el, {
                value: {
                    hidden: true,
                    value: desc.value.value
                },
                writable: desc.writable,
                configurable: desc.configurable,
                enumerable: true
            });
        }
    }
    return obj;
}