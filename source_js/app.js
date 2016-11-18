var app = angular.module('wanderlust',['ngRoute', 'myApp']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'MainController'
    })
    .when('/gallery', {
      templateUrl: 'partials/gallery.html',
      controller: 'MainController'
    })
    .when('/map', {
      templateUrl: 'partials/map.html',
      controller: 'MapController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
