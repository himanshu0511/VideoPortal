angular.module('videoPortal').controller('LoginController', ['UserService', 'ConstantService', '$scope', '$location', '$rootScope', function(UserService, constants, $scope, $location, $rootScope){
  $scope.loginFormData = {
    username: '',
    password: ''
  };
  $scope.formParams = constants.login;
  $scope.login = function(form){
    form.$setSubmitted();
    form.$setValidity('validUserNameAndPassword', true);
    form.$setValidity('serverStatus', true);
    if(form.$valid) {
      UserService.authenticate($scope.loginFormData)
        .then(function () {
          $location.path('/play-list');
          $rootScope.$broadcast('UserLoggedIn');
        })
        .catch((error) => {
          if(error && error.data && error.data.code === 'InvalidUserNameOrPassword') {
            form.$setValidity('validUserNameAndPassword', false);
          }
          else{
            form.$setValidity('serverStatus', false)
          }
        })
    }
  };
  $scope.clearServerError = function(){
    $scope.loginForm.$setValidity('validUserNameAndPassword', true);
    $scope.loginForm.$setValidity('serverStatus', true);
  }
}]);
