// You create directives with the Module.directive method
// using the name of the directive and the factory function
angular.module('app10', [])
  .directive("bbPlayerList", function() {

    // This is the link function and it links the HTML with the
    // directive and the data in the scope.
    // It receives the scope, the HTML element that the
    // directive is applied to and attributes of the HTML
    // element.
    return function(scope, element, attrs) {

      // Get the data by passing the value associated with
      // bbPlayerList to the scope object
      var data = scope[attrs["bbPlayerList"]];

      // Verify that I have an array of data
      if (angular.isArray(data)) {

        // Get the item to display from the array-item attribute
        var arrayItem = attrs["arrayItem"];

        // angular.element wraps the DOM element as a JQuery
        // element
        var listElem = angular.element("<ul>");

        // The ul element is the container in which the li
        // elements will be assigned
        element.append(listElem);
        for (var i = 0; i < data.length; i++){

          // Get the matching data stored in the defined key requested
          // $eval eliminates the filter and leaves just the attribute
          // name to pull from the array
          listElem.append(angular.element('<li>')
            .text(scope.$eval(arrayItem, data[i])));
        }

        // Add a span after the list
        listElem.after(angular.element("<span id='mays'>").text("Willy Mays"));

        // Add a span before the list
        listElem.prepend(angular.element("<span id='cobb'>").text("Ty Cobb"));

        // Remove an element
        angular.element(document.querySelector('#mays')).remove();

        // Replace an element
        var gehrigHTML = "<span id='gehrig'>Lou Gehrig</span>";
        var replacement = angular.element(gehrigHTML);
        angular.element(document.querySelector('#cobb'))
        .replaceWith(replacement);


      }
    }
  })
  .controller("mainCtrl", function($scope) {
    $scope.bbPlayers = [
      {name: "Barry Bonds", avg: 0.298, hr: 762, obp: 0.444},
      {name: "Hank Aaron", avg: 0.305, hr: 755, obp: 0.374},
      {name: "Babe Ruth", avg: 0.342, hr: 714, obp: 0.474},
      {name: "Ted Williams", avg: 0.344, hr: 521, obp: 0.482}
    ];
  });