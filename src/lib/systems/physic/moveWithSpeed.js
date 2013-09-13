define(["systems/PhysicSystem", "components/object2d", "components/speed2d"
  ],
  function(PhysicSystem, object2d, speed2d) {

    var system = new PhysicSystem({
      id: "moveWithSpeed",
      needs: [object2d, speed2d]
    });

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {
      entity.c.position.x += entity.c.speed.x;
      entity.c.position.y += entity.c.speed.y;
    }

    return system;
  }
);