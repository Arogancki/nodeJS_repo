// Define the AngularJS Module
var app4 = angular.module('app4', []);
 
// Define the Controller and implement the Scope
app4.controller('eventCtrl', function($scope) {
  $scope.blur = 0;
  $scope.click = 0;
  $scope.dblclick = 0;
  $scope.copy = 0;
  $scope.paste = 0;
  $scope.cut = 0;
  $scope.focus = 0;
  $scope.change = 0;
  $scope.keydown = function(e) {
    // Works for the basic characters and numbers
    $scope.kdKey = String.fromCharCode(e.keyCode);
  };
  $scope.mouseenter = 0;
  $scope.mouseleave = 0;
 
  // Used to disable button
  $scope.disableButton = true;
 
  // Used to show and hide elements
  $scope.daytimeButton = true;
 
  // Used for table
  $scope.capitals = [
    {"City": "Montgomery",
    "State": "Alabama"},
    {"City": "Juneau",
    "State": "Alaska"},
    {"City": "Phoenix",
    "State": "Arizona"},
    {"City": "Little Rock",
    "State": "Arkansas"}
  ];
});