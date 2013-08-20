define(["PIXI"],
  function(PIXI) {

    // private
    var bunnyTexture = PIXI.Texture.fromImage("assets/bunny.png");

    function setPosition(displayObject, x, y) {
      displayObject.position.x = (x === true) ? x : 0;
      displayObject.position.y = (y === true) ? y : 0;
    }

    function setAnchor(displayObject, x, y) {
      displayObject.anchor.x = (x === true) ? x : 0.5;
      displayObject.anchor.y = (y === true) ? y : 0.5;
    }

    function setDimensions(displayObject, width, height) {
      displayObject.width = (width === true) ? width : 800;
      displayObject.height = (height === true) ? height : 600;
    }

    function makeDisplayObject(texture, px, py, ax, ay) {

      var displayObject = new PIXI.Sprite(texture);
      setPosition(displayObject, px, py);
      setAnchor(displayObject, ax, ay);
      return displayObject;
    }

    function makeDisplayObjectContainer(width, height) {

      var displayObjectContainer = new PIXI.DisplayObjectContainer();
      setDimensions(displayObjectContainer, width, height);
      return displayObjectContainer;
    }

    function setDisplayObjectParameters(displayObject, parameters) {
      
    }

    // public
    return {
      makeBunny: function(px, py, ax, ay) {
        return makeDisplayObject(bunnyTexture, px, py, ax, ay);
      },
      makeLayer: function(width, height) {
        return makeDisplayObjectContainer(width, height);
      },
      makeScene: function(width, height) {
        return makeDisplayObjectContainer(width, height);
      }
    };
  }
);