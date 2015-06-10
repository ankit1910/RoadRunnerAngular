roadrunnerServices.factory('Routes', [function() {
  var BasePath = 'http://localhost:3000/';
  var Routes = {
    Api: {
      companyCityListPath: BasePath + 'companies/city_list',
      companyDriversListPath: BasePath + 'companies/drivers_list',
      companyDetailsPath: BasePath + 'companies/details_for_dash',
      driverCreatePath: BasePath + 'deliveries'
    }
  };
  return Routes;
}]);
