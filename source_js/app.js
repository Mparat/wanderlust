var app = angular.module('wanderlust',['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
