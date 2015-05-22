/* Controllers */
var roadrunnerControllers = angular.module('roadrunnerControllers', []);

roadrunnerControllers.controller('MainCtrl', ['$rootScope', '$scope', '$cookieStore',
  function($rootScope, $scope, $cookieStore) {

}]);

// Include all dependent js after initialization(EOF).
includeScripts([
  "javascripts/controllers/dashboard.js", "javascripts/controllers/login.js"
]);
