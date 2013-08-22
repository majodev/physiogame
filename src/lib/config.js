define([],
  function() {

    // object is wrapped in a function to be immutable.
    return {
      width: 640,
      height: 480,
      interactive: true,
      background: 0xDDDDDD,
      renderTarget: document.body,
      spriteSheets: ["assets/SpriteSheetAliens.json",
      "assets/SpriteSheetExplosion.json"]
    };
  }
);