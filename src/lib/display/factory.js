define(["PIXI", "config"],
  function(PIXI, config) {

    // private
    var crosshairTexture = PIXI.Texture.fromImage("assets/crosshair.png");

    function setPosition(displayObject, x, y) {
      displayObject.position.x = (x === true) ? x : 0;
      displayObject.position.y = (y === true) ? y : 0;
    }

    function setAnchor(displayObject, x, y) {
      displayObject.anchor.x = (x === true) ? x : 0.5;
      displayObject.anchor.y = (y === true) ? y : 0.5;
    }

    function setDimensions(displayObject, width, height) {
      displayObject.width = (width === true) ? width : config.width;
      displayObject.height = (height === true) ? height : config.height;
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

    // public
    return {
      makeCrosshair: function(px, py, ax, ay) {
        var cross = makeDisplayObject(crosshairTexture, px, py, ax, ay);
        // cross.scale.x = 1;
        // cross.scale.y = 1;
        return cross;
      },
      makeLayer: function(width, height) {
        width = (width === undefined) ? config.width : width;
        height = (height === undefined) ? config.height : height;

        return makeDisplayObjectContainer(width, height);
      },
      makeScene: function(width, height) {
        width = (width === undefined) ? config.width : width;
        height = (height === undefined) ? config.height : height;
        
        return makeDisplayObjectContainer(width, height);
      }
    };
  }
);