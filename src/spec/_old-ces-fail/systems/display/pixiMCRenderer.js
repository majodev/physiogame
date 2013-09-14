define(["systems/display/pixiMCRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiMCRenderer, PIXI, GameEntity, _) {

    var testComponent = {};

    describe("systems/display/pixiMCRenderer", function() {

      it("throws error when textures are not found", function() {

        expect(function() {
          var ge = new GameEntity({
            display: new PIXI.MovieClip(["abc1", "abc2"]),
            c: _.extend(_.cloneDeep(testComponent), {
              textures: ["abc1", "abc2"]
            })
          });
        }).to.
        throw (Error);

      });

      it("throws error when textures are not found at construction", function() {

        var ge = new GameEntity({
            c: _.extend(_.cloneDeep(testComponent), {
              textures: ["abc1", "abc2"]
            })
          });

        expect(function() {
          pixiMCRenderer.addEntity(ge);
        }).to.
        throw (Error);

      });

    });

  }
);