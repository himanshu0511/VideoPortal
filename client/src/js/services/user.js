angular.module('videoPortal').factory('UserService', ['$cookies', 'UserApi', function($cookies, UserApi){
  return {
    authenticate: function(formData) {
      return UserApi.authenticate(formData).$promise
        .then(function(data) {
          $cookies.put('sessionId', data.sessionId);
          $cookies.put('userName', data.username);
          return data;
      });
    },
    isAuthenticated: function(){
      return $cookies.get('sessionId');
    },
    userInfo: function(data) {

      if($cookies.get('sessionId') && $cookies.get('userName')){
        return Promise.resolve({
          sessionId: $cookies.get('sessionId'),
          userName: $cookies.get('userName')
        });
      }
      return Promise.reject({status: 'error', message: 'User Data Missing', code: 'NotLoggedIn'});
    },
    logOut: function() {
      return UserApi.logOut({sessionId: $cookies.get('sessionId')}).$promise.then((data) => {
        $cookies.remove('userName');
        $cookies.remove('sessionId');
        return data;
      });
    }
  }
}]);
