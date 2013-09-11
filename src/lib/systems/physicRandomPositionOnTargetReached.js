define(["systems/PhysicSystem"],
  function(PhysicSystem) {
    
    var system = new PhysicSystem("physicRandomPositionOnTargetReached");

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      if (entity.position.x === entity.target.x) {
        entity.target.x = parseInt(Math.random() * width, 10);
      }
      if (entity.position.y === entity.target.y) {
        entity.target.y = parseInt(Math.random() * height, 10);
      }
    }

    return system;
  }
);