angular.module('videoPortal').controller('HeaderController', ['UserService', '$scope', function(UserService, $scope){
  $scope = Object.assign($scope, {userData: {userName: ''}});
  UserService.userInfo()
     .then(function(userData){
       $scope.userData = userData;
       $scope.$apply();
      })
     .catch(function(){
       $scope.userData = {};
       $scope.$apply();
     })
}]);
