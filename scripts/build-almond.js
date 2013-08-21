// Require
var requirejs = require('requirejs');
var fs = require('fs');
var path = require('path');
var pjson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

// Configure RequireJS
var config = {
  baseUrl: "src/lib/", // Base URL
  paths: {
    "PIXI": "../vendor/pixi/bin/pixi",
    "Leap": "../vendor/leapjs/leap.min",
    "key": "../vendor/keymaster/keymaster.min"
  },
  shim: {
    "PIXI": {
      exports: "PIXI"
    },
    "Leap": {
      exports: "Leap"
    },
    "key": {
      exports: "key"
    }
  },
  optimize: "none",
  name: "../vendor/almond/almond", // Name of script to start building from
  include: "gameController",
  insertRequire: ["gameController"],
  wrap: true,
  out: 'build/'+pjson.name+'-'+pjson.version+'.min.js' // Where to output
};

// Optimize our script
requirejs.optimize(config, function (buildResponse) {
  var contents = fs.readFileSync(config.out, 'utf-8');
});
