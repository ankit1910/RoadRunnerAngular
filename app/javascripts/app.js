'use strict';

/* App Module */

var roadrunner = angular.module('roadrunner', [
  'ngRoute',
  'ngCookies',
  'roadrunnerControllers',
  'roadrunnerServices',
  'ang-drag-drop',
  'uiGmapgoogle-maps',
  'pusher-angular',
  'ui.sortable'
]);

window.client = new Pusher('e409e0060e42dfb30b4f');

roadrunner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dash'
      }).
      when('/create_deliveries', {
        templateUrl: 'partials/create_deliveries.html',
        controller: 'DeliveryCtrl'
      }).
      when('/assign_devices', {
        templateUrl: 'partials/assign_devices.html',
        controller: 'DeviceCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }
]);
