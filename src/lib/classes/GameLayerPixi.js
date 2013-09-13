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
        this.gameEntityUids.push(gameEntity.uid);

        // add to entityManager
        entityManager.addEntity(gameEntity);

        // add child to layer
        this.layer.addChild(gameEntity.display);
      },
      removeAllChildGes: function() {

        var i = this.layer.children.length-1;
        for (i; i >= 0; i -= 1) {
          this.layer.removeChild(this.layer.children[i]);
        }

        // strictly remove sorted uid array
        entityManager.removeEntitiesStrictSortedUids(this.gameEntityUids);
        this.gameEntityUids = [];
      }

    };

    return Layer;
  }
);