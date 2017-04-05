describe('UserService', function () {
    let UserService, httpBackend, $provide, userApi, $cookies, cookieReturnUndefined = false;
    beforeEach(function () {
      userApi = {
        authenticate: jasmine.createSpy().and.returnValue({$promise: {then: function(callback){callback({username: 'test', sessionId: 'testSessionId'})}}}),
        logOut: jasmine.createSpy().and.returnValue({$promise: {then: function(callback){callback()}}}),
      };
      $cookies = {
        remove: jasmine.createSpy().and.returnValue(),
        put: jasmine.createSpy().and.returnValue(),
        get: jasmine.createSpy().and.callFake(function(key){
          if(!cookieReturnUndefined) {
            switch (key) {
              case 'sessionId':
                return 'testSessionId';
              case 'userName':
                return 'test';
            }
          }
          else{
            return undefined;
          }
        }),
      };
      module('videoPortal', ['$provide', function(_$provide_){
        $provide = _$provide_;
        $provide.value('UserApi', userApi);
        $provide.value('$cookies', $cookies);
      }]);
      inject(function ($httpBackend, _UserService_) {
          UserService = _UserService_;
          httpBackend = $httpBackend;
      });
    });
    describe('authenticate', function () {
      it('Uses correct api call to authenticate', function () {
        UserService.authenticate({username: 'test', password: 'testpassword'});
        expect(userApi.authenticate).toHaveBeenCalledWith({username: 'test', password: 'testpassword'});
      });

      it('sets session id cookie after success', function () {
        UserService.authenticate({username: 'test', password: 'testpassword'});
        expect($cookies.put).toHaveBeenCalledWith('sessionId', 'testSessionId');
      });

      it('sets username cookie after success', function () {
        UserService.authenticate({username: 'test', password: 'testpassword'});
        expect($cookies.put).toHaveBeenCalledWith('userName', 'test');
      });
    });
    describe('isAuthenticated', function () {
      it('checks cookie sessionId', function () {
        UserService.isAuthenticated();
        expect($cookies.get).toHaveBeenCalledWith('sessionId');
      });
    });
    describe('userInfo', function () {
      it('gets sessionId cookie', function () {
        UserService.userInfo();
        expect($cookies.get).toHaveBeenCalledWith('sessionId');
      });
      it('gets userName cookie', function () {
        UserService.userInfo();
        expect($cookies.get).toHaveBeenCalledWith('userName');
      });
      it('in case of cookie missing returns rejected promise', function () {
        spyOn(Promise, 'reject');
        cookieReturnUndefined = true;
        UserService.userInfo();
        cookieReturnUndefined = false;
        expect(Promise.reject).toHaveBeenCalled();
      });
    });
    describe('logOut', function () {
      it('gets sessionId cookie', function () {
        UserService.logOut('testSessionId');
        expect($cookies.get).toHaveBeenCalledWith('sessionId');
      });
      it('calls correct api service', function () {
        UserService.logOut('testSessionId');
        expect(userApi.logOut).toHaveBeenCalledWith({ sessionId: 'testSessionId' });
      });
      it('removes sessionId cookie', function () {
        UserService.logOut('testSessionId');
        expect($cookies.remove).toHaveBeenCalledWith('sessionId');
      });
      it('removes userName cookie', function () {
        UserService.logOut('testSessionId');
        expect($cookies.remove).toHaveBeenCalledWith('userName');
      });
    });
});
