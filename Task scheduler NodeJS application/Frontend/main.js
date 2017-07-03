
			function alignRowColumn1to2(column1, column21, column22){
				try {
					document.getElementById(column1).style.height=
					document.getElementById(column21).offsetHeight+
					document.getElementById(column22).offsetHeight+'px';
				}
				catch (err){}
			}
			
			var main = angular.module("main", ['ngRoute']);
			
			main.controller('SignInController', function($scope) {
				$scope.SignIn=function(){
					if ($scope.login && $scope.password)
					{
						alert("git");
					}
				}
			});
			
			main.controller('SignUpController', function($scope) {
				$scope.SignUp=function(){
					if ($scope.login && $scope.password && $scope.password2)
					{
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
						
					}
				}
				$scope.AcceptInvitation=function(invitation){
					if (confirm('Do you want to accept an invitation to "'+invitation.name+'" board from '+invitation.owner+'?')) {
						//accept invitation
					} else {
						// Remove invitation
					}
				}
				$scope.ActiveBoard=function(board){
					$scope.activeBoard=board;
					$scope.activeTask=undefined;
				}
				$scope.LeaveBoard=function(board){
					if (confirm("Do you want to leave "+board.owner+'\'s board "'+board.name+'"?')) {
						//leave
					}
				}
				$scope.DeleteBoard=function(board){
					if (confirm('Do you want to delete your board "'+board.name+'"?')) {
						//ldelete
					}
				}
				$scope.KickOut=function(member){
					if (confirm('Do you want to kick "'+member+'" out from '+$scope.activeBoard.name+"?")) {
						//kick
					}
				}
				$scope.AddStatus=function(type){
					var info=prompt("You're going to add a \""+type+"\" status.\nWrite a comment if you want.");
				}
				$scope.isThatMe=function(name){
					return $scope.login===name ? true : false;
				} 
				$scope.InviteToBoard=function(){
					var input=prompt("Please enter user's login you want to invite.");
					if (input != null && $scope.activeBoard != null ) {
						//add input to inviteted
					}
				} 
				$scope.CreateNewTask=function(){
					var input=prompt("Please enter new task name.");
					if (input != null && $scope.activeBoard != null ) {
						//add new task with status new 
						var info=prompt("Write first comment if you want.");
					}
				}
				$scope.RemoveTask=function(){
					if (confirm('Do you want to delete task "'+$scope.activeTask.name+'"?')) {
						//remove task from activeTask
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
												invitations:["Marek"],
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
					if ($scope.login && $scope.password && $scope.password2 && $scope.email)
					{
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