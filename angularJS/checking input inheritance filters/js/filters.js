// Create a module named weatherfilters
// The name for the filter is raining and different unicode
// characters are returned based on weather an item is true or false
angular.module('weatherFilters', []).filter('raining', function(){
  return function(input){
    return input ? '\u2602' : '\u2600';
  };
});