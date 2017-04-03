angular.module('videoPortal').controller('VideoDetailController', ['VideoService', '$scope', '$routeParams', '$location', function(VideoService, $scope, $routeParams, $location){
  $scope = Object.assign($scope, { data: {id: $routeParams.id,video: {}, videos: []}});
  $scope.watchVideo = function(id){
    $location.path(`/watch/${id}`);
  };
  Promise.all([
    VideoService.getVideo($routeParams.id),
    VideoService.getVideos()
      ])
    .then(function([video, videos]){
    Object.assign($scope.data.video, video);
    Object.assign($scope.data.videos, videos);
    $scope.$apply();
  });
}]);

