define(["PIXI"],
  function(PIXI) {

    // private
    var bunnyTexture = PIXI.Texture.fromImage("assets/bunny.png");

    var setPosition = function setPosition(displayObject, x, y) {
      displayObject.position.x = (x === true) ? x : 0;
      displayObject.position.y = (y === true) ? y : 0;
    };

    var setAnchor = function setAnchor(displayObject, x, y) {
      displayObject.anchor.x = (x === true) ? x : 0.5;
      displayObject.anchor.y = (y === true) ? y : 0.5;
    };

    var makeDisplayObject = function makeDisplayObject(texture, px, py, ax, ay) {
      var displayObject = new PIXI.Sprite(texture);
      setPosition(displayObject, px, py);
      setAnchor(displayObject, ax, ay);
      return displayObject;
    };

    // public
    return {
      makeBunny: function makeBunny(px, py, ax, ay) {
        return makeDisplayObject(bunnyTexture, px, py, ax, ay);
      }
    };
  }
);