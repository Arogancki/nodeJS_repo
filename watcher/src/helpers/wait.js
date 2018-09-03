module.exports = async function wait(time){
    time = time < 0 ? 0 : time
    return new Promise(r=>setTimeout(r, time))
}