angular.module('videoPortal').controller('VideoDetailController', ['VideoService', '$scope', '$routeParams', '$location', '$window', '$timeout', function(VideoService, $scope, $routeParams, $location, $window, $timeout){
  /**
   * Initialize $Scope for initial rendering
   * @type {*}
   */
  $scope = Object.assign($scope, {
    data: {
      id: $routeParams.id,
      video: {},
      videos: []
    },
    /**
     * Function to redirec video details page
     * @param id
     */
    watchVideo: function(id){
      $location.path(`/watch/${id}`);
    },
    /**
     * Function to set user rating
     */
    setRating: VideoService.setRating,
  });

  /**
   * Service calls to fetch videos need to be displayed
   */
  Promise.all([
    VideoService.getVideo($routeParams.id),
    VideoService.getVideos()
      ])
    .then(function([video, videos]){
      Object.assign($scope.data.video, video);
      Object.assign($scope.data.videos, videos);
      $window.scrollTo(0, 0);
      $scope.$apply();
    })
    .catch(function(error) {
      if(error && error.data && error.data.code === 'NotLoggedIn'){
        $location.path('/');
        $scope.$apply();
      }
    });
}]);

