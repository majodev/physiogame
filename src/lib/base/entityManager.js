define(["base/systemManager"],
  function(systemManager) {

    var entities = [];

    function getEntityByID () {

    }

    function getEntitiesByGroup () {

    }

    function getEntitiesByTag () {

    }

    function addEntity(entity) {
      entities.push(entity);
      systemManager.attachEntityToSystems(entity);
    }

    return {
      addEntity: addEntity
    };

  }
);