define(["systems/DisplaySystem", "components/object2d", "PIXI", "components/sprite2d", "underscore"],
  function(DisplaySystem, object2d, PIXI, sprite2d, _) {

    var system = new DisplaySystem({
      id: "pixiSpriteRenderer",
      needs: [object2d, sprite2d]
    });

    system.onEntityAdded = function(entity) {

      // a sprite ALWAYS needs a texture, check it...
      if (_.isUndefined(entity.c.texture.id) &&
        _.isUndefined(entity.c.texture.image)) {
        throw new Error("onEntityAdded: pixiSpriteRenderer needs texture (id or image) to construct PIXI.Sprite");
      }

      // append the PIXI.Sprite to display if none found
      if (entity.display instanceof PIXI.Sprite === false) {
        // prefer texture.id OVER texture.image
        if (_.isString(entity.c.texture.id)) {
          try {
            entity.display = new PIXI.Sprite(
              PIXI.Texture.fromFrame(
                entity.c.texture.id));
          } catch (e) {
            throw new Error("onEntityAdded: unable to construct PIXI.Sprite with texture id=" + entity.c.texture.id);
          }

        } else {
          if (_.isString(entity.c.texture.image)) {
            entity.display = new PIXI.Sprite(
              PIXI.Texture.fromImage(
                entity.c.texture.image));
          } else {
            throw new TypeError("onEntityAdded: texture must be supplied in string format!");
          }
        }
      }
    };

    system.onEntityRemoved = function(entity) {
      // TODO: rip out the display?
    };

    system.updateEntity = function(entity) {

      // like DOC
      entity.display.position.x = entity.c.position.x;
      entity.display.position.y = entity.c.position.y;

      entity.display.visible = entity.c.visible;
      entity.display.alpha = entity.c.alpha;
      entity.display.rotation = entity.c.rotation;

      // Sprite specific
      entity.display.anchor.x = entity.c.anchor.x;
      entity.display.anchor.y = entity.c.anchor.y;


      // based on autoDetect property scale and dimensions handling
      if (entity.c.autoDetectDimensions === true) {
        // c.width and c.height are automatically set
        entity.c.width = entity.display.width;
        entity.c.height = entity.display.height;
        entity.display.scale.x = entity.c.scale.x;
        entity.display.scale.y = entity.c.scale.y;
      } else {
        // c.scale is automatically set
        entity.display.width = entity.c.width;
        entity.display.height = entity.c.height;
        entity.c.scale.x = entity.display.scale.x;
        entity.c.scale.y = entity.display.scale.y;
      }
    };

    return system;
  }
);