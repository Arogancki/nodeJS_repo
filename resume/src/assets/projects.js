const path = require('path')
    , tags = require('./tags')

const projects = createImageLinks([{
    title: "example Project",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm",
    tags: [tags.javaScript, tags.nodeJs, tags.oop, tags.cSharp]
},
{
    title: "example Project",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/data-structures-and-algorithm",
    tags: [tags.java],
}])

function createImageLinks(obj){
    obj.forEach((v)=>v.img = path.join('/', 'images', 'projects', `${v.title}.png`))
    return obj
}

(function checkIfAllTagsAreUsed(){
    Object.values(tags).forEach(tag=>{
        if (!projects.find(project=>project.tags.includes(tag)))
            throw new Error(`Tag ${tag} is not used!!`)
    })
})()

module.exports = Object.freeze(projects)