(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($q, $timeout, Client, Organization, webDevTec, toastr, BAASBOX) {
    var vm = this;
    vm.clients = [];
    vm.client = {};
    vm.organization = {};
    vm.addClient = addClient;
    vm.links = [];

    renderClientList();

    function renderClientList() {
      Client.all().then(function(data) {
        vm.clients = data;
        console.log('Clients', vm.clients);
      });
    }

    function addClient() {
      var promises = [];

      promises.push(Client.add(vm.client)
        .then(function(data) {
          vm.clients.push(vm.client);
          console.log('Client Saved!', data);
          vm.client = {};
          return data;
        }));

      promises.push(Organization.add(vm.organization)
        .then(function(data) {
          vm.client.organization = vm.organization;
          console.log('Organization Saved!', data);
          vm.organization = {};
          return data;
        }));

      $q.all(promises)
        .then(function(results) {
          var clientId = results[0].id,
            organizationId = results[1].id;

          if (results[0]['@class'] === 'organization') {
            clientId = results[1].id;
            organizationId = results[0].id;
          }

          Organization.linkToClient(clientId, organizationId)
            .then(function(data) {
              console.log('Link Created!', data);
            });
        });
    }
  }
})();
