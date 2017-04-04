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
});
