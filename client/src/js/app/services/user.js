angular.module('videoPortal').factory('UserService', ['$cookies', 'UserApi', function($cookies, UserApi){
  return {
    /**
     * Function to make api call to authenticate user and set session on success
     * @param formData
     * @returns {*}
     */
    authenticate: function(formData) {
      return UserApi.authenticate(formData).$promise
        .then(function(data) {
          $cookies.put('sessionId', data.sessionId);
          $cookies.put('userName', data.username);
          return data;
      });
    },
    /**
     * Function to check if user is authenticated using session id
     * @returns {*|string}
     */
    isAuthenticated: function(){
      return $cookies.get('sessionId');
    },
    /**
     * Function to fetch user data
     * @param data
     * @returns {*}
     */
    userInfo: function(data) {

      if($cookies.get('sessionId') && $cookies.get('userName')){
        return Promise.resolve({
          sessionId: $cookies.get('sessionId'),
          userName: $cookies.get('userName')
        });
      }
      return Promise.reject({status: 'error', message: 'User Data Missing', code: 'NotLoggedIn'});
    },
    /**
     * Function to log user out and clear session
     * @returns {*}
     */
    logOut: function() {
      return UserApi.logOut({sessionId: $cookies.get('sessionId')}).$promise.then((data) => {
        $cookies.remove('userName');
        $cookies.remove('sessionId');
        return data;
      });
    }
  }
}]);
