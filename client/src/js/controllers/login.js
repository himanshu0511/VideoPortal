angular.module('videoPortal').controller('LoginController', ['UserService', '$scope', '$location', function(UserService, $scope, $location){
  $scope.loginFormData = {
    userName: '',
    password: ''
  };
  $scope.login = function(){
    UserService.authenticate($scope.loginFormData)
      .then(function(){
        $location.path('/play-list');
      });
  }
}]);
