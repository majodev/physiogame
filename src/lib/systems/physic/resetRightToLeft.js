define(["systems/PhysicSystem", "components/object2d",
    "components/sub/bounds2d", "components/speed2d",
    "components/sprite2d",
    "underscore", "utils/hittest"
  ],
  function(PhysicSystem, object2d, bounds2d, speed2d, sprite2d, _, hittest) {

    var system = new PhysicSystem({
      id: "resetRightToLeft",
      needs: [object2d, sprite2d, speed2d, bounds2d]
    });

    system.updateEntity = function(entity) {

      if((entity.c.position.x - entity.c.width) > entity.c.bounds.width) {
        // reset to left
        entity.c.position.x = entity.c.bounds.x - entity.c.width;

        system.triggerEntityBinding("resetPositionXToLeft", entity);
      }
    };

    return system;
  });