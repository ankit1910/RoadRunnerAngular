
roadrunnerControllers.controller('LoginCtrl', ['$http', '$scope', '$location', '$cookieStore',
  function($http, $scope, $location, $cookieStore) {

  $scope.loginForm = {}

  $scope.goToDashboard = function() {
    var params = $scope.loginForm

    $http({
      method: 'GET',
      url: 'http://localhost:3000/companies/validate',
      params: params
    }).success(function(data, status, headers, config) {
      if(data.is_valid) {
        $cookieStore.put('company_name', data.name);
        $location.url('/dashboard').replace()
      }
    }).error(function(data, status, headers, config) {
      alert("error");
    })
  }
}]);
