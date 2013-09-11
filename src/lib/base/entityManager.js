define(["base/systemManager"],
  function(systemManager) {

    var entities = [];

    function init() {

    }

    function kill() {
      systemManager.remvoe
      entities = [];
    }

    function getEntityByID() {

    }

    function getEntitiesByGroup() {

    }

    function getEntitiesByTag() {

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