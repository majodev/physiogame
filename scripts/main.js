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
    "bootstrap-slider": "../vendor/bootstrap-slider/js/bootstrap-slider",
    "csv": "../vendor/csv/lib/csv",
    "saveAs": "../vendor/FileSaver/FileSaver",
    "moment": "../vendor/momentjs/moment"
  },
  shim: {
    "Poll": {
      exports: "Poll",
      init: function () { // Poll must reside globally to work
        console.log("r_shim: Poll");
      }
    },
    "Spinner": {
      exports: "Spinner",
      init: function() {
        console.log("r_shim: spinner");
      }
    },
    "Handlebars": {
      exports: "Handlebars",
      init: function() {
        console.log("r_shim: Handlebars");
      }
    },
    "bootstrap-slider": {
      deps: ["jquery", "bootstrap"],
      init : function($) {
        console.log("r_shim: bootstrap-slider");
      }
    },
    "bootstrap": {
      deps: ["jquery"],
      init: function($) {
        console.log("r_shim: bootstrap");
      }
    },
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone",
      init: function(_, $) {

        console.log("r_shim: backbone (noConflict including jQuery and underscore)");

        //_.noConflict(); // remove underscore from global scope
        $.noConflict(false); // remove jquery from global scope
        return Backbone.noConflict();
      }
    },
    "PIXI": {
      exports: "PIXI",
      init: function() {
        console.log("r_shim: PIXI");
        var pixiLib = PIXI;
        PIXI = undefined;
        return pixiLib;
      }
    },
    "Leap": {
      exports: "Leap",
      init: function() {
        console.log("r_shim: Leap");
        var leapLib = Leap;
        Leap = undefined;
        return leapLib;
      }
    },
    "key": {
      exports: "key",
      init: function() {
        console.log("r_shim: key");
        return key.noConflict();
      }
    },
    "WebFont": {
      exports: "WebFont",
      init: function() {
        console.log("r_shim: WebFont");
        var WebFontLib = WebFont;
        WebFont = undefined;
        return WebFontLib;
      }
    },
    "saveAs": {
      exports: "saveAs",
      init: function() {
        console.log("r_shim: saveAs");
        return saveAs;
      }
    }
  }
});

// Start the main app logic.
require(["appInitializer"],
  function(appInitializer) {}
);