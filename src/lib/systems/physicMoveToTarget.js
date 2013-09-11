define(["systems/PhysicSystem"],
  function(PhysicSystem) {
    
    var system = new PhysicSystem("physicMoveToTarget");

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      if (entity.position.x < entity.target.x) {
        entity.position.x += entity.speed.x;
      }
      if (entity.position.x > entity.target.x) {
        entity.position.x -= entity.speed.x;
      }
      if (entity.position.y < entity.target.y) {
        entity.position.y += entity.speed.y;
      }
      if (entity.position.y > entity.target.y) {
        entity.position.y -= entity.speed.y;
      }
    }

    return system;
  }
);