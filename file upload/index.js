var express = require('express')
var app = express()
var path = require('path')
var formidable = require('formidable')
var fs = require('fs')

var port = 3000

app.post('/upload', function(req, res){
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err); 
    });
    form.on('end', function() {
        res.end('File uploaded');
    });
    form.parse(req);
});

app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
