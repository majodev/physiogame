// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  paths: {
    "underscore": "../../node_modules/lodash/lodash", // watch out: registers _ itself (noConflict!)
    "log": "../vendor/loglevel/lib/loglevel", // watch out: registers itself as log!
    "Backbone": "../../node_modules/backbone/backbone",
    "PIXI": "../vendor/pixi/bin/pixi.dev",
    "Leap": "../vendor/leapjs/leap",
    "key": "../vendor/keymaster/keymaster",
    "jquery": "../vendor/jquery/jquery", // watch out: registers jquery and $ itself (prevented!)
    "Howler": "../vendor/howler/howler", // watch out: registers itself as Howler!
    "WebFont": "../vendor/webfontloader/target/webfont"
  },
  shim: {
    "Backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone",
      init: function(_, $) {
        //console.log("requireconfig: init (AMD) underscore with noConflict");
        _.noConflict(); // remove underscore from global scope

        //console.log("requireconfig: init (AMD) jquery with noConflict");
        $.noConflict(true); // remove jquery from global scope

        //console.log("requireconfig: init (shim) Backbone with noConflict");
        return Backbone.noConflict();
      }
    },
    "PIXI": {
      exports: "PIXI",
      init: function() {
        //console.log("requireconfig: init (shim) PIXI and remove from global scope");
        var pixiLib = PIXI;
        PIXI = undefined;
        return pixiLib;
      }
    },
    "Leap": {
      exports: "Leap",
      init: function() {
        //console.log("requireconfig: init (shim) Leap and remove from global scope");
        var leapLib = Leap;
        Leap = undefined;
        return leapLib;
      }
    },
    "key": {
      exports: "key",
      init: function() {
        //console.log("requireconfig: init (shim) key with noConflict");
        return key.noConflict();
      }
    },
    "WebFont": {
      exports: "WebFont",
      init: function() {
        //console.log("requireconfig: init (shim) WebFont and remove from global scope");
        var WebFontLib = WebFont;
        WebFont = undefined;
        return WebFontLib;
      }
    }
  }
});

// Start the main app logic.
require(["physioshooter"],
  function(physioshooter) {}
);