angular.module('videoPortal').factory('VideoService', ['VideoApi', 'UserService', function(VideoApi, UserService){
  function aggregateRating(video){
      if(video && video.ratings && video.ratings.length !== 0 && video.ratings.reduce) {
        return Math.round(video.ratings.reduce((agg, a) => agg + a, 0) / video.ratings.length);
      }
      return 0;
    }
  return {
    getVideos: function() {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.list({sessionId: userData.sessionId}).$promise.then(function(response){return response.data.map((video) => Object.assign(video, {rating: aggregateRating(video)}))});
        });
    },
    getVideo: function(id) {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.get({videoId: id, sessionId: userData.sessionId}).$promise.then(function(response){
            return Object.assign(response.data, {rating: aggregateRating(response.data)});
          });
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
