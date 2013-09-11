define(["systems/PhysicSystem", "components/position2d", "components/speed2d",
    "components/target2d"
  ],
  function(PhysicSystem, position2d, speed2d, target2d) {

    var system = new PhysicSystem({
      id: "moveToTarget",
      needs: [position2d, speed2d, target2d]
    });

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      if (entity.c.position.x < entity.c.target.x) {
        entity.c.position.x += entity.c.speed.x;
      }
      if (entity.c.position.x > entity.c.target.x) {
        entity.c.position.x -= entity.c.speed.x;
      }
      if (entity.c.position.y < entity.c.target.y) {
        entity.c.position.y += entity.c.speed.y;
      }
      if (entity.c.position.y > entity.c.target.y) {
        entity.c.position.y -= entity.c.speed.y;
      }
    }

    return system;
  }
);