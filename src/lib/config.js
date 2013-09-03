define(["Backbone"],
  function(Backbone) {
    var config = new Backbone.Model({
      width: 1280,
      height: 720,
      ratio: {
        x: 16,
        y: 9
      },
      interactive: true,
      transparent: true,
      background: 0xFFFFFF,
      renderTarget: document.body,
      spriteSheets: ["assets/SpriteSheetAliens.json",
        "assets/SpriteSheetExplosion.json",
        "assets/background/backgroundSpriteData.json"
      ],
      soundBaseDir: "assets/sound/",
      sounds: [{
        name: "explosion",
        volume: 0.1
      }, {
        name: "hitted",
        volume: 0.005
      }, {
        name: "bg",
        volume: 0.2,
        loop: true
      }],
      soundExtensions: [".ogg", ".mp3", "m4a"],
      fonts: {
        google: {
          families: ['Arvo:400,700,400italic,700italic:latin']
        }
      },
      spinnerTargetID: "preloaderSpinner",
      spinnerClassName: "spinner",
      aliensToSpawn: 100,
      logLevel: 0, // 0 trace, 1 debug, 2 info, 3 warn, 4 error, 5 silent
    });
    return config;
  }
);