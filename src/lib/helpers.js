var gps = gps || {};
gps.models = gps.models || {};
gps.collections = gps.collections || {};
gps.views = gps.views || {};
gps.data = gps.data || {};
gps.constants = gps.constants || {};
gps.session = gps.session || {};
gps.helpers = gps.helpers || {};

gps.constants.VERSION_BUILD = '0.44';
gps.constants.TEST_BUILD = false;

// Offline.state online
gps.constants.ONLINE = "up";

//Team types
gps.constants.PROGRAM_MODEL = 'Program';
gps.constants.WORKING_SURFACE_MODEL = 'Working Surface';

//Min and Max set point for calculate backlog team delta
gps.constants.GENERAL_MIN_SET_POINT = -5;
gps.constants.GENERAL_MAX_SET_POINT = 5;

// API settings for production, demo, qa and development
gps.settings = {
  //GPS_Production
  production: {
    appcode: '1234567890',
  },

  //GpsPlatform
  demo: {
    appcode: '1234567890',
  },

  //GPS_QA
  qa: {
    appcode: '1234567890',
  },

  //GPS_Development
  development: {
    appcode: '1234567890',
  }
};

gps.defaultEnvName = "production";

gps.environment = gps.environment || {};

gps.environment.getCurrEnvName = function() {

  var currentEnv = localStorage.getItem("environment");

  return currentEnv ? currentEnv : gps.defaultEnvName;
};

gps.environment.onProdEnv = function() {

  return (gps.environment.getCurrEnvName() === 'production');
};

gps.environment.onDemoEnv = function() {

  return (gps.environment.getCurrEnvName() === 'demo');
};

gps.environment.changeEnv = function(env) {
  function doChange() {
    localStorage.clear();
    localStorage.setItem("environment", env);
    window.location.reload();
  }

  // This will force to do a login again.
  return gps.controllers.loginController.doLogOut({
    success: function() {
      doChange();
    },
    error: function(model, error) {
      if (error && error.responseJSON) {
        error.responseJSON.message = 'There was an error trying to change the environment: ' +
          error.responseJSON.message;
      }
      doChange();
    }
  });
};

// Setup backbone backend
var options = gps.settings[gps.environment.getCurrEnvName()];
Baasbox.install(options.appcode);

localStorage.setItem("environment", gps.environment.getCurrEnvName());
