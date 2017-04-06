angular.module('videoPortal', ['ngRoute', 'ngCookies', 'ngResource', 'jkAngularRatingStars', 'ngMessages', 'angular-lazy-loader', 'ngAnimate',  function(){}]);
angular.module('videoPortal').run(["$rootScope", "$location", "UserService", function($rootScope, $location, UserService){
  /**
   * Event listener to only allow authenticated user to route to page which required authentication
   */
  $rootScope.$on("$routeChangeStart", function(evt, to, from) {
    if (to && to.authorize === true && !UserService.isAuthenticated()) {
        $location.path('/');
      }
  });
}] );
