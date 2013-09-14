define(["PIXI"],
  function(PIXI) {
    return function (texture) {
      return new PIXI.Sprite(texture);
    };
  }
);