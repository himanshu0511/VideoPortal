angular.module("videoPortal").config(["$routeProvider", "$locationProvider", "$compileProvider", function($routeProvider, $locationProvider, $compileProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $compileProvider.debugInfoEnabled(false);
  $routeProvider
      .when('/', {
        controller: 'LoginController',
        templateUrl: '/src/views/login.html',
      })
      .when('/play-list', {
        controller: 'VideoListController',
        templateUrl: '/src/views/videoList.html',
        authorize: true,
      })
      .when('/watch/:id', {
        controller: 'VideoDetailController',
        templateUrl: '/src/views/videoDetail.html',
        authorize: true,
      })
      .when('/logout', {
        controller: 'LogOutController',
        template: "",
        authorize: true,
      })
}]);
