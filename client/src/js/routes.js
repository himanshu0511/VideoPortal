angular.module("videoPortal").config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
});
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
}]);
