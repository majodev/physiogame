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
        "assets/sprites/crosshair-disabled.png",
        "assets/sprites/crosshair-leapstyle.png",
        "assets/sprites/crosshair-leapstyle-disabled.png",
        "assets/sprites/fh-joanneum-logo.png",
        "assets/sprites/majodev-icon.png",
        "assets/sprites/leap-indicators.json",
        "assets/sprites/pop_sprites.json"
      ],
      soundBaseDir: "assets/sounds/",
      sounds: [{
        name: "roundintro",
        volume: 0.05
      }, {
        name: "roundstart",
        volume: 0.1
      }, {
        name: "timewarning",
        volume: 0.3
      }, {
        name: "select",
        volume: 0.1
      }, {
        name: "alert",
        volume: 0.1
      }, {
        name: "explosion", //explosion must be lauder...
        volume: 0.5
      }, {
        name: "special_action",
        volume: 0.2
      }, {
        name: "hitted",
        volume: 0.08
      }, {
        name: "music/bg_credits",
        volume: 0.1,
        loop: true
      }, {
        name: "music/bg_main",
        volume: 0.1,
        loop: true
      }, {
        name: "music/bg_round",
        volume: 0.1,
        loop: true
      }, {
        name: "music/bg_win",
        volume: 0.1
      }],
      soundExtensions: [".ogg", ".mp3", "m4a"],
      fonts: {
        custom: {
          families: ['Arvo:n4,i4,n7,i7']
        }
      },
      spinnerTargetID: "preloaderSpinner",
      spinnerClassName: "spinner",
      logLevel: 0 // 0 trace, 1 debug, 2 info, 3 warn, 4 error, 5 silent
    });
    return appConfig;
  }
);