describe('VideoListController', function() {
  beforeEach(function() {
      module('videoPortal');
    }
  );

  let $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));


  it('video list service call', function() {
    const VideoService = {
      getVideo: jasmine.createSpy()
        .and.returnValue({
          then: function (successCallback) {
            successCallback();
            return {
              catch: function (errorCallback) { }
            };
          }
        }),
      getVideos: jasmine.createSpy()
        .and.returnValue({
          then: function (successCallback) {
            successCallback();
            return {
              catch: function (errorCallback) { }
            };
          }
        }),
    };
    const id = 12345;
    const $routeParams = { id };
    const controller = $controller('VideoListController', { VideoService, $scope: $rootScope.$new() });
    expect(VideoService.getVideos).toHaveBeenCalled();
  });


  it('video list unauthorized redirects to login page', function() {
    const VideoService = {
      getVideos: jasmine.createSpy()
        .and.returnValue({
              then: function (successCallback) {
                return {
                  catch: function (errorCallback) { errorCallback({data: {code: 'NotLoggedIn'}}) },
                };
              }
            })
    };
    const $location = {
      path: jasmine.createSpy().and.returnValue({}),
    };
    const id = 12345;
    const controller = $controller('VideoListController', { VideoService, $scope: $rootScope.$new(), $location });
    expect($location.path).toHaveBeenCalledWith('/');
  });

  it('watch video function in scope redirects to video detail page', function() {

    const VideoService = {
      getVideos: jasmine.createSpy()
        .and.returnValue({
          then: function (successCallback) {
            successCallback();
            return {
              catch: function (errorCallback) { }
            };
          }
        }),
    };
    const $location = {
      path: jasmine.createSpy().and.returnValue({}),
    };
    const id = 12345;
    const $scope = $rootScope.$new();
    const controller = $controller('VideoListController', { VideoService, $scope, $location });
    $scope.watchVideo('testId');
    expect($location.path).toHaveBeenCalledWith('/watch/testId');
  });
});
