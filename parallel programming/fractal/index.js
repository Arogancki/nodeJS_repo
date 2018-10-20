const Jimp = require('Jimp')
    , { join } = require('path')

    , threads = require('../threads')
    , calculateFractal = require('./calculateFractal')

const createPNG = (width, height)=>new Promise((res, rej)=>
    new Jimp(width, height, (err, image)=>!err?res(image):rej(err))
)

async function saveToFile(colors, file){
    const image = await createPNG(colors[0].length, colors.length)
    colors.forEach((row, y) => 
        row.forEach((color, x) => {
          image.setPixelColor(color, x, y)
        })
    )
    return new Promise((res, rej)=>
        image.write(file, err=>!err?res({colors, file}):rej(err))
    )
}

async function generateFractal(width, height, file, centerX=0.0, centerY=0.0){
    const colors = calculateFractal({width, height, centerX, centerY, threads: 1, id: 0})
    if (file){
        return saveToFile(colors, file)
    }
    return { colors }
}

async function generateFractalParallel(width, height, threadsNum, file, centerX=0.0, centerY=0.0){
    const colors = (await threads.parallel({
        data: {width, height, centerX, centerY},
        threads: threadsNum,
        pathToScript: join(__dirname, './calculateFractal.js')
    })).reduce((a, v)=>[...a, ...v], [])
    if (file){
        return saveToFile(colors, file)
    }
    return { colors }
}

exports.generateFractal = generateFractal
exports.generateFractalParallel = generateFractalParallel