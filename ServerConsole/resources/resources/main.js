var serverError="Server error.\nPlease try again later.";

function AlignRowColumn1to2(column1, column21, column22){
	try {
		document.getElementById(column1).style.height=
		document.getElementById(column21).offsetHeight+
		document.getElementById(column22).offsetHeight+'px';
	}
	catch (err){}
}

function getCurrentURL(){
	var pathArray = location.href.split( '/' );
 	return (pathArray[0] + '//' + pathArray[2]);
}

function setCookie(name,value,expiryDays) {
	if (getCookie(name)!="" && expiryDays>0)
		DeleteCookie(name);
    var date = new Date();
    date.setTime(date.getTime() + (expiryDays*24*60*60*1000)); // 24- one day before expire
    var expireDate = date.toGMTString();
	document.cookie ="expires="+expireDate+";domain="+getCurrentURL()+";path=/;"+name+"="+value+";";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name){
	setCookie(name,"",-1);
}

function PreparePost(headerType1,headerType2,isAsynchronous)
{
 	var xhr = new XMLHttpRequest();
 	xhr.open("POST", getCurrentURL(), isAsynchronous);
 	xhr.setRequestHeader(headerType1,headerType2);
	// has to set 
	//xhr.onreadystatechange = function() {  if (xhr.readyState === 4) { ... } }
	//xhr.send("...")
	//xhr.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
	return xhr;
}
 
var main = angular.module("main", ['ngRoute']);
//global login password data in case when cookies doesn't work
var login="";
var password="";

main.controller('SignInController', function($scope) {
	deleteCookie("login");
	deleteCookie("password");
	login="";
	password="";
	$scope.SignIn=function(){
		if ($scope.login && $scope.password) {
			//wyslanie na serwer i sprawdzenie potweirdzenia ewentualnie wyrzucenie bledu w alert z serwera
			var req=PreparePost("POST", "/json-handler",false);
			req.send(	JSON.stringify({service:"authorization",login:$scope.login,password:$scope.password}));
			if (req.status === 200) {
				console.log(req.responseText);
			}
			else if (req.status === 401){// Unauthorized
				$scope.login="";
				$scope.password="";
				$scope.invalid=true;
				return;
			}
			else{
				console.log(req);
				alert(serverError);
				return;
			}
			setCookie("login",$scope.login,1);
			setCookie("password",$scope.password,1);
			login=$scope.login;
			password=$scope.password;
			window.location.href = getCurrentURL()+"#/App";
		}
	}
});

main.controller('SignUpController', function($scope) {
	$scope.SignUp=function(){
		login="";
		password="";
		if ($scope.login && $scope.password && $scope.password2) {
			//wyslanie na serwer i sprawdzenie potweirdzenia ewentualnie wyrzucenie bledu w alert z serwera
			setCookie("login",$scope.login,1);
			setCookie("password",$scope.password,1);
			login=$scope.login;
			password=$scope.password;
			window.location.href = getCurrentURL()+"#/App";
		}
	}
});

main.controller('AppController', function($scope) {
	var cookieLogin=getCookie("name");
	if (cookieLogin!=""){
		$scope.login=cookieLogin;
		login=cookieLogin;
	}
	else
		$scope.login=login;
	var cookiePassword=getCookie("password");
	if (cookiePassword!=""){
		$scope.password=cookiePassword;
		password=cookiePassword;
	}
	else
		$scope.password=password;
	
	if ($scope.login=="" || $scope.password=="")
	{
		alert("You have to Sign in.");
		window.location.href = getCurrentURL()+"#/SignIn";
	}
	$scope.AutoUpdate=function (timeInMs){
		if (login!="" && password!=""){
			//get data from server invitaitons and boards
			try{
				setTimeout($scope.AutoUpdate(timeInMs),timeInMs); // run again after x ms
			} catch(err){}
		}
	}
	$scope.AutoUpdate();
	$scope.activeBoard="";
	$scope.SignOut=function()
	{
		$scope = $scope.$new(true);
		deleteCookie("login");
		deleteCookie("password");
		login="";
		password="";
	}
	$scope.CreateNewBoard=function(){
		var input=prompt("Please enter new board name.");
		if (input != null) {
			var existAlready=false;
			angular.forEach($scope.boards, function(board,key){
				if (!existAlready && board.owner===$scope.login && board.name===input) {
					existAlready=true;
				}
			});
			if (!existAlready)
			{
				// send post and get new board 
			}
			else
				alert("You already have board "+input+".");
		}
	}
	$scope.AcceptInvitation=function(invitation){
		if (confirm('Do you want to accept an invitation to "'+invitation.name+'" board from '+invitation.owner+'?')) {
			// send accept to server and get information
		}
		else {
			//send refuse to server end get info
		}
	}
	$scope.ActiveBoard=function(board){
		$scope.activeBoard=board;
		$scope.activeTask=undefined;
	}
	$scope.LeaveBoard=function(board){
		if (confirm("Do you want to leave "+board.owner+'\'s board "'+board.name+'"?')) {
			// send message about leaving to server get response and update 
		}
	}
	$scope.DeleteBoard=function(board){
		if (confirm('Do you want to delete your board "'+board.name+'"?')) {
			// send message about deleting to server get response and update 
		}
	}
	$scope.KickOut=function(member){
		if (confirm('Do you want to kick "'+member+'" out from '+$scope.activeBoard.name+"?")) {
			var indexOfIMember= $scope.activeBoard.members.indexOf(member);
			if (indexOfIMember != -1) {
				// send message about kicking member from members out to server and update
			}
			else {
				indexOfIMember= $scope.activeBoard.invitations.indexOf(member);
				if (indexOfIMember != -1) {
					// send message about kicking member from inviations out to server and update
				}
				else
					return 1;
			}
		}
	}
	$scope.AddStatus=function(type){
		var info=prompt("You're going to add a \""+type+"\" status.\nWrite a comment if you want.");
		// type i text do serwera i pobrac wyniki (trzeba uaktualnic jesli ktos inny wyslal)
	}
	$scope.isThatMe=function(name){
		return $scope.login===name ? true : false;
	} 
	$scope.InviteToBoard=function(){
		var input=prompt("Please enter user's login you want to invite.");
		if (input != null && $scope.activeBoard != null ) {
			//wyslac dodanie do invite w activeBoard i sprawdzic w odpowiedzi czy jest taki user jelsi tak pushuje
		}
	} 
	$scope.CreateNewTask=function(){
		var input=prompt("Please enter new task name.");
		if (input != null && $scope.activeBoard != null ) {
			//add new task with status new 
			var info=prompt("Write first comment if you want.");
			//  do serwera i pobrac wyniki (trzeba uaktualnic jesli ktos inny wyslal)
		}
	}
	$scope.RemoveTask=function(){
		if (confirm('Do you want to delete task "'+$scope.activeTask.name+'"?')) {
			//  do serwera i pobrac wyniki (trzeba uaktualnic jesli ktos inny juz usunal)
		}
	}
	$scope.ActiveTask=function(task){
		$scope.activeTask=task;
	}
	$scope.boards=[
								{	name:"Gotowanie",
									owner:"Agnieszka",
									members:["Artur","Mama"],
									tasks:[
												{ name:"Kurczak",statuses:[
																								{ type:"New",user:"Artur",info:"My 1",date:"18:51"},
																								{ type:"Blocked",user:"Agnieszka",info:"My 2",date:"18:55"},
																								{ type:"In progress",user:"Artur",info:"My 3 to bedize najdpluzszy kmemtaurz bo nalezy spradziwc rozciaganie sie divoww sifnaosufbaifbaifbasfa sfaosf asfasu",date:"22:00"},
																								{ type:"Finished",user:"Agnieszka",info:"My 4",date:"23:51"}
																							]
												},
																								
												{name:"Wolowina na parze",statuses:[
																												{type:"New",user:"Agnieszka",info:"Time for beef"},
																												{type:"In progress",user:"Artur",info:"I take it"}
																											]
												}
											]
								},
								{
									name:"Podroze",
									owner:"Artur",
									members:["Agnieszka"],
									invitations:["Marek","Mama"]
								}
							];
	$scope.invitations=[{name:"Praca",owner:"Szef"},{name:"Dom",owner:"Mama"}];
});

main.controller('SettingsController', function($scope) {
	$scope.Change=function(){
		if ($scope.newLogin || $scope.newPassword || $scope.newPassword2 || $scope.newEmail) {
			//send data to server if gets ok : if not show alert from server
			setCookie("login",$scope.newLogin,1);
			setCookie("password",$scope.newPassword,1);
			login=$scope.newLogin;
			password=$scope.newPassword;
			window.location.href = getCurrentURL()+"#/App";
		}
	}
});

main.config(['$routeProvider', function($routeProvider) {
$routeProvider.
when('/SignIn', {
	templateUrl: 'SignIn.htm',
	controller: 'SignInController'
}).
when('/SignUp', {
	templateUrl: 'SignUp.htm',
	controller: 'SignUpController'
}).
when('/App', {
	templateUrl: 'App.htm',
	controller: 'AppController'
}).
when('/Settings', {
	templateUrl: 'Settings.htm',
	controller: 'SettingsController'
}).
otherwise({
	redirectTo: '/App'
});
}]);