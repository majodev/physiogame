define(["systems/DisplaySystem", "components/object2d", "PIXI"],
  function(DisplaySystem, object2d, PIXI) {

    var system = new DisplaySystem({
      id: "pixiDOCRenderer",
      needs: [object2d]
    });

    system.onEntityAdded = function(entity) {
      // append the PIXI.DisplayObjectContainer to display if none found
      if (entity.display instanceof PIXI.DisplayObjectContainer === false) {
        entity.display = new PIXI.DisplayObjectContainer();
      }
    };

    system.onEntityRemoved = function(entity) {
      // TODO: rip out the display?
    };

    system.updateEntity = function(entity) {

      entity.display.position.x = entity.c.position.x;
      entity.display.position.y = entity.c.position.y;
      entity.display.scale.x = entity.c.scale.x;
      entity.display.scale.y = entity.c.scale.y;

      entity.display.visible = entity.c.visible;
      entity.display.alpha = entity.c.alpha;
      entity.display.rotation = entity.c.rotation;
    };

    return system;
  }
);