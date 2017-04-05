describe('VideoService', function () {
    let UserService, VideoService, httpBackend, $provide, VideoApi, returnRatings = true;
    beforeEach(function () {
      UserService = {
        userInfo: jasmine.createSpy().and.returnValue({then: function(callback){return callback({username: 'test', sessionId: 'testSessionId'});}}),
      };
      VideoApi = {
        list: jasmine.createSpy().and.returnValue({$promise: {then: function(callback){callback({data: [{ratings: returnRatings? [1, 5, 4, 2] : []}]})}}}),
        get: jasmine.createSpy().and.returnValue({$promise: {
          then: function(callback){
            let returnedValue = callback({data: {ratings: returnRatings? [1, 5, 4, 2] : []}});
            return {then:
              function(finalCallback) {
                finalCallback(returnedValue);
              }
            };
          }
        } }),
        rate: jasmine.createSpy().and.returnValue({$promise: {then: function(callback){callback({data: {}})}}}),
      };
      module('videoPortal', ['$provide', function(_$provide_){
        $provide = _$provide_;
        $provide.value('UserService', UserService);
        $provide.value('VideoApi', VideoApi);
      }]);
      inject(function ($httpBackend, _VideoService_) {
          VideoService = _VideoService_;
          httpBackend = $httpBackend;
      });
    });
    describe('getVideo', function () {
      it('calls userService user info to fetch session data', function () {
        VideoService.getVideo('testId');
        expect(UserService.userInfo).toHaveBeenCalled();
      });
      it('call correct video service function with correct arguments', function () {
        VideoService.getVideo('testId');
        expect(VideoApi.get).toHaveBeenCalledWith({videoId: 'testId', sessionId: 'testSessionId'});
      });
      it('set rating 0 in case of no ratings', function (done) {
        returnRatings = false;
        VideoService.getVideo('testId').then(function(data) {
          expect(data.rating).toEqual(0);
          done();
        });
        returnRatings = true;
      });
    });
    describe('getVideos', function () {
      it('calls userService user info to fetch session data', function () {
        VideoService.getVideos();
        expect(UserService.userInfo).toHaveBeenCalled();
      });
      it('call correct video service function with correct arguments', function () {
        VideoService.getVideos();
        expect(VideoApi.list).toHaveBeenCalledWith({sessionId: 'testSessionId'});
      });
    });
    describe('setRating', function () {
      it('calls userService user info to fetch session data', function () {
        VideoService.setRating('testId', 4);
        expect(UserService.userInfo).toHaveBeenCalled();
      });
      it('call correct video service function with correct arguments', function () {
        VideoService.setRating('testId', 4);
        expect(VideoApi.rate).toHaveBeenCalledWith({sessionId: 'testSessionId'}, { videoId: 'testId', rating: 4 });
      });
    });

});
