module.exports = {
    string2Int: s => +s,
    toBoleanOrString: s=> { 
        s = s.toLowerCase ? s.toLowerCase() : s
        if (typeof s === typeof true) {
            return s
        }
        return s==='true'?true:s==='false'?false:s
    },
    toLower: s => String(s).toLowerCase()
}