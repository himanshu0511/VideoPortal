angular.module('videoPortal').controller('VideoListController', ['VideoService', '$scope', '$location', function(VideoService, $scope, $location){
  /**
   * Intialize $scope for initial rendering
   * @type {*}
   */
  $scope = Object.assign($scope, {
    data: {
      videos: []
    },
    /**
     * Function to load different video
     * @param id
     */
    watchVideo: function(id){
      $location.path(`/watch/${id}`);
    },
  });

  /**
   * Service call to fetch list of videos to be displayed
   */
  VideoService.getVideos().then(function(videos) {
      $scope.data.videos = videos;
      $scope.$apply();
    })
    .catch(function(error) {
      if(error && error.data && error.data.code === 'NotLoggedIn'){
        $location.path('/');
        $scope.$apply();
      }
    });
}]);
