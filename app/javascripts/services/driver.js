roadrunnerServices.factory('Driver', ['$http', 'Routes',
  function($http, Routes) {

  return {
    assignTask: function(driver_id, params, successCB, failureCB) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/drivers/' + driver_id + '/assign_task',
        params: params
      }).success(function(data, status, headers, config) {
        successCB(data);
      }).error(function(data, status, headers, config) {
        failureCB(data)
      })
    },

    markTaskAsDone: function(driver_id, task_id, successCB, failureCB) {
      // $http({
      //   method: 'PUT',
      //   url: 'http://localhost:3000/drivers/' + driver_id + '/mark_task_as_done',
      //   params: params
      // }).success(function(data, status, headers, config) {
      //   successCB(data);
      // }).error(function(data, status, headers, config) {
      //   failureCB(data)
      // })
    }
  }
}]);
