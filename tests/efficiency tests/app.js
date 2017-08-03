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

function DoTest(){
	MakeLog("Adding load started\nregistration");
	user=0;
	Test('registration');
}

function Test(path) {
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
				Test('registration');
			    }
			    else{
				    user=0;
				    board=0;
				    MakeLog("CreateNewBoard");
				    Test('CreateNewBoard');
			    }
		    }
		    else if (path == 'CreateNewBoard'){
			    board++;
			    if (board<boards){
			    	Test('CreateNewBoard');  
			    }
			    else{
				user++;
				if (user<users){
					board=0;
					MakeLog("User="+user);
					Test('CreateNewBoard');
			    	}
				else{
					user=0;
					board=0;
					task=0;
					MakeLog("CreateNewTask");
					Test('CreateNewTask');  
				}
			    }
		    }
		    else if (path == 'CreateNewTask'){
			    task++;
			    if (task<tasks){
				    Test('CreateNewTask'); 
			    }
			    else{
			    	board++;
				if (board<boards){
				    task=0;
			            Test('CreateNewTask');
			    	}
				else{
				    user++;
				    if (user<users){
					task=0;
				    	board=0;
					MakeLog("User="+user);
				    	Test('CreateNewTask');
			    	    }
				    else{
					user=0;
					board=0;
					task=0;
					info=0;
					MakeLog("AddStatus");
					Test('AddStatus');
				    }
				}
			    }
		    }
		    else if (path == 'AddStatus'){
			    info++;
			    if (info<comments){
			        Test('AddStatus');
			    }
			    else{
			        task++;
			    	if (task<tasks){
				    info=0;
				    Test('AddStatus'); 
			    	}
				else{
				    board++;
				    if (board<boards){
					info=0;
				    	task=0;
			            	Test('AddStatus');
			    	    }
				    else{
					user++;
				    	if (user<users){
				             info=0;
					     task=0;
				    	     board=0;
					     MakeLog("User="+user);
				    	     Test('AddStatus');
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

//DoTest();

//authorization();
//getBoardsAndInvitations();
//CreateNewBoard();
//CreateNewTask();
//AddStatus();
