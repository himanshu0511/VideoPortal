angular.module('videoPortal').controller('LoginController', ['UserService', 'ConstantService', '$scope', '$location', '$rootScope', function(UserService, constants, $scope, $location, $rootScope){
  /**
   * Initialize scope for first load
   * @type {{username: string, password: string}}
   */
  $scope.loginFormData = {
    username: '',
    password: ''
  };

  /**
   * Set form contants for validation
   * @type {*}
   */
  $scope.formParams = constants.login;

  /**
   * Function to make call to login and set server errors
   * @param form
   */
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

  /**
   * Function to clear server when user inputs value in any field
   */
  $scope.clearServerError = function(){
    $scope.loginForm.$setValidity('validUserNameAndPassword', true);
    $scope.loginForm.$setValidity('serverStatus', true);
  }
}]);
