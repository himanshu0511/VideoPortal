angular.module('videoPortal').controller('VideoDetailController', ['VideoService', '$scope', '$routeParams', function(VideoService, $scope, $routeParams){
  $scope = Object.assign($scope, { data: {id: $routeParams.id,video: {}, videos: []}});
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

