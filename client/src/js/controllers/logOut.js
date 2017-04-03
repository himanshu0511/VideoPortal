angular.module('videoPortal').controller('LogOutController', ['UserService', '$location', function(UserService, $location){
  return UserService.logOut().then(function(){
    $location.path('/');
  })
    .catch(function(){
      $location.path('/')
    })
}]);
