angular.module('videoPortal').factory('VideoService', ['VideoApi', 'UserService', function(VideoApi, UserService){
  /**
   * Function to aggregate rating a video
   * @param video
   * @returns {number}
   */
  function aggregateRating(video){
      if(video && video.ratings && video.ratings.length !== 0 && video.ratings.reduce) {
        return Math.round(video.ratings.reduce((agg, a) => agg + a, 0) / video.ratings.length);
      }
      return 0;
    }
  return {
    /**
     * Function to make api call to fetch videos list
     * @returns {*|{catch}}
     */
    getVideos: function() {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.list({sessionId: userData.sessionId}).$promise.then(function(response){return response.data.map((video) => Object.assign(video, {rating: aggregateRating(video)}))});
        });
    },
    /**
     * Function to make api call to fetch a specific video
     * @param id
     * @returns {*|{catch}}
     */
    getVideo: function(id) {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.get({videoId: id, sessionId: userData.sessionId}).$promise.then(function(response){
            return Object.assign(response.data, {rating: aggregateRating(response.data)});
          });
        });
    },
    /**
     * Function to set user rating for video
     * @param videoId
     * @param rating
     * @returns {*|{catch}}
     */
    setRating: function(videoId, rating) {
      return UserService.userInfo()
        .then(function(userData){
          return VideoApi.rate({sessionId: userData.sessionId}, {videoId, rating}).$promise.then(function(response){return response.data});
        });
    },
  }
}]);
