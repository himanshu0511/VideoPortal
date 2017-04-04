describe('LogOutController', function() {
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

  it('logout service call correctly called', function() {
    const UserService = {
      logOut: jasmine.createSpy()
        .and.returnValue({
          then: function (successCallback) {
            successCallback();
            return {
              catch: function (errorCallback) { }
            };
          }
        })
    };
    const controller = $controller('LogOutController', { UserService });
    expect(UserService.logOut).toHaveBeenCalled();
  });

  it('redirection to correct url', function() {
    const UserService = {
      logOut: jasmine.createSpy()
        .and.returnValue({
            then: function(successCallback){
              successCallback();
              return {
                catch: function(errorCallback){ }
              };
            },
          }),
    };

    const $location = {
      path: jasmine.createSpy(),
    };

    const controller = $controller('LogOutController', { UserService, $location });
    expect($location.path).toHaveBeenCalledWith('/');
  });
});
