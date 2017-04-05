angular.module('videoPortal').controller('VideoDetailController', ['VideoService', '$scope', '$routeParams', '$location', function(VideoService, $scope, $routeParams, $location){
  $scope = Object.assign($scope, {
    data: {
      id: $routeParams.id,
      video: {},
      videos: []
    },
    watchVideo: function(id){
      $location.path(`/watch/${id}`);
    },
    fetchRating: VideoService.fetchRating,
    setRating: VideoService.setRating,
  });
  Promise.all([
    VideoService.getVideo($routeParams.id),
    VideoService.getVideos()
      ])
    .then(function([video, videos]){
      Object.assign($scope.data.video, video);
      Object.assign($scope.data.videos, videos);
      $scope.$apply();
    })
    .catch(function(error) {
      if(error && error.data && error.data.code === 'NotLoggedIn'){
        $location.path('/');
        $scope.$apply();
      }
    });
}]);

