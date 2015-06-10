roadrunnerControllers.controller('DeliveryCtrl', ['$scope', '$location', 'Cookie', 'Company', 'Delivery',
  function($scope, $location, Cookie, Company, Delivery) {

  $scope.form = {};

  $scope.fetchCityList = function() {
    var params = { api_key:  $scope.companyName() }
    Company.cityList(params, function(data) {
      $scope.cities = data.cities
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.companyName = function() {
    return Cookie.get("company_name");
  }

  $scope.submit = function () {
    var params = {
      delivery: {
        package_number: $scope.package_number,
        city_id: $scope.city.id,
        address: $scope.address
      },
      api_key: $scope.companyName()
    }

    Delivery.create(params, function(data) {
      $location.url('/dashboard').replace()
    }, function() {
      alert("error")
    })
  }

  $scope.fetchCityList();
}]);
