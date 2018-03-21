var request = require('request');

// get Date for logs
function GetDate() {               
    var date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

// same format logs
function MakeLog(text,req){
	console.log(GetDate()+">"+text);
}

var complete = 0;

function loadTest(size) {
    MakeLog("Test started for " + size + " requests.");
    for (var i = 0; i < size; i++)
        request.post(
            'http://192.168.0.189:8081/authorization',
            { json: { login: "test", password: "12345678" } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     if (++complete === size)
                         MakeLog("Test finished.");
                }
            }
        );
}

function dexterityTestPRIVATE(time){
	request.post(
        'http://192.168.0.189:8081/authorization',
        { json: { login: "test", password: "12345678" } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                complete++;
                if (new Date().getTime() - start >= time) {
                    MakeLog("Test Complete: " + complete);
                } else
                    dexterityTestPRIVATE(time);
            }
        }
    );
}

function dexterityTest(time) {
    MakeLog("Test Started");
    start = new Date().getTime();
    dexterityTestPRIVATE(time);
}

//dex test 
dexterityTest(300000);

//load test
//loadTest(1500);
