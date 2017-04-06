angular.module('videoPortal').controller('HeaderController', ['UserService', '$scope', '$rootScope', function(UserService, $scope, $rootScope){
  $scope = Object.assign($scope, {userData: {userName: ''}});

  /**
   * Function to update header details
   */
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

  /**
   * Initialize Header on first load
   */
  updateHeaders();

  /**
   * Update Headers when user logs in
   */
  $rootScope.$on('UserLoggedIn', function(){
    updateHeaders();
  });

  /**
   * Update Headers when user logs out
   */
  $rootScope.$on('UserLoggedOut', function(){
    updateHeaders();
  });
}]);
