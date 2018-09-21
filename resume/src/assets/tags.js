const tags = sort({
    javaScript: "javaScript",
    java: "java",
    cSharp: "cSharp",
    nodeJs: "nodeJS",
    oop: "object oriented programing"
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

module.exports = Object.freeze(tags)