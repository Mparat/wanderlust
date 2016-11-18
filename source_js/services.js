var myApp = angular.module('myApp', []);

myApp.factory('CommonData', function($http, $window){
  var selected = {};
  return{
      getSelected : function(){
        return selected;
      },
      setSelected : function(updatedSelected){
        selected = updatedSelected;
      }
    }
});
