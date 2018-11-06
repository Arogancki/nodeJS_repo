const Jimp = require('Jimp')
    , { join } = require('path')
    ,{ performance } = require('perf_hooks')
    , threads = require('../threads')
    , calculateFractal = require('./calculateFractal')

const createPNG = (width, height)=>new Promise((res, rej)=>
    new Jimp(width, height, (err, image)=>!err?res(image):rej(err))
)

async function saveToFile(colors, file){
    file+='.png'
    const image = await createPNG(colors[0].length, colors.length)
    colors.forEach((row, y) => 
        row.forEach((color, x) => {
          image.setPixelColor(color, x, y)
        })
    )
    return new Promise((res, rej)=>
        image.write(file, err=>!err?res(file):rej(err))
    )
}

async function generateFractal(width, height, file, threadsNum){
    if (threadsNum>1){
        return generateFractalParallel(width, height, file, threadsNum)
    }
    const t0 = performance.now()
    const colors = calculateFractal({width, height, threads: 1, id: 0})
    const time = performance.now() - t0
    return { 
        colors, 
        time, 
        file: file ? await saveToFile(colors, file) : null
    }
}

async function generateFractalParallel(width, height, file, threadsNum){
    const t0 = performance.now()
    let colors = (await threads.parallel({
        data: {width, height},
        threads: threadsNum,
        pathToScript: join(__dirname, './calculateFractal.js')
    }))
    const time = performance.now() - t0
    colors = colors.reduce((a, v)=>[...a, ...v], [])
    return { 
        colors, 
        time, 
        file: file ? await saveToFile(colors, file) : null
    }
}

exports.generateFractal = generateFractal