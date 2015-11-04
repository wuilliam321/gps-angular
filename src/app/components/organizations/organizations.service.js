(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .service('Organization', Organization);

  /** @ngInject */
  function Organization($baasbox) {
    this.add = add;
    this.linkToClient= linkToClient;

    function add(data) {
      return $baasbox.addDocument('organization', data)
        .then(function(data) {
          console.log('Organization ', data, 'has been saved');
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Organization.add()', err);
        });
    }

    function linkToClient(clientId, organizationId) {
      return $baasbox.createLink(clientId, organizationId, 'client-has-organization')
        .then(function(data) {
          console.log('Link ', data, 'has been created');
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Organization.linkToClient()', err);
        });
    }
  }

})();
