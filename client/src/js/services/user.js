angular.module('videoPortal').factory('UserService', ['$cookies', 'UserApi', function($cookies, UserApi){
  return {
    authenticate: function(data) {
      return UserApi.authenticate({
        username: 'ali',
        password: '5f4dcc3b5aa765d61d8327deb882cf99'
      }).$promise.then(function(data) {
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
      return UserApi.logOut({sessionId: $cookies.get('sessionId')}).$promise;
    }
  }
}]);
