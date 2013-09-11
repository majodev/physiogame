define(["underscore", "systems/physic/moveToTarget", "systems/physic/randomPositionOnTargetReached"],
  function(_, moveToTarget, randomPositionOnTargetReached) {

    var systems,
      systemsLength;


    function init() {
      
      systems = [moveToTarget, randomPositionOnTargetReached];
      systemsLength = systems.length;

      // TODO: systemManager must manage the events from the special systems
      // hook the global up here! (if good, is using special flags better?!?)

    }

    function update() {

      // per Frame update all systems in the order of the above array

      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].update();
      }

    }

    function kill() {
      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].removeAllEntities();
      }

      systems = [];
      systemsLength = 0;
    }

    function attachEntityToSystems(entity) {
      var i = 0,
        len;

      if (_.isUndefined(entity.systems.length)) {
        entity.systems = [];
      }

      len = entity.systems.length;

      for (i; i < len; i += 1) {
        resolveSystem(entity.systems[i]).addEntity(entity);
      }
    }

    function attachEntitiesToSystems(entities) {
      var i = 0,
        len = entities.length;
      for (i; i < len; i += 1) {
        attachEntityToSystems(entities[i]);
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
      init: init,
      kill: kill,
      update: update,
      attachEntityToSystems: attachEntityToSystems,
      attachEntitiesToSystems: attachEntitiesToSystems,
      removeEntityFromSystems: removeEntityFromSystems,
      resolveSystem: resolveSystem
    };

  }
);