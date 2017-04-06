angular.module('videoPortal').controller('LogOutController', ['UserService', '$location', '$rootScope', function(UserService, $location, $rootScope){
  /**
   * Call to log user out and clear session and redirect to login page
   */
  return UserService.logOut().then(function(){
    $rootScope.$broadcast('UserLoggedOut');
      $location.path('/');
    })
    .catch(function(){
      $location.path('/')
    });
}]);
