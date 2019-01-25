const tags = sort({
    javaScript: "javaScript",
    java: "java",
    cSharp: "cSharp",
    nodeJs: "nodeJS",
    meteor: "meteor",
    sails: "sails",
    bootstrap: "bootstrap",
    sass: "sass",
    oop: "object oriented programing",
    react: "react",
    angular: "angular",
    mongodb: "mongoDB",
    html: "HTML",
    css: "CSS",
    npm: "npm",
    express: "express",
    typeScript: "typeScript",
    matlab: "matlab",
    algorithms: "algorithms",
    openGl: "openGL",
    cpp: "C++",
    c: "c",
    bash: "bash",
    spring: "spring",
    networking: "networking",
    sql: "SQL",
    python: "python",
    machineLearning: "machine learning",
    bigData: "big data",
    dynamodb: "dynamoDB"
})

function sort(obj){
    const sortable = []
    for (const o in obj) {
        sortable.push([obj[o], o])
    }
    
    sortable.sort((e1, e2)=>{
        e1 = e1[0].toLowerCase()
        e2 = e2[0].toLowerCase()
        if(e1 < e2) return -1
        if(e1 > e2) return 1
        return 0
    })
    
    const sorted = {}
    for (const e of sortable){
        sorted[e[1]] = e[0]
    }

    return sorted
}

module.exports = Object.freeze(new Proxy(tags, { 
    get(target, name){
        return target[name] || (()=>{throw new Error(`Property '${name}' is not defined`)})()
    }
}))