var myApp = angular.module('myApp', []);

myApp.factory('CommonData', function($http, $window){
  var selected = {};    // Shared data between MainController and MapController
  // Passes selected images between the gallery and map views.
  var userID = "";
  return{
      getSelected : function(){
        return selected;
      },
      setSelected : function(updatedSelected){
        selected = updatedSelected;
      },
      getUser : function(){
        return userID;
      },
      setUser : function(id){
        userID = id;
      }
    }
});

myApp.factory('srvAuth', function($http, $window, $rootScope) {
    var watchLoginChangeLogic = function() {    // getLoginStatus
      console.log("Watchin da change")
      var _self = this;
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        if (res.status === 'connected') {
            console.log("connected")

            /*
            The user is already logged,
            is possible retrieve his personal info
            */
            _self.getUserInfo();
            console.log('connected auth response: ', res.authResponse);
            /*
            This is also the point where you should create a
            session for the current user.
            For this purpose you can use the data inside the
            res.authResponse object.
            */
        }
        else {
            console.log("notconnected")

            /*
            The user is not logged to the app, or into Facebook:
            destroy the session on the server.
            */
        }
      });
    };

    var getUserInfoLogic = function() {
      var _self = this;
      FB.api('/me', function(res) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = res;
          // console.log('user info: ', res.id, res.name);
          // window.location = "http://localhost:3000/#/gallery";
        });
      });
      return _self.user;
    };

    var logoutLogic = function() {
      var _self = this;
      FB.logout(function(response) {
        $rootScope.$apply(function() {
          $rootScope.user = _self.user = {};
          console.log('logging out', response);
        });
      });
    };

    var testAPILogic = function() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
      }

    return {
        watchLoginChange: watchLoginChangeLogic,
        getUserInfo : getUserInfoLogic,
        logout : logoutLogic,
        testAPI: testAPILogic
    };
});
