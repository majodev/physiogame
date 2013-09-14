define(["systems/display/pixiTextRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiTextRenderer, PIXI, GameEntity, _) {

    var testComponent = {};


    describe("systems/display/pixiTextRenderer", function() {

      it("can update PIXI.Text basic values (defaults + Sprites)", function() {
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
        ge.c.flags.dirty.text.should.equal(false);
        ge.c.flags.dirty.style.should.equal(false);

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

      it("can construct a new PIXI.Text and dynamically reset text", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            text: "myTestText"
          })
        });

        pixiTextRenderer.addEntity(ge);

        expect(ge.display).to.be.an.instanceof(PIXI.Text);

        ge.c.text = "nextText";
        ge.c.flags.dirty.text = true;

        pixiTextRenderer.updateEntity(ge);
        ge.display.text.should.equal("nextText");
        ge.c.flags.dirty.text.should.equal(false);

      });

      it("can construct a new PIXI.Text and dynamically reset style", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            text: "myTestText"
          })
        });

        pixiTextRenderer.addEntity(ge);

        expect(ge.display).to.be.an.instanceof(PIXI.Text);

        ge.c.style = {
          font: "bold 20pt Arial",
          fill: "#111111",
          align: "left",
          stroke: "#000000",
          strokeThickness: 1,
          wordWrap: true,
          wordWrapWidth: 20
        };

        ge.c.flags.dirty.style = true;
        pixiTextRenderer.updateEntity(ge);
        ge.c.flags.dirty.style.should.equal(false);

        // no way to access style directly in pixi object.

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