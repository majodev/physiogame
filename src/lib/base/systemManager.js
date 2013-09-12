define(["underscore", "systems/systemMap"],
  function(_, systemMap) {

    var systems,
      systemsLength;


    function init() {
      
      systems = systemMap.getAllSystems();
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

      deattachAllEntitiesFromAllSystems();

      systems = [];
      systemsLength = 0;
    }

    function attachEntityToItsSystems(entity) {
      var i = 0,
        len;

      if (_.isUndefined(entity.systems)) {
        entity.systems = [];
      }

      len = entity.systems.length;

      for (i; i < len; i += 1) {
        resolveSystem(entity.systems[i]).addEntity(entity);
      }
    }

    function attachEntitiesToTheirSystems(entities) {
      var i = 0,
        len = entities.length;
      for (i; i < len; i += 1) {
        attachEntityToItsSystems(entities[i]);
      }
    }

    function attachEntityToNewSystemID(entity, systemid) {
      resolveSystem(systemid).addEntity(entity);
    }

    function deattachEntityFromSystemID(entity, systemid) {
      resolveSystem(systemid).removeEntity(entity);
    }

    function deattachEntityFromItsSystems(entity) {
      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].removeEntity(entity);
      }
    }

    function deattachEntitiesFromSystems(entities) {
      var i = 0,
        len = entities.length;
      for (i; i < len; i += 1) {
        deattachEntityFromItsSystems(entities[i]);
      }
    }

    function deattachAllEntitiesFromSystemID(systemid) {
      resolveSystem(systemid).removeAllEntities();
    }

    function deattachAllEntitiesFromAllSystems() {
      var i = 0;
      for (i; i < systemsLength; i += 1) {
        systems[i].removeAllEntities();
      }
    }

    function resolveSystem(systemid) {
      var i = 0;

      if(!_.isString(systemid)) {
        throw new TypeError("resolveSystem: systemid must be of type string");
      }

      for (i; i < systemsLength; i += 1) {
        if (systems[i].id === systemid) {
          return systems[i];
        }
      }

      throw new Error("resolveSystem: system not found!");
    }

    return {
      init: init,
      kill: kill,
      update: update,
      attachEntityToItsSystems: attachEntityToItsSystems,
      attachEntitiesToTheirSystems: attachEntitiesToTheirSystems,
      attachEntityToNewSystemID: attachEntityToNewSystemID,
      deattachEntityFromSystemID: deattachEntityFromSystemID,
      deattachEntityFromItsSystems: deattachEntityFromItsSystems,
      deattachEntitiesFromSystems: deattachEntitiesFromSystems,
      deattachAllEntitiesFromSystemID: deattachAllEntitiesFromSystemID,
      deattachAllEntitiesFromAllSystems: deattachAllEntitiesFromAllSystems,
      resolveSystem: resolveSystem
    };

  }
);