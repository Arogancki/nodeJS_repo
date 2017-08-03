var app12 = angular.module('app12', []);

// When we use a template the template replaces the content
// in the document. You can use transclusion to display The
// original content and add in the new.

app12.directive("exDir", function() {
  return {
    transclude: true,

    // ng-transclude defines where the data in the element
    // shows up in the template
    template: "<div><h4>{{moreLorem}}</h4></div><div ng-transclude></div>"
  }

});

app12.controller("mainCtrl", function($scope) {

  $scope.moreLorem = "The Amazing Lorem Story";

});