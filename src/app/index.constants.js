/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('BAASBOX', {
      'ENDPOINT': 'http://localhost:9000',
      'APPCODE': 1234567890,
      'USER': 'admin',
      'PASSWORD': 'admin'
    });

})();
