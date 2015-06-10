roadrunnerServices.factory('Delivery', ['$http', 'Routes',
  function($http, Routes) {

  return {
    create: function(params, successCB, failureCB) {
      $http({
        method: 'POST',
        url: Routes.Api.driverCreatePath,
        data: params
      }).success(function(data, status, headers, config) {
        successCB(data);
      }).error(function(data, status, headers, config) {
        failureCB(data)
      })
    }
  }
}]);
