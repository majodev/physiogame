define(["systems/PhysicSystem", "components/object2d",
  "components/target2d", "components/speed2d", "underscore"],
  function(PhysicSystem, object2d,
    target2d, speed2d, _) {

    var system = new PhysicSystem({
      id: "randomTarget",
      needs: [object2d, target2d, speed2d]
    });

    system.updateEntity = function(entity) {

      // set random x on target reached
      if (Math.abs(entity.c.position.x -
        entity.c.target.x) <= Math.abs(entity.c.speed.x)) {

        entity.c.target.x = _.random(
          0 - entity.c.target.bounds.x,
          entity.c.target.bounds.width + entity.c.target.bounds.x);

        system.triggerEntityBinding("resetTargetX", entity);

      }
      
      // set random y on target reached
      if (Math.abs(entity.c.position.y -
        entity.c.target.y) <= Math.abs(entity.c.speed.y)) {

        entity.c.target.y = _.random(
          0 - entity.c.target.bounds.y,
          entity.c.target.bounds.height + entity.c.target.bounds.y);

        system.triggerEntityBinding("resetTargetY", entity);
      }
    };

    return system;
  });