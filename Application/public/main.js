function ServerError(req){
	console.log("Serrver Error");
	alert(req.responseText);
}

function ForbiddenAccess(){
	deleteCookie("login");
	deleteCookie("password");
	login="";
	password="";
	alert("You have to Sign in.");
	window.location.href = getCurrentURL()+"#/SignIn";
}

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
    date.setTime(date.getTime() + (expiryDays*24*60*60*1000));
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

function PreparePost(headerType1,headerType2,url)
{
 	var xhr = new XMLHttpRequest();
	var urlAddon = typeof url == 'string' ? "/"+url : "";
	console.log(getCurrentURL()+urlAddon);
 	xhr.open("POST", getCurrentURL()+urlAddon,true); // last parameter isAsynchronous
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
			var req=PreparePost("Content-type", "application/json","authorization");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						setCookie("login",$scope.login,1);
						setCookie("password",$scope.password,1);
						login=$scope.login;
						password=$scope.password;
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 403){// Unauthorized
						$scope.invalid=req.responseText;
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
	$scope.ResetPassword=function(){
		if ($scope.login && $scope.email) {
			var req=PreparePost("Content-type", "application/json","resetpassword");
			req.send(JSON.stringify({	login: $scope.login,
										email: $scope.email}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
				if (req.status === 200 || req.status === 403) {
						$scope.invalid=responseText;
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
});

main.controller('SignUpController', function($scope) {
	$scope.SignUp=function(){
		login="";
		password="";
		if ($scope.login && $scope.password && $scope.password2) {
			var req=PreparePost("Content-type", "application/json","registration");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										password2: $scope.password2,
										email: $scope.email}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						setCookie("login",$scope.login,1);
						setCookie("password",$scope.password,1);
						login=$scope.login;
						password=$scope.password;
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 403){// Unauthorized
						$scope.invalid=req.responseText;
					}
					else{
						ServerError(req);
					}
				}
			}
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
	
	if ($scope.login=="" || $scope.password==""){
		ForbiddenAccess();
		return;
	}
	$scope.Refresh=function(timeInMs){
		var req=PreparePost("Content-type", "application/json","getBoardsAndInvitations");
		req.send(JSON.stringify({	login: $scope.login,
									password: $scope.password}));
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200) {
					var resObj = JSON.parse(this.responseText);
					$scope.boards=resObj.boards;
					$scope.invitations=resObj.invitations;
					try{
					$scope.refreshTimer=setTimeout($scope.Refresh(timeInMs),timeInMs); // run again after x ms
					} catch(err){}
				}
				else if (req.status === 403){ // Forrbiden
					ForbiddenAccess();
					$scope = $scope.$new(true);
				}
				else{
					ServerError(req);
				}
			}
		}
	}
	$scope.autoUpdateTime=60000;
	$scope.refreshTimer=setTimeout($scope.Refresh($scope.autoUpdateTime),0);
	$scope.RefreshNow=function(){
		try{
			clearTimeout($scope.refreshTimer);
			$scope.refreshTimer=setTimeout($scope.Refresh($scope.autoUpdateTime),0);
		}catch(err){console.log("Refresh already ongoing.");}
	}
	$scope.SignOut=function(){
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
				var req=PreparePost("Content-type", "application/json","CreateNewBoard");
				req.send(JSON.stringify({	login: $scope.login,
											password: $scope.password,
											board: input}));
				req.onreadystatechange = function() {
					if (req.readyState === 4) {
						if (req.status === 200) {
							$scope.RefreshNow();
						}
						else if (req.status === 403){ // Forrbiden
							ForbiddenAccess();
							$scope = $scope.$new(true);
						}
						else{
							ServerError(req);
						}
					}
				}
			}
			else
				alert("You already have board "+input+".");
		}
	}
	$scope.AcceptInvitation=function(invitation){
		var req;
		if (confirm('Do you want to accept an invitation to "'+invitation.name+'" board from '+invitation.owner+'?'))
			req=PreparePost("Content-type", "application/json","AcceptInviattion");
		else 
			req=PreparePost("Content-type", "application/json","ReffuseInviattion");
		
		req.send(JSON.stringify({	login: $scope.login,
									password: $scope.password,
									owner: invitation.owner,
									board: invitation.name}));
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200) {
					$scope.RefreshNow();
				}
				else if (req.status === 403){ // Forrbiden
					ForbiddenAccess();
					$scope = $scope.$new(true);
				}
				else{
					ServerError(req);
				}
			}
		}
	}
	$scope.ActiveBoard=function(board){
		$scope.activeBoard=board;
		$scope.activeTask=undefined;
	}
	$scope.LeaveBoard=function(board){
		if (confirm("Do you want to leave "+board.owner+'\'s board "'+board.name+'"?')) {
			var req=PreparePost("Content-type", "application/json","LeaveBoard");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										owner: board.owner,
										board: board.name}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
	$scope.DeleteBoard=function(board){
		if (confirm('Do you want to delete your board "'+board.name+'"?')) {
			var req=PreparePost("Content-type", "application/json","DeleteBoard");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										owner: board.owner,
										board: board.name}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
	$scope.KickOut=function(member){
		if (confirm('Do you want to kick "'+member+'" out from '+$scope.activeBoard.name+"?")) {
			var req=PreparePost("Content-type", "application/json","KickOut");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										owner: $scope.activeBoard.owner,
										board: $scope.activeBoard.name,
										member: member}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
	$scope.AddStatus=function(type){
		var info=prompt("You're going to add a \""+type+"\" status.\nWrite a comment.");
		// type i text do serwera i pobrac wyniki (trzeba uaktualnic jesli ktos inny wyslal)
		if (info != null && $scope.activeBoard != null ) {
			var req=PreparePost("Content-type", "application/json","AddStatus");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										owner: $scope.activeBoard.owner,
										board: $scope.activeBoard.name,
										task: $scope.activeTask.name,
										info: info,
										type: type}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
		
	}
	$scope.isThatMe=function(name){
		return $scope.login===name ? true : false;
	} 
	$scope.InviteToBoard=function(){
		var input=prompt("Please enter user's login you want to invite.");
		if (input != null && $scope.activeBoard != null ) {
			var req=PreparePost("Content-type", "application/json","InviteToBoard");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										owner: $scope.activeBoard.owner,
										board: $scope.activeBoard.name,
										member: input}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	} 
	$scope.CreateNewTask=function(){
		var input=prompt("Please enter new task name.");
		if (input != null && $scope.activeBoard != null ) {
			var info=prompt("Write first comment.");
			if (info != null){	
				var req=PreparePost("Content-type", "application/json","CreateNewTask");
				req.send(JSON.stringify({	login: $scope.login,
											password: $scope.password,
											owner: $scope.activeBoard.owner,
											board: $scope.activeBoard.name,
											task: input,
											info: info}));
				req.onreadystatechange = function() {
					if (req.readyState === 4) {
						if (req.status === 200) {
							$scope.RefreshNow();
						}
						else if (req.status === 403){ // Forrbiden
							ForbiddenAccess();
							$scope = $scope.$new(true);
						}
						else{
							ServerError(req);
						}
					}
				}
			}
		}
	}
	$scope.RemoveTask=function(){
		if (confirm('Do you want to delete task "'+$scope.activeTask.name+'"?')) {
			var req=PreparePost("Content-type", "application/json","RemoveTask");
			req.send(JSON.stringify({ 	login: $scope.login, 
										password:$scope.password,
										owner:$scope.activeBoard.owner,
										board:$scope.activeBoard.name,
										task:$scope.activeTask.name}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						$scope.RefreshNow();
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else{
						ServerError(req);
					}
				}
			}
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
	$scope.Change=function(){
		if ($scope.newLogin || $scope.newPassword || $scope.newPassword2 || $scope.newEmail) {
			var req=PreparePost("Content-type", "application/json","changeUserData");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										newLogin: $scope.newLogin,
										newPassword: $scope.newPassword,
										newPassword2: $scope.newPassword2,
										newEmail: $scope.newEmail}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						setCookie("login",$scope.newLogin,1);
						setCookie("password",$scope.newPassword,1);
						login=$scope.newLogin;
						password=$scope.newPassword;
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 401){// Unauthorized
						$scope.invalid=req.responseText;
					}
					else if (req.status === 403){ // Forrbiden
						ForbiddenAccess();
					}
					else{
						ServerError(req);
					}
				}
			}
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