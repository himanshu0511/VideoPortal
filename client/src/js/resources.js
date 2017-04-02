angular.module("videoPortal")


/*
 * Resource to get the details of a Candidate
 *
 */
.factory("VideoApi", ["$resource", function($resource) {
  return $resource('/videos', {
    id: "@id"
  }, {
    'list': {
      method: 'GET',
      isArray: false

    },
    'get': {
      method: 'GET',
      isArray: false,
      url: '/video'
    },
    'rate': {
      method: 'POST',
      isArray: false,
      url: '/video/ratings'
    }
  });
}])

.factory("UserApi", ["$resource", function($resource) {
  return $resource('/user/auth', {
    id: "@id"
  }, {
    'authenticate': {
      method: 'POST',
      isArray: false
    },
    'logout': {
      method: 'GET',
      url: '/user/logout'
    }
  });
}]);

