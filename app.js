(function() {
  // WHAT: acts as generic startup script, placed at the end of the body tag
  // DOES: checks if node-webkit, sets it up and starts r.js pipeline at the end
  // PREREQUISITES: needs DOM to be ready (hence place at the end of the body!)
  if (window && window.require) {

    console.log("app.js (node-webkit): initializing nw.gui...");
    // node-webkit uses require keyword, hence include needed before renaming
    // Load native UI library from node-webkit
    var gui = require('nw.gui');

    console.log("app.js (node-webkit): showDevTools");
    var win = gui.Window.get(); // get the current window
    win.showDevTools(); // show dev-tools for debugging
    // win.focus();
    // win.show();

    console.log("app.js (node-webkit): removing require from global object...");
    // remove require from node from global namespace and append to requirenw
    // solves name-conflict with require statement from requirejs
    var requirenw = window.require;
    window.requirenw = requirenw;
    window.require = undefined;
  }

  console.log("app.js: initializing requirejs startup script...");
  // finally append requirejs script to document and start deps pipeline
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.setAttribute("data-main", "scripts/main"); // main entry point requirejs
  script.src = "node_modules/requirejs/require.js"; // link to require.js
  document.body.appendChild(script);

}()); // immediately executed.