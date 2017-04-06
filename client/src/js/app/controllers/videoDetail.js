angular.module('videoPortal').controller('VideoDetailController', ['VideoService', '$scope', '$routeParams', '$location', '$window', '$timeout', function(VideoService, $scope, $routeParams, $location, $window, $timeout){
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
      $window.scrollTo(0, 0);
      $scope.$apply();
    })
    .catch(function(error) {
      if(error && error.data && error.data.code === 'NotLoggedIn'){
        $location.path('/');
        $scope.$apply();
      }
    });
    $timeout(function(){
      let element = $window.document.getElementById($routeParams.id);
      if(element) {
        element.scrollIntoView(true);
        element.focus();
      }
    }, 500);
}]);

