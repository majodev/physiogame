define(["systems/DisplaySystem", "components/object2d", "PIXI",
    "components/sprite2d", "components/movieClip2d", "underscore",
    "systems/display/pixiSpriteRenderer"
  ],
  function(DisplaySystem, object2d, PIXI, sprite2d, movieClip2d, _, pixiSpriteRenderer) {

    var system = new DisplaySystem({
      id: "pixiMCRenderer",
      needs: [object2d, sprite2d, movieClip2d]
    });

    system.onEntityAdded = function(entity) {

      // a movieClip ALWAYS needs textures, check it...
      if (_.isUndefined(entity.c.textures)) {
        throw new Error("onEntityAdded: pixiMCRenderer needs textures to construct PIXI.MovieClip");
      }

      // append the PIXI.MovieClip to display if none found
      if (entity.display instanceof PIXI.MovieClip === false) {
        if (_.isArray(entity.c.textures)) {
          var texturesToAdd = [];
          var i = 0,
            len = entity.c.textures.length;
          
          for (i; i < len; i += 1) {
            texturesToAdd.push(PIXI.Texture.fromFrame(entity.c.textures[i]));
          }

          entity.display = new PIXI.MovieClip(texturesToAdd);
        } else {
          throw new TypeError("onEntityAdded: unable to construct PIXI.MovieClip, textures must be array");
        }
      }

      if(entity.c.flags.playing === true) {
        entity.display.play();
      }

    };

    system.onEntityRemoved = function(entity) {
      // rip out display when removed from system
      entity.display = undefined;
    };

    system.updateEntity = function(entity) {

      // call the the pixiSpriteRenderer first...
      pixiSpriteRenderer.updateEntity(entity);

      // then evaluate movieClips own values...
      entity.display.loop = entity.c.loop;

      // if(entity.c.flags.dirty.currentFrame === true) {
      //   entity.display.currentFrame = entity.c.currentFrame;
      // } else {
      //   entity.c.currentFrame = 
      // }

    };

    return system;
  }
);