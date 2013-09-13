define(["systems/PhysicSystem", "components/object2d",
  "components/target2d", "components/speed2d"],
  function(PhysicSystem, object2d,
    target2d, speed2d) {

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
      if (Math.abs(entity.c.position.x -
        entity.c.target.x) <= Math.abs(entity.c.speed.x)) {

        entity.c.target.x = parseInt(Math.random() * entity.c.target.bounds.width, 10);
      }
      
      if (Math.abs(entity.c.position.y -
        entity.c.target.y) <= Math.abs(entity.c.speed.y)) {

        entity.c.target.y = parseInt(Math.random() * entity.c.target.bounds.height, 10);
      }
    }

    return system;
  });