const path = require('path')

let experience = createImageLinks([{
    short: "tieto",
    name: "Tieto Poland",
    from: "9.2016",
    to: "08.2017",
    title: "Junior Software Developer",
    desc: "Sed ut perspiciatut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit is unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://campaigns.tieto.com/Poland"
},
{
    short: "avid",
    name: "AVID TECHNOLOGY POLAND",
    from: "08.2017",
    to: "06.2018",
    title: "Junior Software Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://www.avid.com/"
},
{
    short: "apptimia",
    name: "Apptimia",
    from: "06.2018",
    title: "Software Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://www.apptimia.com/"
},
{
    short: "zut1",
    name: "The West Pomeranian University of Technology",
    from: "10.2014",
    to: "01.2018",
    title: "Engineer's degree - Computer Science and Information Technology",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://www.wi.zut.edu.pl/pl/"
},
{
    short: "zut2",
    name: "The West Pomeranian University of Technology",
    from: "03.2018",
    title: "Master of science - Software Engineering",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspic perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://www.wi.zut.edu.pl/pl/"
}])

function createImageLinks(obj){
    obj.forEach((v)=>
        v.img = path.join('/', 'images', 'experience', `${v.short.toLowerCase().replace(/[0-9]*$/g, '')}.png`))
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