var myApp = angular.module('myApp', []);

myApp.factory('CommonData', function($http, $window){
<<<<<<< HEAD
  var selected = {};    // Shared data between MainController and MapController
  // Passes selected images between the gallery and map views.
=======
  var selected = {};
>>>>>>> 0d1058509ef2a126f6167c122bb24297163c3a85
  return{
      getSelected : function(){
        return selected;
      },
      setSelected : function(updatedSelected){
        selected = updatedSelected;
      }
    }
});
