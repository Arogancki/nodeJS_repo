const hp = require('http-parser-js')

process.binding('http_parser').HTTPParser = hp.HTTPParser;

const axios = require('axios')
    , request = require('request')
    , atob = require('atob')

const subscriptionKey = "6ac9848e296942c09ce5297591345c98";
process.binding('http_parser').HTTPParser = hp.HTTPParser;

function log(...d){
    console.log("recon :", d.join(' '));
}

function recon(binary){
    return axios({
        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect' + "?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=" +
        "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        method: 'post',
        headers: {
            "Content-Type": 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey
        },
        "data": binary
    }).then(res=> {
        if (res.status === 200) {
            log("Recognition successful");
            return Promise.resolve(res.data || [{}]);
        }
        return Promise.reject("Could not query a recon service");
    });
}

function base64ToArrayBuffer(base64) {
    var binary_string =  atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

module.exports = function reconImg(url){
    return new Promise((resolve, reject)=>{
        if (!url){
            reject("Missing url");
            return;
        }
        log('imagelink:', url);
        request({
            encoding: null,
            url: url,
        }, function (err, res, body) {
            if (!err && res.statusCode === 200){
                console.log('body', body);
                let base64prefix = 'data:' + res.headers['content-type'] + ';base64,';
                let image = body.toString('base64');
                resolve(recon(base64ToArrayBuffer(image)));
            } 
            else {
                reject(err);
            }
        });


    });
}