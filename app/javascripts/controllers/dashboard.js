roadrunnerControllers.controller('DashboardCtrl', ['$http', '$scope', '$pusher', 'Cookie', 'Company', 'Driver', 'Map',
  function($http, $scope, $pusher, Cookie, Company, Driver, Map) {

    $scope.driversMarkerList = {
      "lavish.mehta": { latitude: "28.6", longitude: "77.1" },
      "devanshuu": { latitude: "28.5", longitude: "77.15" }
    };
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
        driver.tasks.push(taskdata);
      }, function(data) {
        alert(data.errors);
      })
    }

    $scope.removeFromUnassignedTasks = function(event, index, tasks) {
      $scope.unassignedTasks.splice(index, 1);
    }

    $scope.showMarkers = function(driver) {
      $scope.tasksMarkerList[driver.name] = []

      angular.forEach(driver.tasks, function(task) {
        Map.get_geocodes(task.address, function(location) {
          $scope.tasksMarkerList[driver.name].push(location)
          $scope.$digest();
          $scope.getPolilineCoordinates(driver)
        })
      }, $scope)
    }

    $scope.getPolilineCoordinates = function(driver) {
      $scope.poliLines[driver.name] = $scope.tasksMarkerList[driver.name].slice()
      $scope.poliLines[driver.name].unshift($scope.driversMarkerList[driver.name])
    }

    $scope.markTaskAsDone = function(driver, task, index) {
      params = { task_id: task.id }

      // Driver.markTaskAsDone(driver.id, params, function(data) {
        driver.tasks.splice(index, 1);
        $scope.tasksMarkerList[driver.name].splice(index, 1);
        $scope.getPolilineCoordinates(driver)
      // }, function(data) {
        // alert(data.errors);
      // })
    }
    $scope.fetchCityList();




    // $scope.markerList = [];

    // var pusher = $pusher(client);
    // channel = pusher.subscribe('location');

    // channel.bind('update', function(data, scope) {
    //   scope.marker[data.driver] = data.location
    // }, $scope);

    // $scope.map = { center: { latitude: 28.7, longitude: 77 }, zoom: 10 };

    // get_geocoder = function (address) {
    //   var geocoder = new google.maps.Geocoder();
    //   geocoder.geocode( { "address": address }, function(results, status) {
    //     if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
    //       var location = results[0].geometry.location;
    //       $scope.markerList.push({ latitude: location.A, longitude: location.F })
    //     }
    //   });
    // }
}]);
