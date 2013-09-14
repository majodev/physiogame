define(["systems/PhysicSystem", "components/object2d", "components/speed2d",
    "components/target2d"
  ],
  function(PhysicSystem, object2d, speed2d, target2d) {

    var system = new PhysicSystem({
      id: "moveToTarget",
      needs: [object2d, speed2d, target2d]
    });

    system.updateEntity = function(entity) {
      if (entity.c.speed.x !== 0) {
        if (entity.c.position.x < entity.c.target.x) {
          entity.c.position.x += Math.abs(entity.c.speed.x);
        }
        if (entity.c.position.x > entity.c.target.x) {
          entity.c.position.x -= Math.abs(entity.c.speed.x);
        }
      }
      if (entity.c.speed.y !== 0) {
        if (entity.c.position.y < entity.c.target.y) {
          entity.c.position.y += Math.abs(entity.c.speed.y);
        }
        if (entity.c.position.y > entity.c.target.y) {
          entity.c.position.y -= Math.abs(entity.c.speed.y);
        }
      }
    };

    return system;
  }
);