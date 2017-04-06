angular.module('videoPortal').factory('ConstantService', [function(){
  /**
   * Constants use for form validation
   */
  return {
    login: {
      username: {
        required: "required",
        minLength: 2,
        maxLength: 20,
        pattern: /^[a-zA-Z][a-zA-Z_0-9]*$/,
      },
      password: {
        required: "required",
        minLength: 6,
        maxLength: 50,
      }
    }
  }
}]);
