// Let's create another custom directive that will replace a
// custom element with data based on the data requested

// You create directives with the Module.directive method
// using the name of the directive and the factory function
var app11 = angular.module('app11', []);

app11.directive("player", function() {

    // Create a directive object
    var directive = {};

    // Define that we are using an element directive instead of
    // a A: attribute, C: class, or M: comment
    // I covered how to apply as an attribute previously
    // I normally only apply as elements or attributes because
    // it is easy to figure out where the directive was applied.
    directive.restrict = 'E';

    // The template is filled with the data and replaces the element
    directive.template = "{{player.name}} had a {{player.avg}} AVG with {{player.hr}} homeruns and a {{player.obp}} OBP";

    // Scope defines what is unique about each element
    directive.scope = { player: "=name" };

    // compile is called during the initialization phase
    directive.compile = function(element, attributes){

      // The link function receives the scope, the element The
      // directive is associated with and that elements
      // attributes. Here we can handle events on that element
      var linkFunc = function($scope, element, attributes){
        element.bind('click', function() {
          element.html('Barry disappeared');
        });
      }
      return linkFunc;
    }
    return directive;
});

app11.controller("mainCtrl", function($scope) {
    $scope.barryBonds = {name: "Barry Bonds", avg: 0.298, hr: 762, obp: 0.444};
    $scope.hankAaron =  {name: "Hank Aaron", avg: 0.305, hr: 755, obp: 0.374};
    $scope.babeRuth = {name: "Babe Ruth", avg: 0.342, hr: 714, obp: 0.474};
    $scope.tedWilliams ={name: "Ted Williams", avg: 0.344, hr: 521, obp: 0.482};
  });