define(["PIXI", "base/entityManager"],
  function(PIXI, entityManager) {

    var Layer = function() {
      this.layer = new PIXI.DisplayObjectContainer();
      this.gameEntityUids = [];
    };

    layer.prototype = {
      constructor: Layer,
      activate: function() {
        // NEEDS OVERRIDE: activate handling goes here
        throw new Error("Layer: activate must be overridden");
      },
      deactivate: function() {
        this.removeOwnGameEntities();
      },
      getLayer: function() {
        return this.layer;
      },
      addOwnGameEntity: function(entityOptionsObject) {
        var gameEntity = new GameEntity(entityOptionsObject);

        // remember uid of GameEntity
        this.gameEntityUids.push(gameEntity.c.uid);

        // add to entityManager
        entityManager.addEntity(gameEntity);

        // add child to layer
        this.layer.addChild(gameEntity.display);
      },
      removeOwnGameEntities: function() {
        // strictly remove sorted uid array
        entityManager.removeEntitiesStrictSortedUids(gameEntityUids);
        gameEntityUids = [];
      }

    };

    return Layer;
  }
);