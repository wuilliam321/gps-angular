(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .service('Client', Client);

  /** @ngInject */
  function Client($baasbox) {
    this.add = add;
    this.all = all;
    this.get = get;

    function add(data) {
      return $baasbox.addDocument('client', data)
        .then(function(data) {
          console.log('Client ', data, 'has been saved');
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Client.add()', err);
        });
    }

    function all() {
      return $baasbox.getDocument('client')
        .then(function(data) {
          __setLinkedOrganizations(data)
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Client.all()', err);
        });
    }

    function get(id) {
      return $baasbox.getDocument('client', id)
        .then(function(data) {
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Client.get()', err);
        });
    }

    function __setLinkedOrganizations(clients) {
      _.each(clients, function(client) {
        __getOrganizationLinkByClientId(client.id)
          .then(function(data) {
            client.organization = {};
            if (data.length) {
              // in = organization, out = client
              client.organization = data[0].in;
            }
          })
      })
    }

    function __getOrganizationLinkByClientId(clientId) {
      return $baasbox.queryLink("where=out.id = '" + clientId + "'")
        .then(function(data) {
          return data;
        }, function(err) {
          console.log('An error has been ocurred in Client.__getOrganizationLinkByClientId()', err);
        });
    }
  }

})();
