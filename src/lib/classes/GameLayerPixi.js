define(["PIXI", "base/entityManager", "classes/GameEntity"],
  function(PIXI, entityManager, GameEntity) {

    var Layer = function() {
      this.layer = new PIXI.DisplayObjectContainer();
      this.gameEntityUids = [];
    };

    Layer.prototype = {
      constructor: Layer,
      activate: function() {
        // NEEDS OVERRIDE: activate handling goes here
        throw new Error("Layer: activate must be overridden");
      },
      deactivate: function() {
        this.removeAllChildGes();
      },
      getLayer: function() {
        return this.layer;
      },
      addChildGe: function(entityOptionsObject) {
        var gameEntity = new GameEntity(entityOptionsObject);

        // remember uid of GameEntity
        this.gameEntityUids.push(gameEntity.c.uid);

        // add to entityManager
        entityManager.addEntity(gameEntity);

        // add child to layer
        this.layer.addChild(gameEntity.display);
      },
      removeAllChildGes: function() {
        // strictly remove sorted uid array
        entityManager.removeEntitiesStrictSortedUids(gameEntityUids);
        gameEntityUids = [];
      }

    };

    return Layer;
  }
);