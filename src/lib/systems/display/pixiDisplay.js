define(["systems/DisplaySystem", "components/position2d"],
  function(DisplaySystem, position2d) {

    var system = new DisplaySystem({
      id: "pixiDisplay",
      needs: [position2d]
    });

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      entity.display.position.x = entity.c.position.x;
      entity.display.position.y = entity.c.position.y;
    }

    return system;
  }
);