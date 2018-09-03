function consoleLog(...v){
    if (process.env.LOG==='true')
        console.log(...v)
}

function getDate() {
    let date = new Date()
    return [date.getFullYear(), 
        ("0" + (date.getMonth() + 1)).slice(-2), 
        ("0" + date.getDate()).slice(-2)].join("-") 
        + " " + 
        [("0" + date.getHours()).slice(-2), 
        ("0" + date.getMinutes()).slice(-2), 
        ("0" + date.getSeconds()).slice(-2), 
        ("0" + date.getMilliseconds()).slice(-2)].join(':')
}

module.exports = function logger(...v) {
    consoleLog(getDate(), ...v)
}