define(["systems/PhysicSystem", "config", "components/position2d", "components/target2d"],
  function(PhysicSystem, config, position2d, target2d) {
    
    var system = new PhysicSystem("randomPositionOnTargetReached"),
      width = config.get("width"),
      height = config.get("height");

    system.needs = [position2d, target2d];

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      if (entity.c.position.x === entity.c.target.x) {
        entity.c.target.x = parseInt(Math.random() * width, 10);
      }
      if (entity.c.position.y === entity.c.target.y) {
        entity.c.target.y = parseInt(Math.random() * height, 10);
      }
    }

    return system;
  }
);