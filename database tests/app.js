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

function SendRequest(path,json,doneFunction) {
    request.post(
        'http://192.168.0.189:8081/'+path,
        { json: json },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
		if (typeof doneFunction !== 'undefined')
			doneFunction(json);
            }
        }
    );
}

function AddLoad(users,boards,task,comments){
	for (var i=0; i<users; i++){
		json={ login: "testUser"+i, password: "12345678" , password2: "12345678" };
		SendRequest('registration', json, function(json) {
			for (var j=0; j<boards; j++){
				json2=json;
				json2.board="board"+j;
				SendRequest('CreateNewBoard', json2,function(json) {
					for (var k=0; k<task; k++){
						json2=json;
						json2.owner=json2.login;
						json2.task="task"+k;
						json2.info="New issue";
						SendRequest('CreateNewTask', json2,function(json) {
							for (var l=0; l<comments; l++){
								json2=json;
								json2.type='In progress';
								json2.info="Status"+l;
								SendRequest('AddStatus', json2);
							}
						});
					}
				});
			}
		});
	}
}

function LoadTest(){
	MakeLog("Test authorization started.");
	json={ login: "testUser0", password: "12345678" , password2: "12345678" };
	SendRequest('authorization', json, function(json) {
		MakeLog("Test authorization finished.");
		MakeLog("Test getBoardsAndInvitations started.");
		SendRequest('getBoardsAndInvitations', json, function(json) {
			MakeLog("Test getBoardsAndInvitations finished.");
			json2=json;
			json2.board="newBoardX";
			MakeLog("Test CreateNewBoard started.");
			SendRequest('CreateNewBoard', json2, function(json) {
				MakeLog("Test CreateNewBoard finished.");
				json2=json;
				json2.owner=json2.login;
				json2.task="newTaskX";
				json2.info="new issue";
				MakeLog("Test CreateNewTask started.");
				SendRequest('CreateNewTask', json2, function(json) {
					MakeLog("Test CreateNewTask finished.");
					json2=json;
					json2.info="new InfoX";
					json2.type='In progress';
					MakeLog("Test AddStatus started.");
					SendRequest('AddStatus', json2, function(json) {
						MakeLog("Test AddStatus finished.");
					});
				});
			});
		});
	});
}

//use AddLoad(int,int,int,int);
//then
//use LoadTest();
