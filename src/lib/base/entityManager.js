define(["base/systemManager"],
  function(systemManager) {

    var entities;

    function init() {
      entities = [];
      systemManager.init();
    }

    function kill() {
      systemManager.kill();
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

    function removeEntity(entity) {
      var i = 0,
        len = array.length;
      for (i; i < len; i += 1) {
        
      }
    }

    return {
      addEntity: addEntity
    };

  }
);