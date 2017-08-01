var request = require('request');

// get Date for logs
function GetDate() {               
    var date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

// same format logs
function MakeLog(text,req){
	if (req!==undefined)
        console.log(GetDate() + ">" + req.ip +">"+text);
	else
		console.log(GetDate()+">"+text);
}

// test size
var size = 2;
var complete = [];
for (var i = 0; i < size; i++)
    complete[i] = false;

function check() {
    for (var i = 0; i < size; i++)
        if (complete[i] === false)
            return false;
    return true;
}

function SendRequest(id) {
    request.post(
        'http://192.168.0.189:8081/authorization',
        { json: { login: "test", password: "12345678" } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                complete[id] = true;
                if (check())
                    MakeLog("Test finished.");
            }
        }
    );
}

function Test() {
   // TODO
}
Test();