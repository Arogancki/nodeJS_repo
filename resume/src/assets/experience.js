const path = require('path')

function createImageLinks(obj){
    obj.forEach((v)=>v.img = path.join('/', 'images', 'experience', `${v.short}.png`))
    return obj
}

let experience = createImageLinks([{
    short: "tieto",
    name: "Tieto Poland",
    from: "10.2016",
    to: "08.2017",
    title: "Junior Software Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://campaigns.tieto.com/Poland"
},
{
    short: "tieto",
    name: "Tieto Poland",
    from: "10.2016",
    to: "08.2017",
    title: "Junior Software Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://campaigns.tieto.com/Poland"
},
{
    short: "tieto",
    name: "Tieto Poland",
    from: "10.2016",
    title: "Junior Software Developer",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    link: "https://campaigns.tieto.com/Poland"
}])

module.exports = Object.freeze(experience)