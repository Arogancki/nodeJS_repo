function alignRowColumn1to2(column1, column21, column22){
try {
	document.getElementById(column1).style.height=
	document.getElementById(column21).offsetHeight+
	document.getElementById(column22).offsetHeight+'px';
}
catch (err){}
}

function SendPostToCurrentUrl(headerType1,headerType2,data,onReadyStateChangeFunction)
{
	var pathArray = location.href.split( '/' );
	var url = pathArray[0] + '//' + pathArray[2];
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader(headerType1,headerType2);
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) onReadyStateChangeFunction();
		else console.log("Reguest status: "+xhr.status);
	}
	try{
		xhr.send(data); // requested backgorund is random
	}
	catch(err) {
		console.log("Error during sending post "+err);
	}
}

function setBackground()
{
	SendPostToCurrentUrl("Content-type","image/jpeg","bgImg=0",function () {
		var css = 'body::after{ background-image: '+1+'; }';
		var style = document.createElement('style');
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} 
		else {
			style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName('head')[0].appendChild(style);
		alert(xhr.responseText);
	});
}

var main = angular.module("main", ['ngRoute']);

main.controller('SignInController', function($scope) {
	$scope.SignIn=function(){
		var c=$cookieStore.get("login");
			alert("c");
		if ($scope.login && $scope.password) {
			$cookieStore.put("login", $scope.login);
			var c=$cookieStore.get("login");
			alert("c");
			//$cookieStore.remove("login");
			
		}
	}
});

main.controller('SignUpController', function($scope) {
	$scope.SignUp=function(){
		if ($scope.login && $scope.password && $scope.password2) {
			//email moze byc undefined
			alert("git");
		}
	}
});

main.controller('AppController', function($scope) {
	$scope.SignOut=function()
	{
		$scope = $scope.$new(true);
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
	$scope.activeBoard="";
	$scope.login="Agnieszka";
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
			alert("git");
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
	redirectTo: '/SignIn'
});
}]);