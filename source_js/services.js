var myApp = angular.module('myApp', []);

myApp.factory('CommonData', function($http, $window){
  var selected = {};    // Shared data between MainController and MapController
  // Passes selected images between the gallery and map views.
  return{
      getSelected : function(){
        return selected;
      },
      setSelected : function(updatedSelected){
        selected = updatedSelected;
      }
    }
});
