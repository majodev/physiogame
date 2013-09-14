define(["systems/PhysicSystem", "components/object2d", "components/speed2d"
  ],
  function(PhysicSystem, object2d, speed2d) {

    var system = new PhysicSystem({
      id: "rotateWithSpeed",
      needs: [object2d, speed2d]
    });

    system.updateEntity = function(entity) {
      entity.c.rotation += entity.c.speed.rotation;

      if(entity.c.rotation > Math.PI) {
        entity.c.rotation = entity.c.rotation - Math.PI;
        entity.events.trigger("rotateWithSpeedRound", entity, this.id);
      }

      if(entity.c.rotation < 0) {
        entity.c.rotation = entity.c.rotation + Math.PI;
        entity.events.trigger("rotateWithSpeedRound", entity, this.id);
      }

    };

    return system;
  }
);