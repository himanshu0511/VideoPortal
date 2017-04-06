angular.module('videoPortal', ['ngRoute', 'ngCookies', 'ngResource', 'jkAngularRatingStars', 'ngMessages', 'angular-lazy-loader',  function(){}]);
angular.module('videoPortal').run(["$rootScope", "$location", "UserService", function($rootScope, $location, UserService){
  $rootScope.$on("$routeChangeStart", function(evt, to, from) {
    if (to && to.authorize === true && !UserService.isAuthenticated()) {
        $location.path('/');
      }
      // return true;
  });
}] );
