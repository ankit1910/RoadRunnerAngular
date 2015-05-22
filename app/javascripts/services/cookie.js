roadrunnerServices.factory('Cookie', ['$cookieStore', function($cookieStore) {
  return {
    setData: function(data) {
    },
    destroyData: function(data) {
      $cookieStore.remove('company_name');
    },
    get: function(attr) {
      return $cookieStore.get(attr)
    }
  };
}]);
