define(["underscore"],
  function(_) {
    
    function GameEntity (paramObject) {
      
      // uid is always here and should not be overridden!
      this.uid = _.uniqueId("ge_");

      // mandadory fields that all get prefilled automatically
      this.c = {};
      this.display = {};
      this.systems = [];
      this.cid = "";
      this.group = "";
      this.tags = [];

      // all mandadory fields get filled via paramObject if it exists
      if(_.isUndefined(paramObject) === false && _.isNull(paramObject) === false) {
        _.defaults(this.c, paramObject.c);
        _.defaults(this.display, paramObject.display);
        _.defaults(this.systems, paramObject.systems);

        if(_.isString(paramObject.cid)) {
          this.cid = paramObject.cid;
        }

        if(_.isString(paramObject.group)) {
          this.group = paramObject.group;
        }

        _.defaults(this.tags, paramObject.tags);
      }
    }

    GameEntity.prototype = {
      constructor: GameEntity
    };

    return GameEntity;
  }
);