define(["underscore"],
  function(_) {
    
    function GameEntity (container, components, systems) {
      this.container = container;
      this.c = {};
      this.systems = [];

      _.defaults(this.c, components);
      _.defaults(this.systems, systems);
    }

    GameEntity.prototype = {
      constructor: GameEntity
    };

    return GameEntity;
  }
);