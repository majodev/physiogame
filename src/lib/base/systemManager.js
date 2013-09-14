define(["underscore", "systems/systemMap", "systems/bindingMap", "log"],
  function(_, systemMap, bindingMap, log) {

    var systems,
      systemsLength,
      bindings,
      initialized = false;


    function init() {

      var i = 0;

      if (initialized === false) {
        log.debug("init");

        // get all systems to execute in order via update...
        systems = systemMap.getAllSystems();
        systemsLength = systems.length;

        // attach eventHandling for system entity binding...
        for (i; i < systemsLength; i += 1) {
          systems[i].events.on("all", onSystemEventEntityBinding);
        }
        initialized = true;
      }

    }

    function onSystemEventEntityBinding(eventType, entity, systemid) {
      var i = 0,
        len = entity.systems.length;

      

      // evaluate the binding...
      for (i; i < len; i += 1) {
        if (_.isObject(entity.systems[i])) { // must be a object at first...
          if (entity.systems[i].id === systemid) { // then match the sysid...
            // then match the eventType...
            if (checkHasBindingToEvent(entity.systems[i].bindings, eventType) === true) {

              log.debug("binding encountered: event=" + eventType + " entity.uid=" + entity.uid + " systemid=" + systemid);

              if (_.isString(entity.systems[i].bindings[eventType])) {

                // one binding, its a string...
                callBinding(entity.systems[i].bindings[eventType], entity, systemid);
              } else {
                // many bindings, its (hopefully) a array...
                callBindings(entity.systems[i].bindings[eventType], entity, systemid);
              }
              // heck, bind was correctly executed.
              return true;
            }
          }
        }
      }

      // till here? no binding found!
      return false;
    }

    function checkHasBindingToEvent(bindings, eventType) {
      return _.has(bindings, eventType);
    }

    function callBinding(id, entity, systemid) {
      if(_.has(bindingMap, id)) {
        bindingMap[id].onBinding(entity, systemid);
      } else {
        throw new Error("binding with id " + id + " called by systemid " +
          systemid + " for entity " + entity.uid + " not found!");
      }
      
    }

    function callBindings(ids, entity, systemid) {
      var i = 0,
        len = ids.length;
      for (i; i < len; i += 1) {
        callBinding(ids[i], entity);
      }
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

      if (initialized === true) {
        log.debug("kill");

        // deattach eventHandling
        for (i; i < systemsLength; i += 1) {
          systems[i].events.off("all", onSystemEventEntityBinding);
        }

        deattachAllEntitiesFromAllSystems();

        systems = [];
        systemsLength = 0;

        initialized = false;
      }

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

    function isSystemObject(systemid) {
      if(_.isObject(systemid) && _.isUndefined(systemid.id) === false) {
        return true;
      } else {
        return false;
      }
    }

    function resolveSystem(systemid) {
      var i = 0,
        systemidentifier;

      if (_.isString(systemid) === false && isSystemObject(systemid) === false) {
        throw new TypeError("resolveSystem: systemid must be of type string or object with id!");
      }

      if(_.isString(systemid)) {
        // system has id as string only..
        systemidentifier = systemid;
      } else {
        // system encapsulated in object!
        systemidentifier = systemid.id;
      }

      for (i; i < systemsLength; i += 1) {
        if (systems[i].id === systemidentifier) {
          return systems[i];
        }
      }

      throw new Error("resolveSystem: system not found: " + systemid);
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