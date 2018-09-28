const path = require('path')
    , tags = require('./tags')

const projects = createImageLinks([{
    title: "Master thesis",
    desc: ", sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Master%20thesis",
    tags: [tags.javaScript, tags.nodeJs, tags.meteor, tags.sails, tags.bootstrap, tags.mongodb, tags.html, tags.css]
}, {
    title: "Resume",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/resume",
    tags: [tags.javaScript, tags.nodeJs, tags.bootstrap, tags.sass, tags.html, tags.css]
}, {
    title: "Task manager",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/Task%20manager",
    tags: [tags.javaScript, tags.nodeJs, tags.angular, tags.react, tags.html, tags.css, tags.mongodb]
}, {
    title: "Broken link checker",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/brokenLinkChecker",
    tags: [tags.javaScript, tags.nodeJs]
}, {
    title: "WebSync chat",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/chat",
    tags: [tags.javaScript, tags.nodeJs, tags.angular, tags.html, tags.sass, tags.cSharp]
}, {
    title: "Face recognition",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://github.com/Arogancki/nodeJS_repo/tree/master/faceRecognition",
    tags: [tags.javaScript]
}, {
    title: "My npm avid account",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://www.npmjs.com/~artur.ziemba.avid",
    tags: [tags.npm, tags.javaScript]
}, {
    title: "My npm private account",
    desc: "sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod em .",
    github: "https://www.npmjs.com/~arogancki",
    tags: [tags.npm, tags.javaScript]
}])

function createImageLinks(obj){
    obj.forEach((v)=>v.img = path.join('/', 'images', 'projects', `${v.title.toLowerCase()}.png`))
    return obj
}

(function checkIfAllTagsAreUsed(){
    Object.values(tags).forEach(tag=>{
        if (!projects.find(project=>project.tags.includes(tag)))
            throw new Error(`Tag ${tag} is not used!!`)
    })
})()

module.exports = Object.freeze(projects)