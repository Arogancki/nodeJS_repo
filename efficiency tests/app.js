var request = require('request');

var testNumber = 14;
var users = 100;
var boards = 10;
var task = 7;
var comments = 4;

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

function SendRequest(path, json, done) {
    if (done !== undefined) {
        MakeLog("Started " + done);
        request.post('http://192.168.0.189:8081/' + path, { json: json },
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    MakeLog("Finished " + done);
                }
            }
        );
    }
    else
        request.post('http://192.168.0.189:8081/' + path, { json: json });
}

function AddUsers() {
    for (var i = 0; i < users; i++) {
        json = { login: testNumber+"testUser" + i, password: "12345678", password2: "12345678", email: "" };
        SendRequest('registration', json);
    }
}

function AddBoards() {
    for (var j = 0; j < users; j++)
        for (var i = 0; i < boards; i++)
                {
                    json = { login: testNumber+"testUser" + j, password: "12345678", board: "board"+i };
                    SendRequest('CreateNewBoard', json);
                }
}

function AddTasks() {
    for (var j = 0; j < 100; j++)
        for (var i = 0; i < boards; i++)
            for (var k = 0; k < task; k++) {
                json = {
                    login: testNumber + "testUser" + j, password: "12345678", board: "board" + i, owner: testNumber + "testUser" + j,
                    task: "task" + k, info: "New issue"
                };
                SendRequest('CreateNewTask', json);
            }
}

function AddInfos() {
    for (var j = 0; j < users; j++)
        for (var i = 0; i < boards; i++)
            for (var k = 0; k < task; k++)
                for (var l = 0; l < comments; l++){
                    json = {
                        login: testNumber + "testUser" + j, password: "12345678", board: "board" + i, owner: testNumber + "testUser" + j,
                        task: "task" + k, info: "Status" + l, type: 'In progress'};
                    SendRequest('AddStatus', json);
                }
}

function authorization() {
    json = { login: testNumber+"testUser0", password: "12345678" };
    SendRequest("authorization", json, "authorization");
}

function getBoardsAndInvitations() {
    json = { login: testNumber + "testUser0", password: "12345678" };
    SendRequest("getBoardsAndInvitations", json, "getBoardsAndInvitations");
}

function CreateNewBoard() {
    json = { login: testNumber + "testUser0", password: "12345678", board: "boardX" + Math.random() };
    SendRequest("CreateNewBoard", json, "CreateNewBoard");
}

function CreateNewTask() {
   json = { login: testNumber + "testUser0", password: "12345678", board: "board0", owner: testNumber + "testUser0", task: "TaskX" + Math.random() ,info:"newX" };
    SendRequest("CreateNewTask", json, "CreateNewTask");
}

function AddStatus() {
    json = { login: testNumber + "testUser0", password: "12345678", board: "board0", owner: testNumber + "testUser0", task: "task0", info: "padding", type:'In progress' };
    SendRequest("AddStatus", json, "AddStatus");
}

//AddUsers();
//AddBoards();
AddTasks();
//AddInfos();

//authorization();
//getBoardsAndInvitations();
//CreateNewBoard();
//CreateNewTask();
//AddStatus();