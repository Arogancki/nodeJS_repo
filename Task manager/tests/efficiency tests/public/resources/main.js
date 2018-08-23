function ServerError(req){
	console.log("Serrver Error");
	if (req.responseText.length>1)
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

function LoadUserDataFromScope($scope)
{
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
		return $scope;
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
	$scope=LoadUserDataFromScope($scope);
	if ($scope.login!='' || $scope.password!='' ){
			window.location.href = getCurrentURL()+"#/App";
	}
	$scope.SignIn=function(){
		if ($scope.login && $scope.password) {
			var req=PreparePost("Content-type", "application/json","authorization");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						var resObj = JSON.parse(this.responseText);
						setCookie("login",resObj.login,1);
						setCookie("password",$scope.password,1);
						login=resObj.login;
						password=$scope.password;
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 401){// Error happend
						$scope.invalid=req.responseText;
						$scope.$apply();
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
					if (req.status === 200 || req.status === 401 || req.status === 403) {
							$scope.invalid="If login and email are correct new password is sended to your email.";
							$scope.$apply();
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
})

main.controller('SignUpController', function($scope) {
	$scope=LoadUserDataFromScope($scope);
	if ($scope.login!='' || $scope.password!='' ){
			window.location.href = getCurrentURL()+"#/App";
	}
	$scope.SignUp=function(){
		if ($scope.login && $scope.password && $scope.password2) {
			if (!$scope.email)
				$scope.email="";
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
						if ($scope.email!="")
							alert("Please remember to check and confirm your email.")
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 401){// Unauthorized
						$scope.invalid="Invalid login or password";
						$scope.$apply();
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
	$scope.ready=false;
	$scope=LoadUserDataFromScope($scope);
	$scope.Refresh=function(){
		var req=PreparePost("Content-type", "application/json","getBoardsAndInvitations");
		req.send(JSON.stringify({	login: $scope.login,
									password: $scope.password}));
		req.onreadystatechange = function() {
			if (req.readyState === 4) {
				if (req.status === 200) {
					var resObj = JSON.parse(this.responseText);
					if (resObj.login!==undefined){
						$scope.login=resObj.login;
						setCookie("login",$scope.login,1);
						try{
						$scope.refreshTimer=setTimeout($scope.Refresh,0); // run again after x ms
						} catch(err){}
					}
					else{
						$scope.boards=resObj.boards;
						$scope.invitations=resObj.invitations;
						if ($scope.activeBoard!==undefined && $scope.activeBoard!==null){
							$scope.activeBoard = $scope.boards.find(x => x.name === $scope.activeBoard.name && x.owner === $scope.activeBoard.owner);
						}
						if ($scope.activeTask!==undefined && $scope.activeTask!==null){
							$scope.activeTask = $scope.activeBoard.tasks.find(x => x.name === $scope.activeTask.name);
						}
						$scope.ready=true;
						$scope.$apply();
						try{
							$scope.refreshTimer=setTimeout($scope.Refresh,$scope.autoUpdateTime); // run again after x ms
						} catch(err){}
					}
				}
				else if (req.status === 401){// Unauthorized
					ForbiddenAccess();
					$scope = $scope.$new(true);
				}
				else{
					ServerError(req);
				}
			}
		}
	}
	$scope.autoUpdateTime=30000;
	$scope.refreshTimer=setTimeout($scope.Refresh,0);
	$scope.RefreshNow=function(){
		try{
			clearTimeout($scope.refreshTimer);
			$scope.refreshTimer=setTimeout($scope.Refresh,0);
		}catch(err){console.log("Refresh already ongoing.");}
	}
	$scope.SignOut=function(){
		clearTimeout($scope.refreshTimer);
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
						else if (req.status === 401){// Unauthorized
							ForbiddenAccess();
							$scope = $scope.$new(true);
						}
						else if (req.status === 403){ //Error happend
							alert(req.responseText);
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
				else if (req.status === 401){// Unauthorized
					ForbiddenAccess();
					$scope = $scope.$new(true);
				}
				else if (req.status === 403){ //Error happend
					alert(req.responseText);
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
						if ($scope.activeBoard==board)
							$scope.activeBoard=null;
						$scope.RefreshNow();
					}
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
						if ($scope.activeBoard==board)
							$scope.activeBoard=null;
						$scope.RefreshNow();
					}
						else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
						else if (req.status === 401){// Unauthorized
							ForbiddenAccess();
							$scope = $scope.$new(true);
						}
						else if (req.status === 403){ //Error happend
							alert(req.responseText);
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
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
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
});

main.controller('SettingsController', function($scope) {
	$scope=LoadUserDataFromScope($scope);
	$scope.Change=function(){
		if (($scope.newPassword && $scope.newPassword2) || $scope.newEmail) {
			if (!$scope.newPassword){
				$scope.newPassword =$scope.password;
				$scope.newPassword2 =$scope.password;
			}
			if (!$scope.newEmail){
				$scope.newEmail="";
			}
			var req=PreparePost("Content-type", "application/json","changeUserData");
			req.send(JSON.stringify({	login: $scope.login,
										password: $scope.password,
										newPassword: $scope.newPassword,
										newPassword2: $scope.newPassword2,
										newEmail: $scope.newEmail}));
			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200) {
						setCookie("password",$scope.newPassword,1);
						password=$scope.newPassword;
						if ($scope.newEmail!="")
							alert("Please remember to check and confirm your email.")
						window.location.href = getCurrentURL()+"#/App";
					}
					else if (req.status === 401){// Unauthorized
						ForbiddenAccess();
						$scope = $scope.$new(true);
					}
					else if (req.status === 403){ //Error happend
						alert(req.responseText);
					}
					else{
						ServerError(req);
					}
				}
			}
		}
	}
	if ($scope.login=="" || $scope.password==""){
		window.location.href = getCurrentURL()+"#/App";
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
	redirectTo: '/SignIn'
});
}]);