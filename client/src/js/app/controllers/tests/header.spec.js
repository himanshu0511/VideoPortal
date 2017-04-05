describe('HeaderController', function() {
  beforeEach(function() {
      module('videoPortal');
    }
  );

  let $controller, $rootScope, returnUserInfo = true;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));
  UserService = {
    userInfo: jasmine.createSpy().and.returnValue({
      then: function(callback){
        if(returnUserInfo) {
          callback({
            userName: 'test',
            sessionId: 'testSessionId'
          });
        }
        return {
          catch: function(errorCallback){
            if(!returnUserInfo) {
              errorCallback();
            }
          },
        }
      }}),
  };

  it('calls UserService.userInfo on login event', function() {
    const controller = $controller('HeaderController', { UserService, $scope: $rootScope.$new() });
    $rootScope.$broadcast('UserLoggedIn');
    expect(UserService.userInfo).toHaveBeenCalled();
  });

  it('calls UserService.userInfo on logout event', function() {
    const controller = $controller('HeaderController', { UserService, $scope: $rootScope.$new() });
    $rootScope.$broadcast('UserLoggedOut');
    expect(UserService.userInfo).toHaveBeenCalled();
  });

  it('Set username in scope correctly on login event', function() {
    let $scope = $rootScope.$new();
    const controller = $controller('HeaderController', { UserService, $scope });
    $rootScope.$broadcast('UserLoggedIn');
    expect($scope.userData.userName).toEqual('test');
  });

  it('Set sessionId in scope correctly on login event', function() {
    let $scope = $rootScope.$new();
    const controller = $controller('HeaderController', { UserService, $scope });
    $rootScope.$broadcast('UserLoggedIn');
    expect($scope.userData.sessionId).toEqual('testSessionId');
  });

  it('removes username from scope on logout event', function() {
    let $scope = $rootScope.$new();
    returnUserInfo = false;
    const controller = $controller('HeaderController', { UserService, $scope });
    $rootScope.$broadcast('UserLoggedOut');
    expect(typeof $scope.userData.userName).toEqual('undefined');
    returnUserInfo = true;
  });

  it('removes sessionId from scope on logout event', function() {
    let $scope = $rootScope.$new();
    returnUserInfo = false;
    const controller = $controller('HeaderController', { UserService, $scope });
    $rootScope.$broadcast('UserLoggedOut');
    expect(typeof $scope.userData.sessionId).toEqual('undefined');
    returnUserInfo = true;
  });
});
