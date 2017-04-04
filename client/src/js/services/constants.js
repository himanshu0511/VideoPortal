angular.module('videoPortal').factory('ConstantService', [function(){
  return {
    login: {
      username: {
        required: "required",
        minLength: 4,
        maxLength: 10,
        pattern: /^[a-zA-Z][a-zA-Z_0-9]*$/,
      },
      password: {
        required: "required",
        minLength: 6,
        maxLength: 20,
      }
    }
  }
}]);
