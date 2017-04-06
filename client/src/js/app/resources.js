angular.module("videoPortal")


/**
 * Resource to get Video Resource from backend
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

/**
 * Resource to authenticate, logout user
 */
  .factory("UserApi", ["$resource", function($resource) {
  return $resource('/user/auth', {
    id: "@id"
  }, {
    'authenticate': {
      method: 'POST',
      isArray: false
    },
    'logOut': {
      method: 'GET',
      url: '/user/logout'
    }
  });
}]);

