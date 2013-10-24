<h1>physiogame</h1>

![Image](https://github.com/majodev/physiogame/blob/master/assets/icons/physiogame_boom_256x256x32.png?raw=true)

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

![Image](https://github.com/majodev/physiogame/blob/master/pics/main.png?raw=true)
![Image](https://github.com/majodev/physiogame/blob/master/pics/round.png?raw=true)
![Image](https://github.com/majodev/physiogame/blob/master/pics/win.png?raw=true)
![Image](https://github.com/majodev/physiogame/blob/master/pics/credits.png?raw=true)
![Image](https://github.com/majodev/physiogame/blob/master/pics/options.png?raw=true)
![Image](https://github.com/majodev/physiogame/blob/master/pics/stats.png?raw=true)

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

<h3>Assets</h3>
Balloons Vectors by Stuart Bainbridge
* Creative Commons Attribution-Share Alike 3.0 License.

Alien sprites and explosion animation by PIXI.js team
* MIT License

Music by The Open Game Art Bundle (from Stratkat and Epic Battle Fantasy III)
* Creative Commons Zero License

Webfont Arvo by Anton Koovit
* SIL Open Font License, 1.1

Icons Hand and Arrow by Dave Gandy (Font Awesome)
* SIL Open Font License, 1.1


<h3>Libraries</h3>
requirejs, almond, backbone, lodash

Modernizr, pixi, leapjs, keymaster, jquery, howler, webfontloader, loglevel, spinjs, polljs, bootstrap, text, handlebars, requirejs-handlebars, bootstrap-slider, Backbone.localStorage, csv, FileSaver, momentjs

http-server, chai, mocha, phantomjs, mocha-phantomjs, grunt-cli, grunt-contrib-watch, grunt-shell, grunt-contrib-copy, grunt-contrib-cssmin, grunt-modernizr, grunt-contrib-uglify, grunt-node-webkit-builder


<h3>Tools</h3>
Sublime Text 2, node-webkit, Adobe CS6 Suite, Texture Packer, Audacity, cfxr, XLD, Otomata, ImageOptim, ImageAlpha


<h2>Thank you!</h2>
* @nischi
* @jrburke
* C.A.F.
* Ranftl family
* NICI <3

<h2>Copyright and Licenses</h2>
Sourcecode: GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Assets: Attribution-ShareAlike 3.0 Unported

Please see LICENSE.md for further information of 3rd party licenses (used assets and libs)

In cooperation with FH JOANNEUM Graz, Austria.
* advanced information management
* physiotherapy and 
* occupational therapy

![Image](https://github.com/majodev/physiogame/blob/master/assets/sprites/fh-joanneum-logo.png?raw=true)

(c) 2013 Mario Ranftl (<a href="http://www.majodev.com">majodev</a>).

![Image](https://github.com/majodev/physiogame/blob/master/assets/sprites/majodev-icon.png?raw=true)