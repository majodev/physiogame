define(["Backbone"],
  function(Backbone) {
    var config = new Backbone.Model({
      width: 640,
      height: 480,
      interactive: true,
      background: 0xDDDDDD,
      renderTarget: document.body,
      spriteSheets: ["assets/SpriteSheetAliens.json",
        "assets/SpriteSheetExplosion.json"
      ],
      aliensToSpawn: 50
    });
    return config;
  }
);