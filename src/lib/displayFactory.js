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

    var setDimensions = function setDimensions(displayObject, width, height) {
      displayObject.width = (width === true) ? width : 800;
      displayObject.height = (height === true) ? height : 600;
    };

    var makeDisplayObject = function makeDisplayObject(texture, px, py, ax, ay) {
      var displayObject = new PIXI.Sprite(texture);
      setPosition(displayObject, px, py);
      setAnchor(displayObject, ax, ay);
      return displayObject;
    };

    var makeDisplayObjectContainer = function makeDisplayObjectContainer(width, height) {
      var displayObjectContainer = new PIXI.DisplayObjectContainer();
      setDimensions(displayObjectContainer, width, height);
      return displayObjectContainer;
    };

    // public
    return {
      makeBunny: function makeBunny(px, py, ax, ay) {
        return makeDisplayObject(bunnyTexture, px, py, ax, ay);
      },
      makeLayer: function makeLayer(width, height) {
        return makeDisplayObjectContainer(width, height);
      },
      makeScene: function makeScene(width, height) {
        return makeDisplayObjectContainer(width, height);
      }
    };
  }
);