(function() {
  // WHAT: acts as generic startup script for the application
  // DOES: checks for node-webkit, feature-detection and r.js pipeline
  // PREREQUISITES: needs DOM to be ready and Modernizer to be loaded!

  function writeStatus(text) {
    document.getElementById("preloaderStatus").innerHTML = text;
  }

  function featureReport() {
    return "-- Status Report --<br />HTML5 Audio: " + canAudio + "<br />HTML5 Canvas/WebGL: " + canRender +
      "<br />Float32Array Support: " + canFloat32Array +
      "<br />LocalStorage Support: " + canStorage;
  }

  // FEATURE-DETECTION...
  var canAudio = Modernizr.audio.ogg || Modernizr.audio.mp3 || Modernizr.audio.m4a;
  var canRender = Modernizr.canvas || Modernizr.webgl;
  var canFloat32Array = (typeof Float32Array !== "undefined") ? true : false;
  var canStorage = Modernizr.localstorage;

  if (canAudio && canRender && canFloat32Array && canStorage) {
    // allowed to continue with loading the application...
    writeStatus("Mindestvoraussetzungen werden erfüllt!<br />Bitte warten...<br />");
  } else {
    // failed feature detection!
    writeStatus(":(<br /><br />Ohje, dein Browser ist leider zu alt.<br />" +
      "Bitte aktualisiere auf die neueste Version!<br /><br />" +
      "<a href=\"http://www.google.at/intl/de/chrome/\">Empfohlener Browser: Google Chrome</a><br /><br />" +
      featureReport());
    // stop immetiately with further processing!
    return;
  }

  // CHECKING FOR NODE-WEBKIT...
  if (window && window.require) {

    console.log("app.js (node-webkit): initializing nw.gui and storing window...");
    // requires from node-webkit must take place before executing requirejs app
    var nwgui = require('nw.gui');
    window.nwgui = nwgui;
    window.nwWindow = nwgui.Window.get();    

    console.log("app.js (node-webkit): moving require to requirenw (appending version)");
    // remove require from node from global namespace and append to requirenw
    // solves name-conflict with require statement from requirejs
    window.requirenw = window.require;
    delete window.require;
   
    window.requirenw.version = process.versions.node;
    delete process.versions.node;
  }

  // CUSTOM HOOKS that need to be executed before...
  // dont allow to select text
  document.onselectstart = function() {
    return false;
  };


  // START REQUIRE JS PIPELINE...
  console.log("app.js: (browser): initializing requirejs startup script...");
  // finally append requirejs script to document and start deps pipeline
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.setAttribute("data-main", "scripts/main"); // main entry point requirejs
  script.src = "node_modules/requirejs/require.js"; // link to require.js
  document.body.appendChild(script);

}()); // immediately executed.