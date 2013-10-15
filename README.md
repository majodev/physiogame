<h1>physiogame</h1>
This is a master thesis project by me Mario Ranftl (@majodev). I'm trying to build a full-blown game that's playable in Browsers (even mobile) and can also be packaged via node-webkit for desktop use. Currently the target is to create a funny and simple game, that's suited for therapeutic exercises. 

<a href="http://majodev.com/pixi">The LATEST online version is available HERE.</a>

<h2>Setup</h2>
Fire up your http-server in project root, e.g. <a href="https://npmjs.org/package/http-server">simple http-server for node</a>

`http-server -c-1`

Go to `localhost:8080/build` and enjoy

<h2>Building</h2>
`npm install -d`

`bower install -d`

`grunt build`

Some libraries in src/vendor might need to be build manually (e.g. <a href="https://github.com/typekit/webfontloader">webfontloader</a>). Trace the error through the r.js optimization script if you encounter any errors.

<h2>Testing</h2>
needs <a href="http://phantomjs.org/">phantomjs</a> bin in path!

`grunt` or 

`grunt watch`

<h2>Issues</h2>
Only german texts for now.
More performance optimization needed to steamlessly work on mobile devices (iPhone 4 slow, iPad mini is great!).

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