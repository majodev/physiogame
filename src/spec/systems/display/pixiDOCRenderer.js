define(["systems/display/pixiDOCRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiDOCRenderer, PIXI, GameEntity, _) {

    var testComponent = {
      position: {
        x: 10,
        y: 10
      },
      scale: {
        x: 0,
        y: 0
      },
      visible: false,
      alpha: 0.5,
      rotation: Math.PI
    };


    describe("systems/display/pixiDOCRenderer", function() {

      it("can update PIXI.DisplayObjectContainer based on GameEntity", function() {
        var ge = new GameEntity({
          display: new PIXI.DisplayObjectContainer(),
          c: _.cloneDeep(testComponent)
        });

        pixiDOCRenderer.addEntity(ge);
        pixiDOCRenderer.update();

        ge.display.position.x.should.equal(10);
        ge.display.position.y.should.equal(10);
        ge.display.scale.x.should.equal(0);
        ge.display.scale.y.should.equal(0);
        ge.display.visible.should.equal(false);
        ge.display.alpha.should.equal(0.5);
        ge.display.rotation.should.equal(Math.PI);

      });

      it("constructs a new PIXI.DisplayObjectContainer if display notvalid", function() {
        var ge = new GameEntity({
          c: _.cloneDeep(testComponent)
        });

        // added and gave the appropriate instance....
        pixiDOCRenderer.addEntity(ge);
        expect(ge.display).to.be.an.instanceof(PIXI.DisplayObjectContainer);

        // update to these suceess?
        pixiDOCRenderer.update();
        ge.display.position.x.should.equal(10);
        ge.display.position.y.should.equal(10);
        ge.display.scale.x.should.equal(0);
        ge.display.scale.y.should.equal(0);
        ge.display.visible.should.equal(false);
        ge.display.alpha.should.equal(0.5);
        ge.display.rotation.should.equal(Math.PI);

      });

    });

  }
);