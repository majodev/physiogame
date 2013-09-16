<h1>physio-ergo-leap-master</h1>
This is a master thesis project by me Mario Ranftl (@majodev). I'm trying to build a full-blown game that's playable in Browsers (even mobile) and can also be packaged via node-webkit for desktop use. Currently the target is to create a funny and simple game, that's suited for therapeutic exercises. 

The nightly build is always available <a href="https://majodev.com/pixi">here</a>.

<h2>How it looks</h2>


<h2>Setup</h2>

`http-server -c-1`
Go to `localhost:8080/build` and enjoy

<h2>Building</h2>
`npm install -d`
`bower install -d`
`grunt build`

Some libraries in src/vendor might need to be build manually. Trace the error through the r.js optimization script if you encounter any errors.

<h2>Links</h2>
<a href="http://majodev.com/pixi">Online version of the game</a>

<h2>Issues</h2>
Only german texts for now.
Performance optimization needed to steamlessly work on mobile devices.

<h2>Credits</h2>
practical part of my master thesis for FH JOANNEUM, Graz, Austria (no kangaroos)
advanced information management master degree program 

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