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

Some libraries in src/vendor might need to be build manually (e.g. <a href="https://github.com/typekit/webfontloader">webfontloader</a> via rake). Trace the error through the r.js optimization script if you encounter any errors.

The grunt task "build" takes care of all js/css minifying and assets/templates copying. In case you wonder: I'm using almond to tackle build problems that only happen with optimized builds in node-webkit (and it's 2kb smaller), even though there is no require (from node-webkit) in the global namespace during startup, a normal r.js optimized build will crash node-webkit! Hence, the specified build task with almond above (`grunt build`).

<h2>Testing</h2>
needs <a href="http://phantomjs.org/">phantomjs</a> bin in path!

`grunt` or 

`grunt watch`

<h2>Issues</h2>
No internationalization! - only german texts for now.

<h2>Links</h2>
<a href="https://github.com/majodev/leap-requirejs-optimization-error">resolving r.js and leapjs error</a>

<h2>Credits</h2>
practical part of my master thesis for FH JOANNEUM, Graz, Austria (no kangaroos)

FH JOANNEUM advanced information management master degree program

in cooperation with FH JOANNEUM occupational therapy and physiotherapy

I would like to thank these artists for using their assets:  

Balloons Vectors by Stuart Bainbridge 

Creative Commons Attribution-Share Alike 3.0 License. 

Aliens and explosion animation by PIXI.js team 

MIT License 

Webfont Arvo by Anton Koovit

SIL Open Font License, 1.1 
        
TOOLS: node-webkit, Flash, Texture Packer, Audacity, cfxr, Otomata, ImageOptim, ImageAlpha 

FRAMEWORKS and LIBRARIES: requirejs, r.js, bootstrap, handlebars, howler, jquery, keymaster leapjs, loglevel, pixi, polljs, spinjs, text, webfontloader, backbone, grunt, lodash, mocha, chai  

All other assets are by Mario Ranftl, BSc. (@majodev) MIT License 

A special THANK YOU goes to: 

@jrburke, @paulirish, @nischi, C.A.F. and NICI <3

<h2>Copyright</h2>
MIT license - see LICENSE.md for further information

(c) 2013 Mario Ranftl (<a href="http://www.majodev.com">majodev</a>).