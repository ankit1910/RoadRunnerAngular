roadrunnerServices.factory('Routes', [function() {
  var BasePath = 'http://localhost:3000/';
  var Routes = {
    Api: {
      companyCityListPath: BasePath + 'companies/city_list',
      companyDetailsPath: BasePath + 'companies/details_for_dash'
    }
  };
  return Routes;
}]);
