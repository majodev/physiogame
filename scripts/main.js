// Configure RequireJS
require.config({
  baseUrl: "src/lib/",
  paths: {
    "underscore": "../../node_modules/lodash/lodash", // watch out: registers _ itself (noConflict!)
    "log": "../vendor/loglevel/lib/loglevel", // watch out: registers itself as log!
    "backbone": "../../node_modules/backbone/backbone",
    "backbone.localStorage": "../vendor/Backbone.localStorage/backbone.localStorage",
    "PIXI": "../vendor/pixi/bin/pixi.dev",
    "Leap": "../vendor/leapjs/leap",
    "key": "../vendor/keymaster/keymaster",
    "jquery": "../vendor/jquery/jquery", // watch out: registers jquery and $ itself (prevented!)
    "Howler": "../vendor/howler/howler", // watch out: registers itself as Howler!
    "WebFont": "../vendor/webfontloader/target/webfont",
    "Spinner": "../vendor/spinjs/dist/spin",
    "Poll": "../vendor/polljs/poll",
    "bootstrap": "../vendor/bootstrap/dist/js/bootstrap",
    "text": "../vendor/text/text",
    "Handlebars": "../vendor/handlebars/handlebars",
    "hbars": "../vendor/requirejs-handlebars/hbars",
    "bootstrap-slider": "../vendor/bootstrap-slider/js/bootstrap-slider"
  },
  shim: {
    "Modernizr": {
      exports: "Modernizr",
      init: function () {
        console.log("init Modernizr");
      }
    },
    "Poll": {
      exports: "Poll",
      init: function () { // Poll must reside globally to work
        //console.log("init Poll");
      }
    },
    "Spinner": {
      exports: "Spinner",
      init: function() {
        console.log("init spinner");
      }
    },
    "Handlebars": {
      exports: "Handlebars",
      init: function() {
        console.log("init Handlebars");
      }
    },
    "bootstrap-slider": {
      deps: ["jquery", "bootstrap"],
      init : function($) {
        console.log("init bootstrap-slider");
      }
    },
    "bootstrap": {
      deps: ["jquery"],
      init: function($) {
        console.log("init bootstrap");
      }
    },
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone",
      init: function(_, $) {
        //console.log("requireconfig: init (AMD) underscore with noConflict");
        _.noConflict(); // remove underscore from global scope

        //console.log("requireconfig: init (AMD) jquery with noConflict");
        $.noConflict(false); // remove jquery from global scope

        //console.log("requireconfig: init (shim) Backbone with noConflict");
        return Backbone.noConflict();
        //return Backbone;
      }
    },
    // "localstorage": {
    //   deps: ["underscore", "jquery", "Backbone"],
    //   exports: "Backbone",
    //   init: function(_, $, Backbone) {
    //     console.log("requireconfig: init localstorage");
    //     return Backbone;
    //   }
    // },
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
require(["appInitializer"],
  function(appInitializer) {}
);