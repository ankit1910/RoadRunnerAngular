roadrunnerServices.factory('Company', ['$http', 'Routes',
  function($http, Routes) {

  return {
    cityList: function(params, successCB, failureCB) {
      $http({
        method: 'GET',
        url: Routes.Api.companyCityListPath,
        params: params
      }).success(function(data, status, headers, config) {
        successCB(data);
      }).error(function(data, status, headers, config) {
        failureCB(data)
      })
    },

    driversList: function(params, successCB, failureCB) {
      $http({
        method: 'GET',
        url: Routes.Api.companyDriversListPath,
        params: params
      }).success(function(data, status, headers, config) {
        successCB(data);
      }).error(function(data, status, headers, config) {
        failureCB(data)
      })
    },

    driverDetails: function(params, successCB, failureCB) {
      $http({
        method: 'GET',
        url: Routes.Api.companyDetailsPath,
        params: params
      }).success(function(data, status, headers, config) {
        successCB(data);
      }).error(function(data, status, headers, config) {
        failureCB(data)
      })
    }
  }
}]);
