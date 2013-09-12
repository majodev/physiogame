define(["underscore"],
  function(_) {
    
    function GameEntity (optionsObject) {
      
      // uid is always here and should not be overridden!
      this.uid = _.uniqueId("ge_");

      // mandadory fields that all get prefilled automatically
      this.c = {};
      this.display = {};
      this.systems = [];
      this.cid = "";
      this.group = "";
      this.tags = [];

      // all mandadory fields get filled via optionsObject if it exists
      if(_.isUndefined(optionsObject) === false && _.isNull(optionsObject) === false) {

        // deeply adding the components given into the constructor
        _.merge(this.c, optionsObject.c);

        // simply adding the systems
        _.defaults(this.systems, optionsObject.systems);

        if(_.isString(optionsObject.cid)) {
          this.cid = optionsObject.cid;
        }

        if(_.isString(optionsObject.group)) {
          this.group = optionsObject.group;
        }

        if(_.isObject(optionsObject.display)) {
          this.display = optionsObject.display;
        }

        // simply adding the tags
        _.defaults(this.tags, optionsObject.tags);
      }
    }

    GameEntity.prototype = {
      constructor: GameEntity
    };

    return GameEntity;
  }
);