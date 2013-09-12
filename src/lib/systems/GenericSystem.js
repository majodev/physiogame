define(["underscore"],
  function(_) {
    function GenericSystem(optionsObject) {

      // error handling on construction...
      
      if (_.isUndefined(optionsObject) || _.isObject(optionsObject) === false) {
        throw new TypeError("you have to provide a object literal at construction");
      }

      if (_.isUndefined(optionsObject.id)) {
        throw new Error("id cant be undefined!");
      }

      if (!_.isString(optionsObject.id)) {
        throw new TypeError("id must be of type string!");
      }

      // set initial values
      this.id = optionsObject.id;
      this.needs = [];
      this.entities = [];
      this.systemType = "generic";

      // needs and entities optional parameters, apply defaults from parameters
      _.defaults(this.needs, optionsObject.needs);
      _.defaults(this.entities, optionsObject.entities);
    }

    GenericSystem.prototype = {

      constructor: GenericSystem,

      init: function() {
        // NEEDS OVERRIDE: init handling of a given system will go here
        throw new Error("GenericSystem: init must be overridden! systemid=" + this.id);
      },

      update: function() {
        // NEEDS OVERRIDE: update handling of a given system will go here
        throw new Error("GenericSystem: update must be overridden! systemid=" + this.id);
      },

      kill: function() {
        // NEEDS OVERRIDE: kill handling of a given system will go here
        throw new Error("GenericSystem: kill must be overridden! systemid=" + this.id);
      },

      resolveNeeds: function(entity) {
        var i = 0,
          len = this.needs.length;
        for (i; i < len; i += 1) {
          // apply all needs for the system to operate to a given entity component
          // behavior: deeply add defaults (the needs) to the current given entity.c without overriding current values!
          _.merge(entity.c, this.needs[i], _.defaults);
          //_.merge(entity.c, this.needs[i]);
        }
      },

      getSystemType: function() {
        return this.systemType;
      },

      checkEntityHasSystemID: function(entity) {
        var i = 0,
          len;
        
        if(_.isUndefined(entity.systems)) {
          // append a systems array to entity if missing.
          entity.systems = [];
        }

        len = entity.systems.length;
        // loop through until id of system is found in entity
        for (i; i < len; i += 1) {
          if (entity.systems[i] === this.id) {
            return true; // previously added system id.
          }
        }

        // if here, then system id is missing in entity, append it.
        entity.systems.push(this.id);
        return false; // newly added.

      },

      removeSystemIDFromEntity: function(entity) {
        var i = 0,
          len = entity.systems.length;
        for (i; i < len; i += 1) {
          if (entity.systems[i] === this.id) {
            entity.systems.splice(i, 1);
            return true;
          }
        }

        return false;
      },

      addEntity: function(entity) {

        // check if entity already exists, if not examine its needs and push it to managed entities of a given system
        var i = 0,
          len = this.entities.length,
          alreadyExists = false;
        for (i; i < len; i += 1) {
          if (entity === this.entities[i]) {
            return false;
          }
        }

        // entity is new, examine needs and then push.
        this.resolveNeeds(entity);
        this.checkEntityHasSystemID(entity);
        this.entities.push(entity);

        return true;
      },

      removeEntity: function(entity) {

        // check if entity exists and remove it directly
        var i = 0,
          len = this.entities.length;

        for (i; i < len; i += 1) {
          if (entity === this.entities[i]) {
            this.removeSystemIDFromEntity(this.entities[i]);
            this.entities.splice(i, 1);
            return true;
          }
        }
        return false;
      },

      removeAllEntities: function() {
        this.entities = [];
      },

    };

    return GenericSystem;

  }
);