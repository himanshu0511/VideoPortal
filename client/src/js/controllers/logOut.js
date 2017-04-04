angular.module('videoPortal').controller('LogOutController', ['UserService', '$location', '$rootScope', function(UserService, $location, $rootScope){
  return UserService.logOut().then(function(){
    $rootScope.$broadcast('UserLoggedOut');
      $location.path('/');
    })
    .catch(function(){
      $location.path('/')
    });
}]);
