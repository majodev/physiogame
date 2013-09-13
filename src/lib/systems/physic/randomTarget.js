define(["systems/PhysicSystem", "components/object2d",
  "components/target2d", "components/speed2d", "underscore"],
  function(PhysicSystem, object2d,
    target2d, speed2d, _) {

    var system = new PhysicSystem({
      id: "randomTarget",
      needs: [object2d, target2d, speed2d]
    });

    system.update = function() {
      var i = 0,
        len = system.entities.length;
      for (i; i < len; i += 1) {
        updateEntity(system.entities[i]);
      }
    };

    function updateEntity(entity) {

      // set random x on target reached
      if (Math.abs(entity.c.position.x -
        entity.c.target.x) <= Math.abs(entity.c.speed.x)) {

        entity.c.target.x = _.random(
          0 - entity.c.target.bounds.x,
          entity.c.target.bounds.width + entity.c.target.bounds.x);

        system.events.trigger("randomTargetx", entity);

      }
      
      // set random y on target reached
      if (Math.abs(entity.c.position.y -
        entity.c.target.y) <= Math.abs(entity.c.speed.y)) {

        entity.c.target.y = _.random(
          0 - entity.c.target.bounds.y,
          entity.c.target.bounds.height + entity.c.target.bounds.y);

        system.events.trigger("randomTargety", entity);
      }
    }

    return system;
  });