/* Services are objects that bundle together methods that serve a specific function. Angular provides many built in services, but it is also easy for us to make our own custom services.
*/

var app13 = angular.module('app13', []);

// Creates a simple service that provides a method
// we can use in other controllers, directives and
// filters. Services unlike factories don't return
// anything, but instead provide access to a
// single object that can be used by your entire
// application
app13.service('HelloService', function(){
  this.helloService = function() {
    console.log('Hello Service');
  };
});

// Create a factory that creates an object, adds
// a method to it and returns that object
app13.factory('HelloFactory', function(){
  var factory = {};

  factory.helloFactory = function(){
    console.log('Hello Factory');
  };

  return factory;

});

// Pass the service into the controller to
// access its method
app13.controller('mainCtrl', function(HelloService, HelloFactory) {
  HelloService.helloService();
  HelloFactory.helloFactory();
});