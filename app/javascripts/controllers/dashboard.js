roadrunnerControllers.controller('DashboardCtrl', ['$http', '$scope', '$pusher', 'Cookie', 'Company', 'Driver', 'Map',
  function($http, $scope, $pusher, Cookie, Company, Driver, Map) {

    $scope.kkk = { latitude: "28.5", longitude: "77.2" }
  $scope.driversMarkerList = {}
  $scope.tasksMarkerList = {};
  $scope.map = Map
  $scope.poliLines = {}

    var channel = $pusher(client).subscribe('location');
    channel.bind('update', function(data, scope) {
      scope.driversMarkerList[data.driver] = data.location
    }, $scope);

  $scope.companyName = function() {
    return Cookie.get("company_name");
  }

  $scope.fetchCityList = function() {
    var params = { api_key:  $scope.companyName() }
    Company.cityList(params, function(data) {
      $scope.cities = data.cities
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.fetchDetails = function(city) {
    var params = {
      api_key:  $scope.companyName(),
      city_id: city.id
    }
    Company.driverDetails(params, function(data) {
      $scope.unassignedTasks = data.unassigned_tasks
      $scope.drivers = data.drivers
    }, function(data) {
      alert(data.errors);
    })
    Map.get_geocodes(city.name, function(location) {
      $scope.map.config.center = location
    })
  }

  $scope.assignTaskToDriver = function(event, taskdata, driver) {
    params = { task_id: taskdata.id }
    Driver.assignTask(driver.id, params, function(data) {
      $scope.unassignedTasks = data.unassigned_tasks
      $scope.drivers = data.drivers
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.showMarkers = function(driver) {
    $scope.tasksMarkerList[driver.name] = []

    angular.forEach(driver.tasks, function(task) {
      Map.get_geocodes(task.address, function(location, _this) {
        _this["coords"] = location
        $scope.$digest();
      }, task)
    }, $scope)
  }


  $scope.getPolilineCoordinates = function(driver) {
    $scope.poliLines[driver.name] = $.map(driver.tasks, function(task) { return task.coords })
    if($scope.driversMarkerList[driver.name]) {
      $scope.poliLines[driver.name].unshift($scope.driversMarkerList[driver.name])
    }
  }

  $scope.markTaskAsDone = function(driver, task, index) {
    params = { task_id: task.id, driver_token: driver.token }

    Driver.markTaskAsDone(params, function(data) {
      driver.tasks.splice(index, 1);
      $scope.tasksMarkerList[driver.name].splice(index, 1);
      $scope.getPolilineCoordinates(driver)
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.setPriority = function(driver) {
    params = { task_ids: driver.tasks }

    Driver.setPriority(driver.id, params, function(data) {
      debugger
    }, function(data) {
      alert(data.errors);
    })
  }

  $scope.sortableOptions = {
    containment: '#sortable-container',
    accept: function (sourceItemHandleScope, destSortableScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    }
  }
  $scope.fetchCityList();
}]);
