define(["systems/physicMoveToTarget", "systems/physicRandomPositionOnTargetReached"],
  function(physicMoveToTarget, physicRandomPositionOnTargetReached) {

    var systems = [physicMoveToTarget, physicRandomPositionOnTargetReached],
      systemsLength = systems.length;


    function init() {

      // TODO: systemManager must manage the events from the special systems
      // hook the global up here!

    }

    function update() {

      // per Frame update all systems in defined order

      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].update();
      }

    }

    function attachEntityToSystems(entity) {
      var i = 0,
        len = entity.systems.length;
      for (i; i < len; i += 1) {
        resolveSystem(entity.systems[i]).addEntity(entity);
      }
    }

    function removeEntityFromSystems(entity) {
      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].removeEntity(entity);
      }
    }

    function resolveSystem(id) {
      var i = 0;

      for (i; i < systemsLength; i += 1) {
        if (systems[i].id === id) {
          return systems[i];
        }
      }

      throw new Error("resolveSystem: system not found!");
    }

    return {
      attachEntityToSystems: attachEntityToSystems,
      removeEntityFromSystems: removeEntityFromSystems
    };

  }
);