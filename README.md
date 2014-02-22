<h1>physiogame</h1>

![Image](pics/physiogame_logo-min.png?raw=true)

This is a master thesis project by me, Mario Ranftl (@majodev). The goal was to create an application that's suited for conducting therapeutic exercises (and according to experts, it is!). It's a JS/HTML5 game and playable in browsers, but also runnable as standalone desktop application.

Physiogame uses the Leap Motion controller as its primary input device (playing via mouse/touchscreens is also possible). It tracks the progress of its users and provides statistics that can be later exported to CSV (e.g. to import the stats in Microsoft Excel) and JSON. The behaviour, visuals, input of the game and its objects (normal and special) can be highly customized, hence there are maaaaaany parameters to modify the look and feel!

<h2>Issues</h2>
~~Attention: No i18n! Only german texts for now.~~
Added i18n v1.1.0 Feb 23, 2014, Physiogame ships with German and English texts! :)

<h2>Binaries</h2>
<h3>(version 1.1.0, Feb 23, 2014)</h3>
* Windows: <a href="http://majodev.com/physiogame/physiogame_win.zip">win32</a>
* Mac: <a href="http://majodev.com/physiogame/physiogame_mac.zip">32bit, 10.7+</a>
* Linux: <a href="http://majodev.com/physiogame/physiogame_linux32.zip">32bit</a> / <a href="http://majodev.com/physiogame/physiogame_linux64.zip">64bit</a>
* node-webkit: <a href="http://majodev.com/physiogame/physiogame.nw">nw container</a> and <a href="https://github.com/rogerwang/node-webkit">node-webkit runtime</a>
* Web: <a href="http://majodev.com/physiogame/web">Browser version</a>

<h2>How does it look?</h2>

![Image](pics/main.png?raw=true)
![Image](pics/round.png?raw=true)
![Image](pics/win.png?raw=true)
![Image](pics/credits.png?raw=true)
![Image](pics/options.png?raw=true)
![Image](pics/stats.png?raw=true)

<h2>Building</h2>
`npm install -d`

`bower update`

<h3>Building 3rd party libs</h3>

Some libraries in src/vendor might need to be build manually (e.g. <a href="https://github.com/typekit/webfontloader">webfontloader</a> via rake). Trace the error through the r.js optimization script if you encounter any errors or try to run setup before and consult your preferred js-dev-console.

`cd src/vendor/webfontloader/`
`rake`

<h3>Grunt build task</h3>

`grunt build`

The grunt task `grunt build` takes care of all js/css minifying and assets/templates copying to the folder `build`. 

<h3>Running a build</h3>

Fire up your http-server in project root, e.g. <a href="https://npmjs.org/package/http-server">simple http-server for node</a>

`http-server -c-1`

Go to `localhost:8080/build` and enjoy

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


<h3>Thank you!</h3>
* @nischi
* @jrburke
* C.A.F.
* Ranftl family
* NICI <3


<h3>Cooperation</h3>
![Image](pics/fh-joanneum-logo-min.png?raw=true)

In cooperation with FH JOANNEUM Graz, Austria.
* advanced information management
* physiotherapy and 
* occupational therapy



<h2>Copyright and Licenses</h2>
![Image](pics/majodev-logo-min.png?raw=true)

Sourcecode: GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

Assets: Attribution-ShareAlike 3.0 Unported

Please see LICENSE.md for further information of 3rd party licenses (used assets and libs)

(c) 2013-2014 Mario Ranftl (<a href="http://www.majodev.com">majodev</a>).