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

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {

      if((entity.c.position.x - entity.c.width) > entity.c.bounds.width) {
        // reset to left
        entity.c.position.x = entity.c.bounds.x - entity.c.width;

        system.events.trigger("reset", entity);
      }
    }

    return system;
  });