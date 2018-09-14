let x = null

module.exports = x || (()=>{
    console.log('Witaj! Wyswietle sie raz, ale nie jestem singletonem :(')
    setTimeout(()=>console.log('OKLAMALEM CIE!! JESTEM PODLYM SINGLETONEM!!! X1 jest inna instancja!!'), 0)
    x = new Object()
    x.test = "Jestem z konstruktora"
    x.toString = ()=>x.test
    return x
})()