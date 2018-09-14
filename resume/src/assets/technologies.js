const path = require('path')

function createImageLinks(obj){
    Object.keys(obj).forEach(type=>obj[type].forEach((v, i)=>{
            v.img = path.join('/', 'images', type, `${v.name}.png`)
        }
    ))
    return obj
}

const technologies = createImageLinks({
    "technologies": [
        {
            "name": "nodejs",
            "link": "https://nodejs.org/"
        },
        {
            "name": "bootstrap",
            "link": "https://getbootstrap.com/"
        },
        {
            "name": "css",
            "link": "https://www.w3.org/Style/CSS/Overview.en.html"
        },
        {
            "name": "express",
            "link": "https://expressjs.com/"
        },
        {
            "name": "html",
            "link": "https://www.w3.org/html/"
        },
        {
            "name": "javascript",
            "link": "https://www.javascript.com/"
        },
        {
            "name": "sass",
            "link": "https://sass-lang.com/"
        }
    ],
    "tools": [
        {
            "name": "git",
            "link": "https://git-scm.com/"
        },
        {
            "name": "jira",
            "link": "https://www.atlassian.com/software/jira"
        },
        {
            "name": "confluence",
            "link": "https://www.atlassian.com/software/confluence"
        },
        {
            "name": "jenkins",
            "link": "https://jenkins.io/"
        },
        {
            "name": "docker",
            "link": "https://www.docker.com/"
        },
        {
            "name": "linux",
            "link": "https://www.linux.org/"
        },
        {
            "name": "VS code",
            "link": "https://code.visualstudio.com/"
        },
        {
            "name": "intelliJ IDEA",
            "link": "https://www.jetbrains.com/idea/"
        }
    ],
    "skils": [
        {
            "name": "object oriented programing",
            "link": "https://en.wikipedia.org/wiki/Object-oriented_programming"
        },
        {
            "name": "parallel programing",
            "link": "https://en.wikipedia.org/wiki/Parallel_computing"
        },
        {
            "name": "data structures and algorithm knowledge",
            "link": "https://en.wikipedia.org/wiki/Data_structure"
        },
        {
            "name": "team worker"
        },
        {
            "name": "willingness to learn"
        },
        {
            "name": "good grasping ability"
        }
    ]
})

Object.defineProperty(technologies, 'sort', { 
    value: ['technologies', 'tools', 'skils'], 
    enumerable: false 
})

module.exports = Object.freeze(technologies)