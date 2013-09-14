define(["systems/display/pixiDOCRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiDOCRenderer, PIXI, GameEntity, _) {

    var testComponent = {};


    describe("systems/display/pixiDOCRenderer", function() {

      it("can update PIXI.DOC based on GameEntity (defaults)", function() {
        var ge = new GameEntity({
          display: new PIXI.DisplayObjectContainer(),
          c: _.cloneDeep(testComponent)
        });

        pixiDOCRenderer.addEntity(ge);
        pixiDOCRenderer.update();

        ge.display.position.x.should.equal(400);
        ge.display.position.y.should.equal(300);
        ge.display.visible.should.equal(true);
        ge.display.alpha.should.equal(1);
        ge.display.rotation.should.equal(0);
        ge.display.scale.x.should.equal(1);
        ge.display.scale.y.should.equal(1);

      });

      it("can construct a new PIXI.DOC if no display", function() {
        var ge = new GameEntity({
          c: _.cloneDeep(testComponent)
        });

        // added and gave the appropriate instance....
        pixiDOCRenderer.addEntity(ge);
        expect(ge.display).to.be.an.instanceof(PIXI.DisplayObjectContainer);

        // update to these suceess?
        pixiDOCRenderer.update();
        ge.display.position.x.should.equal(400);
        ge.display.position.y.should.equal(300);
        ge.display.visible.should.equal(true);
        ge.display.alpha.should.equal(1);
        ge.display.rotation.should.equal(0);
        ge.display.scale.x.should.equal(1);
        ge.display.scale.y.should.equal(1);

      });

    });

  }
);