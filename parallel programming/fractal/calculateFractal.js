const { create2DArray } = require('../helpers')
    , iMax = 200
    , er = 4.0 //EscapeRadius
    , black = rgbToHex(255, 255, 255)
    , white = rgbToHex(0, 0, 0)

function rgbToHex(r, g, b, a) {
    r=(r-255)*-1
    g=(g-255)*-1
    b=(b-255)*-1
    const cToH = c => {
        const hex = c.toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }
    return parseInt(`${cToH(r)}${cToH(g)}${cToH(b)}${cToH(a||255)}`, 16)
}

module.exports = function calculateFractal(data){
    let cY, cX, cXMin=-2.5, cXMax=1.5, cYMin=-2.0, cYMax=2.0, 
    pixelWidth=(cXMax-cXMin)/data.width, pixelHeight=(cYMax-cYMin)/data.height
    const chunk = Math.ceil(data.height/data.threads)
    const start = data.id*chunk 
    let end = data.id*chunk + chunk
    end = end > data.height ? data.height : end
    const colors = create2DArray(end-start, data.width)
    let r=0
    for (let y=start; y<end; y++){
        cY=cYMin + y*pixelHeight
        if (Math.abs(cY) < pixelHeight/2)
            cY=0.0
        for (let x=0; x<data.width; x++){
            let cX = cXMin + x * pixelWidth, zX=data.centerX, zY=data.centerY, 
            zX2=zX*zX, zY2=zY*zY, i
            for (i=0; i<iMax && (zX2+zY2<er);i++){
                zY=2*zX*zY + cY
                zX=zX2 - zY2 + cX
                zX2=zX*zX
                zY2=zY*zY
            }
            colors[r][x] = i===iMax ? black : white
        }
        r++
    }
    return colors
}