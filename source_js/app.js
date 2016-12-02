var app = angular.module('wanderlust',['ngRoute', 'myApp']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'MainController'
    })
    .when('/gallery', {
      templateUrl: 'partials/gallery.html',
      controller: 'MainController',
      data: { authorization: true}
    })
    .when('/map', {
      templateUrl: 'partials/map.html',
      controller: 'MapController',
      data: { authorization: true}
    })
    .when('/userprofile', {
      templateUrl: 'partials/userprofile.html',
      controller: 'UserController',
      data: { authorization: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.run(['$rootScope', '$window', 'srvAuth', '$location', function($rootScope, $window, srvAuth,  $location) {

  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded
    FB.init({
      /* The app id of the web app */
      appId: '342408626135304',

      /*
       Adding a Channel File improves the performance
       of the javascript SDK, by addressing issues
       with cross-domain communication in certain browsers.
      */
      channelUrl: '../channel.html',

      /* Set if you want to check the authentication status at the start up of the app */
      status: true,

      /* Enable cookies to allow the server to access the session     */
      cookie: true,

      /* Parse XFBML */
      xfbml: true,

      /* FB SDK Version */
      version: 'v2.8'
    });
    srvAuth.watchLoginChange();
  };

  //srvAuth.testAPILogic();

  (function(d){
    // load the Facebook javascript SDK
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));

  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    console.log('routeChangeStart. rootScope user id: ', $rootScope.user.id)
    if ($rootScope.user.id == undefined) {
      // no logged user, we should be going to #login
      if ( next.templateUrl != "partials/home.html" ) {
        console.log('thinks no loged in user?');
        $location.path( "/home" );
      }
    }
  });
}]);
