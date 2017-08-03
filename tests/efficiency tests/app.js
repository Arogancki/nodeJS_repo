var request = require('request');

var testNumber = 15;
var users = 200; //3000
var boards = 10; //30
var tasks = 7; //25
var comments = 4 //10

// get Date for logs
function GetDate() {               
    var date = new Date();
    return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + date.getDate()).slice(-2)].join("-") + " " + [("0" + date.getHours()).slice(-2), ("0" + date.getMinutes()).slice(-2), ("0" + date.getSeconds()).slice(-2), ("0" + date.getMilliseconds()).slice(-2)].join(':');
}

// same format logs
function MakeLog(text,req){
	console.log(GetDate()+">"+text);
}

function SendRequest(path, json) {
    MakeLog("Started " + path);
    request.post('http://192.168.0.189:8081/' + path, { json: json },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                MakeLog("Finished " + path);
            }
        }
    );
}

function AddLoad(){
	MakeLog("Adding load started\nregistration");
	user=0;
	AddLoadPrivate('registration');
}

function AddLoadPrivate(path) {
	var json = {};
	if (path == 'registration'){
		json = { login: testNumber+"testUser" + user, password: "12345678", password2: "12345678", email: "" };
	}
	else if (path == 'CreateNewBoard'){
		json = { login: testNumber+"testUser" + user, password: "12345678", board: "board"+board };
	}
	else if (path == 'CreateNewTask'){
		json = {
                    login: testNumber + "testUser" + user, password: "12345678", board: "board" + board, owner: testNumber + "testUser" + user,
                    task: "task" + task, info: "New issue"
                };
	}
	else if (path == 'AddStatus'){
		json = {
                    login: testNumber + "testUser" + user, password: "12345678", board: "board" + board, owner: testNumber + "testUser" + user,
                    task: "task" + task, info: "Status" + info, type: 'In progress'
		};
	}
    request.post('http://192.168.0.189:8081/' + path, { json: json },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
				if (path == 'registration'){
					user++;
					if (user<users){
						user++;
						AddLoadPrivate('registration');
					}
					else{
						user=0;
						board=0;
						MakeLog("CreateNewBoard");
						AddLoadPrivate('CreateNewBoard');
					}
				}
				else if (path == 'CreateNewBoard'){
					board++;
					if (board<boards){
						AddLoadPrivate('CreateNewBoard');  
					}
					else{
						user++;
						if (user<users){
							board=0;
							MakeLog("User= "+user);
							AddLoadPrivate('CreateNewBoard');
						}
						else{
							user=0;
							board=0;
							task=0;
							MakeLog("CreateNewTask");
							AddLoadPrivate('CreateNewTask');  
						}
					}
				}
				else if (path == 'CreateNewTask'){
					task++;
					if (task<tasks){
						AddLoadPrivate('CreateNewTask'); 
					}
					else{
						board++;
						if (board<boards){
								task=0;
								AddLoadPrivate('CreateNewTask');
							}
							else{
								user++;
								if (user<users){
									task=0;
									board=0;
									MakeLog("User= "+user);
									AddLoadPrivate('CreateNewTask');
								}
							else{
								user=0;
								board=0;
								task=0;
								info=0;
								MakeLog("AddStatus");
								AddLoadPrivate('AddStatus');
							}
						}
					}
				}
				else if (path == 'AddStatus'){
					info++;
					if (info<comments){
						AddLoadPrivate('AddStatus');
					}
					else{
						task++;
						if (task<tasks){
							info=0;
							AddLoadPrivate('AddStatus'); 
						}
						else{
							board++;
							if (board<boards){
								info=0;
								task=0;
								AddLoadPrivate('AddStatus');
							}
							else{
								user++;
								if (user<users){
									info=0;
									task=0;
									board=0;
									MakeLog("User= "+user);
									AddLoadPrivate('AddStatus');
								}
								MakeLog("Adding load finished");
							}
						}
					}
				}
            }
        }
    );
}

function authorization() {
    json = { login: testNumber+"testUser0", password: "12345678" };
    SendRequest("authorization", json);
}

function getBoardsAndInvitations() {
    json = { login: testNumber + "testUser0", password: "12345678" };
    SendRequest("getBoardsAndInvitations", json);
}

function CreateNewBoard() {
    json = { login: testNumber + "testUser0", password: "12345678", board: "boardX" + Math.random() };
    SendRequest("CreateNewBoard", json);
}

function CreateNewTask() {
   json = { login: testNumber + "testUser0", password: "12345678", board: "board0", owner: testNumber + "testUser0", task: "TaskX" + Math.random(), info:"NewX" };
    SendRequest("CreateNewTask", json);
}

function AddStatus() {
    json = { login: testNumber + "testUser0", password: "12345678", board: "board0", owner: testNumber + "testUser0", task: "task0", info: "paddingX" + + Math.random(), type:'In progress' };
    SendRequest("AddStatus", json);
}

//AddLoad();

//authorization();
//getBoardsAndInvitations();
//CreateNewBoard();
//CreateNewTask();
//AddStatus();
