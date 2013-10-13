(function() {
  // WHAT: acts as generic startup script for the application
  // DOES: checks for node-webkit, feature-detection and r.js pipeline
  // PREREQUISITES: needs DOM to be ready and Modernizer to be loaded!

  function writeStatus(text) {
    document.getElementById("preloaderStatus").innerHTML = text;
  }

  function featureReport() {
    return "-- Status --<br />audio: " + canAudio + "<br />render: " + canRender +
      "<br />svg: " + canStats + "<br />float32: " + canFloat32Array +
      "<br />storage: " + canStorage;
  }

  // FEATURE-DETECTION...
  var canAudio = Modernizr.audio.ogg || Modernizr.audio.mp3 || Modernizr.audio.m4a;
  var canRender = Modernizr.canvas || Modernizr.webgl;
  var canStats = Modernizr.svg;
  var canFloat32Array = (typeof Float32Array !== "undefined") ? true : false;
  var canStorage = Modernizr.localstorage;

  if (canAudio && canRender && canStats && canFloat32Array && canStorage) {
    // allowed to continue with loading the application...
    writeStatus("Passed feature detection!<br />Please wait...<br />");
  } else {
    // failed feature detection!
    writeStatus(":(<br /><br />Sorry, your browser is too old.<br />" +
      "Please update to the LATEST version of IE, Firefox, Chrome, Safari or Opera!<br /><br />" +
      "<a href=\"http://www.google.at/intl/de/chrome/\">Best played in Google Chrome</a><br /><br />" +
      featureReport());
    // stop immetiately with further processing!
    return;
  }

  // CHECKING FOR NODE-WEBKIT...
  if (window && window.require && console) {

    console.log("app.js (node-webkit): initializing nw.gui...");
    // requires from node-webkit must take place before executing requirejs app
    var gui = require('nw.gui');

    console.log("app.js (node-webkit): removing require from global object...");
    // remove require from node from global namespace and append to requirenw
    // solves name-conflict with require statement from requirejs
    var requirenw = window.require;
    window.requirenw = requirenw;
    window.require = undefined;
  }

  // CUSTOM HOOKS that need to be executed before...
  // dont allow to select text
  document.onselectstart = function() {
    return false;
  };

  console.log("app.js: (browser): initializing requirejs startup script...");
  // finally append requirejs script to document and start deps pipeline
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "physiogame-0.1.0.min.js"; // link to require.js
  document.body.appendChild(script);

}()); // immediately executed.