define(["backbone"],
  function(Backbone) {
    var appConfig = new Backbone.Model({
      applicationName: "Physiogame",
      width: 1280,
      height: 720,
      ratio: {
        x: 16,
        y: 9
      },
      interactive: true,
      transparent: true,
      background: 0xFFFFFF,
      renderTarget: document.getElementById("pixiContainer"),
      images: ["assets/sprites/SpriteSheetAliens.json",
        "assets/sprites/SpriteSheetExplosion.json",
        "assets/sprites/backgroundSpriteData.json",
        "assets/sprites/SpriteSheetButtonBG.json",
        "assets/sprites/SpriteSheetBalloons.json",
        "assets/sprites/crosshair.png",
        "assets/sprites/fh-joanneum-logo.png",
        "assets/sprites/majodev-icon.png",
        "assets/sprites/leap-indicators.json"
      ],
      soundBaseDir: "assets/sounds/",
      sounds: [{
        name: "roundintro",
        volume: 0.1
      },{
        name: "roundstart",
        volume: 0.1
      },{
        name: "select",
        volume: 0.1
      }, {
        name: "alert",
        volume: 0.1
      }, {
        name: "explosion",
        volume: 0.1
      }, {
        name: "hitted",
        volume: 0.08
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
      logLevel: 0 // 0 trace, 1 debug, 2 info, 3 warn, 4 error, 5 silent
    });
    return appConfig;
  }
);