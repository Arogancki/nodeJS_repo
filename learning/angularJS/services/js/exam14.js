var app14 = angular.module('app14', ["ngSanitize"]);

app14.controller('mainCtrl', function($scope, $window, $location, $interval, $log, $exceptionHandler, $sanitize) {

  // The $window service provides an object
  // that represents the window object
  $scope.greetUser = function(userName){
    $window.alert("Hello " + userName);
  }

  // The $document service is an object that
  // represents the window.document object, but
  // normally if you want to minipulate elements
  // you'll use angular.element instead

  // $location is a service that provides access
  // to the current URL and can be used for
  // navigation within the document
  $scope.currURL = $location.absUrl();

  // Get the protocol being file or http
  $scope.theProtocol = $location.protocol();

  // Get the host
  $scope.currHost = $location.host();

  // Get the port
  $scope.currPort = $location.port();

  // Set the path
  $location.path("#/the/path");

  // Get the path
  $scope.currPath = $location.path();

  // Set the search
  $location.search("random=stuff");

  // Get the search
  $scope.currSearch = $location.search();

  // The interval service executes code at a set
  // time being every 2 seconds in this situation
  $interval(function() {
    var hour = new Date().getHours();

    // Add a starting 0 and then slice the last
    // to numbers off the string
    var minutes = ('0' + new Date().getMinutes()).slice(-2);
    var seconds = ('0' + new Date().getSeconds()).slice(-2);
    $scope.time = hour + ":" + minutes + ":" + seconds;
  }, 2000);

  // Log messages to the console for debugging
  $scope.$log = $log;

  // Any uncaught exception delegates to the
  // $exceptionHandler service which outputs
  // to the console.
  $scope.throwException = function() {
    // If we didn't catch the exception a stack
    // trace would print in the console
    try {
      throw new Error("Exception Thrown");
    }
    catch(e) {
      // Receives the exception and a string
      // explaining the exception
      $exceptionHandler(e.message,
        "Caught Exception");
    }
  }

  $scope.badStuff = "";

  // Monitors a change in value for badStuff
  // and sanitizes it
  $scope.$watch("badStuff", function(value) {
    $scope.htmlData = $sanitize(value);
  });

  // Data used by compile below
  $scope.players = [{name: "Barry Bonds", avg: 0.298, hr: 762, obp: 0.444},
  {name: "Hank Aaron", avg: 0.305, hr: 755, obp: 0.374},
  {name: "Babe Ruth", avg: 0.342, hr: 714, obp: 0.474},
  {name: "Ted Williams", avg: 0.344, hr: 521, obp: 0.482}];

});

// The $compile service compiles HTML into a
// template using scope data
// This replaces get-player-info in the document
//
app14.directive("getPlayerInfo", function($compile) {
  return function(scope, element, attrs){

    // The template
    var playerList = "<ul><li ng-repeat='player in players'>{{player.name}}</li></ul>";

    // Wrap it in a jqLite object
    var listElem = angular.element(playerList);

    // Create the compile function which
    // generates are HTML
    var compileFunc = $compile(listElem);

    // Process our content
    compileFunc(scope);

    // Update our jqLite object and add it to the
    // document
    element.append(listElem);

  }
});