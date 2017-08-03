var app15 = angular.module('app15', []);

app15.controller('mainCtrl', function($scope, $http) {

  // Get data from the json file and display it
  $scope.getData = function() {
    $http.get("playerData.json").success(
      function(data){
        $scope.players = data;
      }
    );
  }

  // Get this Chrome extension if you get the
  // CORS error
  // Allow-Control-Allow-Origin
  $scope.translate = function() {
    var words = $scope.wordsToTranslate.replace(/ /g,"+");

    var jsonUrl = "http://newjustin.com/translateit.php?action=translations&english_words=" + words;

    $http.get(jsonUrl).success(
      function(data){
        $scope.translated = data;
      }
    );

  }

});