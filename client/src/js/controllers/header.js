angular.module('videoPortal').controller('HeaderController', ['UserService', '$scope', '$rootScope', function(UserService, $scope, $rootScope){
  $scope = Object.assign($scope, {userData: {userName: ''}});
  function updateHeaders (){
    UserService.userInfo()
     .then(function(userData){
       $scope.userData = userData;
       $scope.$apply();
      })
     .catch(function(){
       $scope.userData = {};
       $scope.$apply();
     });
  }
  $rootScope.$on('UserLoggedIn', function(){
    updateHeaders();
    debugger;
  });
  $rootScope.$on('UserLoggedOut', function(){
   updateHeaders();
  });
}]);
