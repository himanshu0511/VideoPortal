angular.module('videoPortal').controller('VideoListController', ['VideoService', '$scope', function(VideoService, $scope){
  $scope = Object.assign($scope, { data: { videos: [] } });
  VideoService.getVideos().then(function(videos) {
      $scope.data.videos = videos;
      $scope.$apply();
    });
}]);
