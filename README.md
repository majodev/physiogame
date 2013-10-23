<h1>physiogame</h1>
This is a master thesis project by me, Mario Ranftl (@majodev). It's a JS/HTML5 game and playable in browsers and node-webkit. The target is to create a funny and simple game, that's suited for therapeutic exercises. 

The idea is to track the progress of users and provide statistics "Statistiken" that can be exported to csv and json. Furthermore the behaviour "Verhalten" of the game and its objects can be fully customized through the settings "Einstellungen" menu. Last but not least, playing via mouse/touchscreens is possible, however, it's the target to use Leap Motion as primary input device.

<a href="http://majodev.com/pixi">The LATEST online version is available HERE.</a>

<h2>Setup</h2>
Fire up your http-server in project root, e.g. <a href="https://npmjs.org/package/http-server">simple http-server for node</a>

`http-server -c-1`

Go to `localhost:8080` and enjoy

<h2>Building</h2>
`npm install -d`

`bower install -d`

`grunt build`

Some libraries in src/vendor might need to be build manually (e.g. <a href="https://github.com/typekit/webfontloader">webfontloader</a> via rake). Trace the error through the r.js optimization script if you encounter any errors or try to run setup before and consult your preferred js-dev-console.

The grunt task `grunt build` takes care of all js/css minifying and assets/templates copying to the folder `build`. 

<h3>Why almond?</h3>
Even though there is no require (from node-webkit) in the global namespace during startup, a normal r.js optimized build will crash in node-webkit! I'm using <a href="https://github.com/jrburke/almond">almond</a> to tackle these build problems for node-webkit (furthermore the result is 2kb smaller). 

<h2>Testing</h2>
needs <a href="http://phantomjs.org/">phantomjs</a> bin in path!

`grunt` or 

`grunt watch`

<h2>Issues</h2>
No internationalization! - only german texts for now.

<h2>Links</h2>
<a href="https://github.com/majodev/leap-requirejs-optimization-error">resolving r.js and leapjs error</a>

<h2>Copyright and Licenses</h2>
Sourcecode: GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Assets: Attribution-ShareAlike 3.0 Unported

Please see LICENSE.md for further information of 3rd party licenses (used assets and libs)

(c) 2013 Mario Ranftl (<a href="http://www.majodev.com">majodev</a>).