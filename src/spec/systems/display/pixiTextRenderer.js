define(["systems/display/pixiTextRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiTextRenderer, PIXI, GameEntity, _) {

    var testComponent = {
      dirty: {
        text: true,
        style: true
      },
      style: {
        font: "bold 20pt Arial",
        fill: "#000000",
        align: "center",
        stroke: "#FFFFFF",
        strokeThickness: 3,
        wordWrap: false,
        wordWrapWidth: 100
      }
    };


    describe("systems/display/pixiTextRenderer", function() {

      it("can update PIXI.Text basic values (Sprite like)", function() {
        var ge = new GameEntity({
          display: new PIXI.Text(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            text: "testText"
          })
        });

        pixiTextRenderer.addEntity(ge);
        pixiTextRenderer.update();

        // combined test from DOC and Sprites...
        ge.display.position.x.should.equal(400);
        ge.display.position.y.should.equal(300);
        ge.display.visible.should.equal(true);
        ge.display.alpha.should.equal(1);
        ge.display.rotation.should.equal(0);

        ge.display.anchor.x.should.be.equal(0.5);
        ge.display.anchor.y.should.be.equal(0.5);

        // text specific settings...
        ge.c.text.should.equal("testText");
        ge.display.text.should.equal("testText");

        // test display was synchronized with model...
        ge.c.dirty.text.should.equal(false);
        ge.c.dirty.style.should.equal(false);

      });

      it("constructs a new PIXI.Text with text", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            text: "myTestText"
          })
        });

        pixiTextRenderer.addEntity(ge);

        expect(ge.display).to.be.an.instanceof(PIXI.Text);
      });

      it("raises error if text is undefined", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {})
        });

        expect(function() {
          pixiTextRenderer.addEntity(ge);
        }).to.
        throw (Error);
      });

      it("raises error if text is no string", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            text: 13451234
          })
        });

        expect(function() {
          pixiTextRenderer.addEntity(ge);
        }).to.
        throw (TypeError);
        
      });

    });

  }
);