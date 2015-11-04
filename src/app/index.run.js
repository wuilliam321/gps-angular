(function() {
  'use strict';

  angular
    .module('gpsAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $baasbox, BAASBOX) {

    $log.debug('runBlock end');

    $baasbox.init({
      url: BAASBOX.ENDPOINT,
      appCode: BAASBOX.APPCODE
    });
    $baasbox.login(BAASBOX.USER, BAASBOX.PASSWORD)
      .then(function (user) {
          console.log('Logged in user', user);
      }, function (err) {
          console.log(err);
      });
  }

})();
