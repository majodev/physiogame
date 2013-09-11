define(["underscore"],
  function(_) {
    
    function GameEntity (container, components, systems) {
      this.container = container;
      this.components = {};
      this.systems = [];

      _.defaults(this.components, components);
      _.defaults(this.systems, systems);
    }

    GameEntity.prototype = {
      constructor: GameEntity
    };

    return GameEntity;
  }
);