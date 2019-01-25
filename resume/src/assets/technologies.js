const path = require('path')

const technologies = createImageLinks({
    "technologies": [
        {
            "name": "matlab",
            "link": "https://www.mathworks.com/products/matlab.html"
        },
        {
            "name": "c++",
            "link": "https://en.wikipedia.org/wiki/C%2B%2B"
        },
        {
            "name": "java",
            "link": "https://en.wikipedia.org/wiki/Java_(programming_language)"
        },
        {
            "name": "spring",
            "link": "https://en.wikipedia.org/wiki/Spring_Framework"
        },
        {
            "name": "c#",
            "link": "https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/",
            "img": "/images/technologies/csharp.png"
        },
        {
            "name": "meteor",
            "link": "https://www.meteor.com/"
        },
        {
            "name": "sails",
            "link": "https://sailsjs.com/"
        },
        {
            "name": "angular",
            "link": "https://angularjs.org/"
        },
        {
            "name": "react",
            "link": "https://reactjs.org/"
        },
        {
            "name": "SQL",
            "link": "https://en.wikipedia.org/wiki/SQL"
        },
        {
            "name": "mongoDB",
            "link": "https://www.mongodb.com/"
        },
        {
            "name": "typeScript",
            "link": "https://www.typescriptlang.org/"
        },
        {
            "name": "bash",
            "link": "https://www.gnu.org/software/bash/"
        },
        {
            "name": "nodeJS",
            "link": "https://nodejs.org/"
        },
        {
            "name": "bootstrap",
            "link": "https://getbootstrap.com/"
        },
        {
            "name": "CSS",
            "link": "https://www.w3.org/Style/CSS/Overview.en.html"
        },
        {
            "name": "express",
            "link": "https://expressjs.com/"
        },
        {
            "name": "HTML",
            "link": "https://www.w3.org/html/"
        },
        {
            "name": "javaScript",
            "link": "https://www.javascript.com/"
        },
        {
            "name": "SASS",
            "link": "https://sass-lang.com/"
        },
        {
            "name": "graphQL",
            "link": "https://graphql.org/"
        }
    ],
    "tools": [
        {
            "name": "postman",
            "link": "https://www.getpostman.com/"
        },
        {
            "name": "Visual Studio",
            "link": "https://visualstudio.microsoft.com/pl/"
        },
        {
            "name": "chrome DevTools",
            "link": "https://developers.google.com/web/tools/chrome-devtools/"
        },
        {
            "name": "slack",
            "link": "https://slack.com"
        },
        {
            "name": "nginx",
            "link": "https://www.nginx.com/"
        },
        {
            "name": "webpack",
            "link": "https://webpack.js.org/"
        },
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
        },
        {
            "name": "crucible",
            "link": "https://www.atlassian.com/software/crucible"
        },
        {
            "name": "amazon Web Services",
            "link": "https://aws.amazon.com/"
        },
        {
            "name": "bamboo",
            "link": "https://www.atlassian.com/software/bamboo"
        }
    ],
    "skils": [
        {
            "name": "agile methodology",
            "link": "http://agilemanifesto.org/"
        },
        {
           "name": "machine learning",
           "link":  "https://en.wikipedia.org/wiki/Machine_learning"
        },
        {
            "name": "design patterns",
            "link": "https://refactoring.guru/design-patterns"
        },
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
            "name": "gitflow", 
            "link": "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow"
        },
        {
            "name": "team worker"
        },
        {
            "name": "willingness to learn"
        },
        {
            "name": "good grasping ability"
        },
        {
            "name": "performance and scalability optimization"
        },
        {
            "name": "strong decision making"
        },
        {
            "name": "efficient data management"
        }

    ]
})

function createImageLinks(obj){
    Object.keys(obj).forEach(type=>obj[type].forEach((v, i)=>{
            v.img = v.img || path.join('/', 'images', type, `${v.name.toLowerCase()}.png`)
        }
    ))
    return obj
}

Object.defineProperty(technologies, 'sort', { 
    value: ['technologies', 'tools', 'skils'], 
    enumerable: false 
})

Object.defineProperty(technologies, 'icons', {
    value: {
        technologies: "whatshot",
        tools: "build",
        skils: "accessibility_new",
    },
    enumerable: false 
})

Object.keys(technologies)
    .forEach(key=>technologies[key]
        .sort((e1,e2)=>(e1.name.toLowerCase() > e2.name.toLowerCase())*2-1))

module.exports = Object.freeze(technologies)