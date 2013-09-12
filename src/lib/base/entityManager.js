define(["underscore", "base/systemManager"],
  function(_, systemManager) {

    var storedEntities,
      storedEntitiesLength;

    function init() {
      storedEntities = [];
      storedEntitiesLength = 0;
      systemManager.init();
    }

    function kill() {
      systemManager.kill();
      storedEntities = [];
      storedEntitiesLength = 0;
    }

    function getEntityByCid(cid) {
      var i = 0;
      for (i; i < storedEntitiesLength; i += 1) {
        if(storedEntities[i].cid === cid) {
          return storedEntities[i];
        }
      }

      throw new Error("getEntityByCid: cid not found!");
    }

    function getEntityByUid(uid) {
      var i = 0;
      
      for (i; i < storedEntitiesLength; i += 1) {
        if(storedEntities[i].uid === uid) {
          return storedEntities[i];
        }
      }

      throw new Error("getEntityByUid: uid not found!");
    }

    function getEntitiesByGroup(group) {
      var filter = _.filter(storedEntities,
        function(entity) {
          if(entity.group === group) {
            return true;
          } else {
            return false;
          }
      });

      return filter;
    }

    function getEntitiesByTag(tag) {
      var filter = _.filter(storedEntities,
        function(entity) {
          var i = 0,
            len = entity.tags.length;
          for (i; i < len; i += 1) {
            if(entity.tags[i] === tag) {
              return true;
            }
          }
          return false;
      });

      return filter;
    }

    function getEntitiesLength() {
      return storedEntitiesLength;
    }

    function addEntity(entity) {
      storedEntities.push(entity);
      storedEntitiesLength = storedEntities.length;
      systemManager.attachEntityToItsSystems(entity);

      return entity;
    }

    function addEntities(entities) {
      var i = 0,
        len = entities.length;
      for (i; i < len; i += 1) {
        addEntity(entities[i]);
      }
    }

    function removeEntity(entity) {
      var i = 0;
      for (i; i < storedEntitiesLength; i += 1) {
        if(storedEntities[i] === entity) {
          systemManager.deattachEntityFromItsSystems(storedEntities[i]);
          storedEntities.splice(i, 1);
          storedEntitiesLength = storedEntities.length;
          return true;
        }
      }

      return false;
    }

    function removeEntities(entities) {
      var i = 0,
        len = entities.length;
      for (i; i < len; i += 1) {
        removeEntity(entities[i]);
      }
    }

    return {
      init: init,
      kill: kill,
      getEntityByCid: getEntityByCid,
      getEntityByUid: getEntityByUid,
      getEntitiesByGroup: getEntitiesByGroup,
      getEntitiesByTag: getEntitiesByTag,
      getEntitiesLength: getEntitiesLength,
      addEntities: addEntities,
      addEntity: addEntity,
      removeEntity: removeEntity,
      removeEntities: removeEntities
    };

  }
);