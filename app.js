(function() {
  // NOTICE: node-webkit hook to solve name-conflict with require statement from requirejs
  // also preloads specific node-webkit settings before initializing requirejs!
  if (window && window.require) {

    console.log("app.js (node-webkit): initializing nw.gui...");
    // node-webkit uses require keyword, hence include needed before renaming
    // Load native UI library from node-webkit
    var gui = require('nw.gui');

    // Get the current window
    var win = gui.Window.get();

    console.log("app.js (node-webkit): showDevTools");
    win.showDevTools(); // show dev-tools for debugging
    // win.focus(); // refocus on first window and show
    // win.show();

    console.log("app.js (node-webkit): removing require from global object...");
    // remove require from node from global namespace and append to requireNw
    var requireNw = window.require;
    window.requireNw = requireNw;
    window.require = undefined;
  }

  console.log("app.js: initializing requirejs startup script...");
  // finally append requirejs script to document and start loading main script
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.setAttribute("data-main", "scripts/main"); // main entry point requirejs
  script.src = "node_modules/requirejs/require.js"; // link to require.js
  document.body.appendChild(script);

}()); // immediate function!