angular.module('videoPortal', ['ngRoute', 'ngCookies', 'ngResource', function(){}]);
angular.module('videoPortal').run(["$rootScope", "$location", "UserService", function($rootScope, $location, UserService){
  $rootScope.$on("$routeChangeStart", function(evt, to, from) {
      // requires authorization?
      if (to && to.authorize === true && !UserService.isAuthenticated()) {
        $location.path('/');
      }
      return true;
  });
}] );
