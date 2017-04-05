describe('LoginController', function() {
  beforeEach(function() {
      module('videoPortal');
      module('templates');
    }
  );

  let $controller, $templateCache, $compile, $rootScope;

  beforeEach(inject(function(_$controller_, _$templateCache_, _$compile_, _$rootScope_){
    $controller = _$controller_;
    $templateCache = _$templateCache_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('intialization', function() {

    it('username is initialized with empty string', function() {
      const $scope = {$apply: function(){}};
      const controller = $controller('LoginController', { $scope: $scope });
      expect($scope.loginFormData.username).toEqual('');
    });

    it('password is initialized with empty string', function() {
      const $scope = {$apply: function(){}};
      const controller = $controller('LoginController', { $scope: $scope });
      expect($scope.loginFormData.password).toEqual('');
    });

    it('login function is made part of scope', function() {
      const $scope = {$apply: function(){}};
      const controller = $controller('LoginController', { $scope: $scope });
      expect(typeof $scope.login).toEqual('function');
    });

    it('form constants are set', function() {
      const $scope = {$apply: function(){}};
      const controller = $controller('LoginController', { $scope: $scope });
      expect(typeof $scope.formParams).toEqual('object');
    });

  });
  describe('validations', function() {
    it('username is required', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.username.$error.required).toBeTruthy();
    });

    it('password is required', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.password.$error.required).toBeTruthy();
    });

    it('username min length is 2', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $scope.loginFormData.username = 'I';
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.username.$error.minlength).toBeTruthy();

      $scope.loginFormData.username = 'It';
      $scope.$apply();
      expect($scope.loginForm.username.$error.minlength).toBeFalsy();
    });

    it('username min length is 20', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $scope.loginFormData.username = 'ABCDEFGHIJKLMNOPQRSTU';
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.username.$error.maxlength).toBeTruthy();

      $scope.loginFormData.username = 'ABCDEFGHIJKLMNOPQRST';
      $scope.$apply();
      expect($scope.loginForm.username.$error.maxlength).toBeFalsy();
    });

    it('password min length is 6', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $scope.loginFormData.password = '12345';
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.password.$error.minlength).toBeTruthy();

      $scope.loginFormData.password = '123456';
      $scope.$apply();
      expect($scope.loginForm.password.$error.minlength).toBeFalsy();
    });

    it('password max length is 50', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) {}}}}},
      } });
      $scope.loginFormData.password = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXY';
      $compile(formElem)($scope);
      $scope.$apply();
      expect($scope.loginForm.password.$error.maxlength).toBeTruthy();

      $scope.loginFormData.password = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWX';
      $scope.$apply();
      expect($scope.loginForm.password.$error.maxlength).toBeFalsy();
    });

    it('On username or password error invalidate form', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { return {catch: function(errorCallback) { errorCallback({data: {code: 'InvalidUserNameOrPassword'}})}}}}},
      } });
      $scope.loginFormData.password = '123456';
      $scope.loginFormData.username = 'testuser';
      $compile(formElem)($scope);
      $scope.$apply();
      $scope.login($scope.loginForm);
      expect($scope.loginForm.$error.validUserNameAndPassword).toBeTruthy();
    });
    it('On server error invalidate form', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      const controller = $controller('LoginController', { $scope: $scope, UserService: {
        authenticate: () => {return {then: function(callback) { return {catch: function(errorCallback) { errorCallback({data: {code: 'randomError'}})}}}}},
      } });
      $scope.loginFormData.password = '123456';
      $scope.loginFormData.username = 'testuser';
      $compile(formElem)($scope);
      $scope.$apply();
      $scope.login($scope.loginForm);
      expect($scope.loginForm.$error.serverStatus).toBeTruthy();
    });
  });
  describe('api call success', function(){

    it('redirects to /play-list', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      let $location = {
        path: jasmine.createSpy(),
      };
      const controller = $controller('LoginController', { $location, $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) { }}}}},
      } });
      $scope.loginFormData.password = '123456';
      $scope.loginFormData.username = 'testuser';
      $compile(formElem)($scope);
      $scope.$apply();
      $scope.login($scope.loginForm);
      expect($location.path).toHaveBeenCalledWith('/play-list');
    });

    it('broadcat event UserLoggedIn', function() {
      let $scope = $rootScope.$new();
      let templateHtml = $templateCache.get('src/views/login.html');
      let formElem = angular.element("<div>" + templateHtml + "</div>");
      let $location = {
        path: jasmine.createSpy(),
      };
      spyOn($rootScope, '$broadcast').and.callThrough();
      const controller = $controller('LoginController', { $location, $scope, UserService: {
        authenticate: () => {return {then: function(callback) { callback(); return {catch: function(errorCallback) { }}}}},
      } });
      $scope.loginFormData.password = '123456';
      $scope.loginFormData.username = 'testuser';
      $compile(formElem)($scope);
      $scope.$apply();
      $scope.login($scope.loginForm);
      expect($rootScope.$broadcast).toHaveBeenCalledWith('UserLoggedIn');
    });
  })
});
