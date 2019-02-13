const path = require('path')
    , fs = require('fs-extra')
    , config = require('../config')
    , { log } = require('../helpers/log')

let experience = createImageLinks([{
    short: "tieto",
    name: "Tieto Poland",
    from: "9.2016",
    to: "08.2017",
    title: "Junior Software Developer",
    desc: "Work in an embedded c/c++ project concerning software development for the leader of telecommunication solutions.",
    link: "https://campaigns.tieto.com/Poland"
},
{
    short: "avid",
    name: "Avid Technology Poland",
    from: "08.2017",
    to: "06.2018",
    title: "Software Developer",
    desc: "The main aim of my work was to develop the backend site as microservices and server site tools (node.js, java), and to develop the frontend site (react) for multimedia managing platform.",
    link: "https://www.avid.com/"
},
{
    short: "apptimia",
    name: "Apptimia",
    from: "06.2018",
    title: "Full stack developer",
    desc: "Currently, I work with different projects regarding the backend (node.js), as well as the frontend (angular, react).",
    link: "https://www.apptimia.com/"
},
{
    short: "zut1",
    name: "The West Pomeranian University of Technology",
    from: "10.2014",
    to: "01.2018",
    title: "Engineer's degree - Computer Science and Information Technology",
    desc: "The Engineer's degree studies on Computer Science and Information Technology during which I was fivefold awarded Rector’s scholarship for the best students and took the 3rd place in Szczecin Gamedev Talents competition. I finished writing the thesis about node.js environment and software development in javascript.",
    link: "https://www.wi.zut.edu.pl/pl/"
},
{
    short: "zut2",
    name: "The West Pomeranian University of Technology",
    from: "03.2018",
    title: "Master of science - Software Engineering",
    desc: "Follow up of my engineer studies as MA degree on Software Engineering during which I was threefold awarded Rector’s scholarship for the best students. My final thesis descibes comparison analysis of the most popular node.js frameworks.",
    link: "https://www.wi.zut.edu.pl/pl/"
}])

function createImageLinks(obj){
    obj.forEach((v)=>{
        v.img = path.join('/', 'images', 'experience', `${v.short.toLowerCase().replace(/[0-9]*$/g, '') + ".png"}`)
        fs.exists(path.join(config.APP_PUBLIC, v.img)).then(exists=>{
            if (!exists){
                log(`Img for experience "${v.short}" not found`)
            }
        })
    })
    return obj
}

module.exports = Object.freeze(experience.sort((e1, e2)=>{
    const d1 = e1.from.split('.').map(v=>1*v)
    const d2 = e2.from.split('.').map(v=>1*v)
    if (d1[1] > d2[1])
        return -1
    else if (d1[1] < d2[1])
        return 1
    return d2[0] - d1[0]
}))