define(["systems/PhysicSystem", "components/object2d", "components/speed2d"
  ],
  function(PhysicSystem, object2d, speed2d) {

    var system = new PhysicSystem({
      id: "moveWithSpeed",
      needs: [object2d, speed2d]
    });

    system.updateEntity = function(entity) {
      entity.c.position.x += entity.c.speed.x;
      entity.c.position.y += entity.c.speed.y;
    };

    return system;
  }
);