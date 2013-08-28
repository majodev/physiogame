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
      background: 0xFFFFFF,
      renderTarget: document.body,
      spriteSheets: ["assets/SpriteSheetAliens.json",
        "assets/SpriteSheetExplosion.json",
        "assets/background/backgroundSpriteData.json"
      ],
      aliensToSpawn: 100
    });
    return config;
  }
);