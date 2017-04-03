angular.module('videoPortal').controller('VideoListController', ['VideoService', '$scope', '$location', function(VideoService, $scope, $location){
  $scope = Object.assign($scope, { data: { videos: [] } });
  $scope.watchVideo = function(id){
    $location.path(`/watch/${id}`);
  };
  VideoService.getVideos().then(function(videos) {
      $scope.data.videos = videos;
      $scope.$apply();
    });
}]);
