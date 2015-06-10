var roadrunnerServices = angular.module('roadrunnerServices', []);


// Include all dependent js after initializatio(EOF).
includeScripts([
  "javascripts/services/cookie.js", "javascripts/services/routes.js",
  "javascripts/services/company.js", "javascripts/services/driver.js",
  "javascripts/services/map.js", "javascripts/services/delivery.js"
]);
