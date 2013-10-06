define(["classes/Layer", "PIXI", "game/textures"],
  function(Layer, PIXI, textures) {

    var layer = new Layer(),
      outLeft,
      outRight,
      outTop,
      outBottom,
      noHand;

    layer.onActivate = function() {

      outLeft = new PIXI.Sprite(textures.atlas.leapOutside);
      outRight = new PIXI.Sprite(textures.atlas.leapOutside);
      outTop = new PIXI.Sprite(textures.atlas.leapOutside);
      outBottom = new PIXI.Sprite(textures.atlas.leapOutside);
      noHand = new PIXI.Sprite(textures.atlas.leapNoHand);

      outRight.rotation = Math.PI;
      outTop.rotation = Math.PI/2;
      outBottom.rotation = -Math.PI/2;

      outLeft.position = {
        x: 10,
        y: layer.height/2
      };

      outRight.position = {
        x: layer.width-10,
        y: layer.height/2
      };

      outTop.position = {
        x: layer.width/2,
        y: 10
      };

      outBottom.position = {
        x: layer.width/2,
        y: layer.height-10
      };

      noHand.position = {
        x: layer.width/2,
        y: layer.height/2
      };

      noHand.anchor = {
        x: 0.5,
        y: 0.5
      };

      noHand.scale = {
        x: 0.6,
        y: 0.6
      };

      noHand.alpha = 0.8;

      applySimilarOutsideParams(outLeft);
      applySimilarOutsideParams(outRight);
      applySimilarOutsideParams(outTop);
      applySimilarOutsideParams(outBottom);

      this.addChild(outLeft);
      this.addChild(outRight);
      this.addChild(outTop);
      this.addChild(outBottom);

      this.addChild(noHand);
    };

    function applySimilarOutsideParams(pixiSprite) {
      
      pixiSprite.anchor = {
        x: 0,
        y: 0.5
      };

      pixiSprite.scale = {
        x: 0.3,
        y: 0.3
      };

      pixiSprite.alpha = 0.8;
    }

    return layer;

  });