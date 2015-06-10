roadrunnerControllers.controller('DeviceCtrl', ['$scope', '$location', 'Cookie', 'Company', 'Driver',
  function($scope, $location, Cookie, Company, Driver) {

  $scope.companyName = function() {
    return Cookie.get("company_name");
  }

  $scope.fetchDriversList = function() {
    var params = { api_key:  $scope.companyName() }

    Company.driversList(params, function(data) {
      $scope.drivers = data.drivers
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.updateToken = function(driver) {
    var params = { token: driver.token }

    Driver.updateToken(driver.id, params, function(data) {
      $location.url('/dashboard').replace()
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.fetchDriversList()
}]);
