angular.module('app9', [])
  .directive("jqlDirective", function() {
    return function(scope, element, attrs) {

      // Get the children of the element tied to the directive
      var players = element.children();

      var listOfPlayers = "";

      // Cycle through the list of children
      for(i = 0; i < players.length; i++){

      // Modifying HTML Elements

        // Check item for the value Barry Bonds
        if(players.eq(i).text() == "Barry Bonds"){

          // Change text color for the matching element
          players.eq(i).css("color", "red");

          // Add an attribute
          players.eq(i).attr("number", "25");
        }

        // Check item for the value Hank Aaron
        if(players.eq(i).text() == "Hank Aaron"){

          // Add a class to an element
          players.eq(i).addClass("thick");
        }

        // eq() returns an element at the given index
        // text() returns the text in that element
        listOfPlayers += players.eq(i).text() + ", ";
      }

      // How to select an element by id with JQLite and add text
      angular.element(document.querySelector('#childrenList'))
        .text(listOfPlayers);

      // Get the value of an attribute
      var barrysNum = angular.element(document.querySelector('#barry'))
        .attr("number");

      // Set the value of the attribute to the span
      angular.element(document.querySelector('#barrysNum'))
        .text(barrysNum);

      // Remove a class
      // You can remove an attribute with removeAttr
      angular.element(document.querySelector('#hank'))
        .removeClass("thick");

      // Find out if an element has a class
      var isHankBold = angular.element(document.querySelector('#hank'))
        .hasClass("thick");

      // Set the value in a span
      angular.element(document.querySelector('#hankBold'))
        .text(isHankBold);

      // Get the value of a property
      // Set a property with .prop("name", "value")
      var barryID = angular.element(document.querySelector('#barry'))
        .prop("id");

      // Set the value in a span
      angular.element(document.querySelector('#barryID'))
        .text(barryID);

    }
  })
  .controller("mainCtrl", function($scope) {

    // Toggle a class on click
    $scope.unBold = function() {
      angular.element(document.querySelector('#hank')).toggleClass("thick");
    }

})