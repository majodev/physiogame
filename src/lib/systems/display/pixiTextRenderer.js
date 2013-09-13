define(["systems/DisplaySystem", "components/object2d", "PIXI",
    "components/sprite2d", "components/text2d", "underscore",
    "systems/display/pixiSpriteRenderer"
  ],
  function(DisplaySystem, object2d, PIXI, sprite2d, text2d, _, pixiSpriteRenderer) {

    var system = new DisplaySystem({
      id: "pixiTextRenderer",
      needs: [object2d, sprite2d, text2d]
    });

    system.onEntityAdded = function(entity) {

      //a text ALWAYS needs a text, check it...
      if (_.isUndefined(entity.c.text)) {
        throw new Error("onEntityAdded: pixiTextRenderer needs text defined");
      }

      //append the PIXI.Text to display if none found
      if (entity.display instanceof PIXI.Text === false) {
        // prefer texture.id OVER texture.image
        if (_.isString(entity.c.text)) {
          try {
            entity.display = new PIXI.Text(entity.c.text);
          } catch (e) {
            throw new Error("onEntityAdded: unable to construct PIXI.Text with text=" + entity.c.text);
          }
        } else {
          throw new TypeError("onEntityAdded: text must be supplied in string format!");

        }
      }
    };

    system.onEntityRemoved = function(entity) {
      // TODO: rip out the display?
    };

    system.updateEntity = function(entity) {

      // call the the pixiSpriteRenderer first...
      pixiSpriteRenderer.updateEntity(entity);

      // then set the text specific options...

      if (entity.c.flags.dirty.text === true) {
        entity.display.text = entity.c.text;
        entity.c.flags.dirty.text = false;
      }

      if (entity.c.flags.dirty.style === true) {
        entity.display.setStyle(entity.c.style);
        entity.c.flags.dirty.style = false;
      }

    };

    return system;
  }
);