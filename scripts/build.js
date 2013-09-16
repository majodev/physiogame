// Require
var requirejs = require('requirejs');
var fs = require('fs');
var path = require('path');
var pjson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

// Configure RequireJS
var config = {
  baseUrl: "src/lib/", // Base URL
  mainConfigFile: "scripts/main.js", // include all dependencies from main
  paths: { // requireLib will be included and optimized
    "requireLib": "../../node_modules/requirejs/require"
  },
  optimize: "uglify2",
  onBuildRead: function(id, url, contents) {
    if (id === 'Leap') { // handling bad Leap browserify style during optimization
        return 'define(\'Leap\', [], function() {var define;\n ' + contents + ' return Leap; });';
    } else {
        return contents;
    }
  },
  preserveLicenseComments: true,
  include: ["requireLib", "base/gameManager"], // heads up: game is loaded via "load" dynamically, hence include!
  logLevel: 0,
  waitSeconds: 7,
  name: "appInitializer", // Name of script to start building from
  insertRequire: ["appInitializer"],
  out: 'build/' + pjson.name + '-' + pjson.version + '.min.js' // Where to output
};

// Optimize our script
requirejs.optimize(config, function(buildResponse) {
  var contents = fs.readFileSync(config.out, 'utf-8');
});