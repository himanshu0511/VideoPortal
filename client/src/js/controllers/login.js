angular.module('videoPortal').controller('LoginController', ['UserService', 'ConstantService', '$scope', '$location', function(UserService, constants, $scope, $location){
  $scope.loginFormData = {
    username: '',
    password: ''
  };
  debugger;
  $scope.formParams = constants.login;
  $scope.login = function(form){
    debugger;
    form.$setSubmitted();
    if(form.$valid) {
      UserService.authenticate($scope.loginFormData)
        .then(function () {
          $location.path('/play-list');
        });
    }
  }
}]);
