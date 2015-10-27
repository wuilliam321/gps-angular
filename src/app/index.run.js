(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
