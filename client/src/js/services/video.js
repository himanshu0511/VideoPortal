angular.module('videoPortal').factory('VideoService', ['VideoApi', 'UserService', function(VideoApi, UserService){
  return {
    getVideos: function() {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.list({sessionId: userData.sessionId}).$promise.then(function(response){return response.data});
        });
    },
    getVideo: function(id) {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.get({videoId: id, sessionId: userData.sessionId}).$promise.then(function(response){return response.data});
        });
    },
    setRating: function(videoId, rating) {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.rate({sessionId: userData.sessionId}, {videoId, rating}).$promise.then(function(response){return response.data});
        });
    },
  }
}]);
