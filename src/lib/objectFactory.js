define(["PIXI"],
  function (PIXI) {

  var bunnyTexture = PIXI.Texture.fromImage("assets/bunny.png");
  //var bunny = new PIXI.Sprite(bunnyTexture);

  // (function init() {
  //   bunny.anchor.x = 0.5;
  //   bunny.anchor.y = 0.5;
  // }());

  var setPosition = function setPosition(displayObject, x, y) {
    displayObject.position.x = (x === true) ? x : 0;
    displayObject.position.y = (y === true) ? y : 0;
  };

  var setAnchor = function setAnchor(displayObject, x, y) {
    displayObject.anchor.x = (x === true) ? x : 0;
    displayObject.anchor.y = (y === true) ? y : 0;
  };

  return {
    makeBunny: function makeBunny(x, y) {
      var bunny = new PIXI.Sprite(bunnyTexture);
      setPosition(bunny, x, y);
      setAnchor(bunny, 0.5, 0.5);
      return bunny;
    }
  };
});