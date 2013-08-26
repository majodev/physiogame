define(["PIXI", "config"],
  function(PIXI, config) {

    // private
    var crosshairTexture = PIXI.Texture.fromImage("assets/crosshair.png");

    function setPosition(displayObject, x, y) {
      displayObject.position.x = (x === true) ? x : 0;
      displayObject.position.y = (y === true) ? y : 0;
      return displayObject;
    }

    function setAnchor(displayObject, x, y) {
      displayObject.anchor.x = (x === true) ? x : 0.5;
      displayObject.anchor.y = (y === true) ? y : 0.5;
      return displayObject;
    }

    function setDimensions(displayObject, width, height) {
      displayObject.width = (width === true) ? width : config.width;
      displayObject.height = (height === true) ? height : config.height;
      return displayObject;
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

    function makeCrosshair(px, py, ax, ay) {
      var cross = makeDisplayObject(crosshairTexture, px, py, ax, ay);
      return cross;
    }

    function makeLayer(width, height) {
      width = (width === undefined) ? config.width : width;
      height = (height === undefined) ? config.height : height;

      return makeDisplayObjectContainer(width, height);
    }

    function makeScene(width, height) {
      width = (width === undefined) ? config.width : width;
      height = (height === undefined) ? config.height : height;

      return makeDisplayObjectContainer(width, height);
    }

    // public
    return {
      makeCrosshair: makeCrosshair,
      makeLayer: makeLayer,
      makeScene: makeScene
    };
  }
);