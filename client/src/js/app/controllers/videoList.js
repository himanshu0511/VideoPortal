angular.module('videoPortal').controller('VideoListController', ['VideoService', '$scope', '$location', function(VideoService, $scope, $location){
  $scope = Object.assign($scope, {
    data: {
      videos: []
    },
    watchVideo: function(id){
      $location.path(`/watch/${id}`);
    },
  });
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
