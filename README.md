<h1>physiogame</h1>

![Image](../physiogame/master/assets/icons/physiogame_boom_512x512x32.png?raw=true)

This is a master thesis project by me, Mario Ranftl (@majodev). It's a JS/HTML5 game and playable in browsers and node-webkit. The target is to create a funny and simple game, that's suited for therapeutic exercises. 

The idea is to track the progress of users and provide statistics "Statistiken" that can be exported to csv and json. Furthermore the behaviour "Verhalten" of the game and its objects can be fully customized through the settings "Einstellungen" menu. Last but not least, playing via mouse/touchscreens is possible, however, it's the target to use Leap Motion as primary input device.

<h2>Issues</h2>
Attention: No internationalization! Only german texts for now.

<h2>Binaries (version 1.0, Oct 24, 2013)</h2>
* Windows: <a href="http://majodev.com/physiogame/physiogame_win.zip">win32</a>
* Mac: <a href="http://majodev.com/physiogame/physiogame_mac.zip">32bit, 10.7+</a>
* Linux: <a href="http://majodev.com/physiogame/physiogame_linux32.zip">32bit</a> / <a href="http://majodev.com/physiogame/physiogame_linux64.zip">64bit</a>
* node-webkit: <a href="http://majodev.com/physiogame/physiogame.nw">nw container</a> and <a href="https://github.com/rogerwang/node-webkit">node-webkit runtime</a>
* Web: <a href="http://majodev.com/physiogame/web">Browser version</a>

<h2>How does it look?</h2>

![Image](../physiogame/master/pics/main.png?raw=true)
![Image](../physiogame/master/pics/round.png?raw=true)
![Image](../physiogame/master/pics/win.png?raw=true)
![Image](../physiogame/master/pics/credits.png?raw=true)
![Image](../physiogame/master/pics/options.png?raw=true)
![Image](../physiogame/master/pics/stats.png?raw=true)

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

<h2>Releasing</h2>
It's possible to do release builds for node-webkit via <a href="https://github.com/mllrsohn/grunt-node-webkit-builder">grunt-node-webkit-builder</a> for Windows, Mac and Linux in one step. Here's how it works:

`grunt release`

That's it! Easy huh?!

<h2>Testing</h2>
needs <a href="http://phantomjs.org/">phantomjs</a> bin in path!

`grunt` or 

`grunt watch`

<h2>Links</h2>
<a href="https://github.com/majodev/leap-requirejs-optimization-error">resolving r.js and leapjs error</a>

<h2>Copyright and Licenses</h2>
Sourcecode: GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Assets: Attribution-ShareAlike 3.0 Unported

Please see LICENSE.md for further information of 3rd party licenses (used assets and libs)

(c) 2013 Mario Ranftl (<a href="http://www.majodev.com">majodev</a>).