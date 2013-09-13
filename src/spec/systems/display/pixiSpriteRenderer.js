define(["systems/display/pixiSpriteRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiSpriteRenderer, PIXI, GameEntity, _) {

    var testComponent = {};


    describe("systems/display/pixiSpriteRenderer", function() {

      it("can update PIXI.Sprite basic values (defaults + DOC)", function() {
        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            flags: {
              autoDetectDimensions: true
            }
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.position.x.should.equal(400);
        ge.display.position.y.should.equal(300);
        ge.display.visible.should.equal(true);
        ge.display.alpha.should.equal(1);
        ge.display.rotation.should.equal(0);

        ge.display.anchor.x.should.be.equal(0.5);
        ge.display.anchor.y.should.be.equal(0.5);

        ge.c.flags.autoDetectDimensions.should.be.equal(true);


      });

      it("can autoDetect dimension from scales", function() {

        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            flags: {
              autoDetectDimensions: true
            },
            width: 88,
            height: 88,
            scale: {
              x: 0,
              y: 0
            }
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.scale.x.should.equal(0);
        ge.display.scale.y.should.equal(0);

        ge.display.width.should.not.be.equal(88);
        ge.display.height.should.not.be.equal(88);
        ge.c.flags.autoDetectDimensions.should.be.equal(true);

      });

      it("can autoDetect scale from dimensions", function() {

        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            flags: {
              autoDetectDimensions: false
            },
            width: 88,
            height: 88,
            scale: {
              x: 0,
              y: 0
            }
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.scale.x.should.not.be.equal(0);
        ge.display.scale.y.should.not.be.equal(0);

        ge.display.width.should.be.equal(88);
        ge.display.height.should.be.equal(88);
        ge.c.flags.autoDetectDimensions.should.be.equal(false);

      });

      it("constructs a new PIXI.Sprite with texture id", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            }
          })
        });

        // fires error on texture not found (with id)
        expect(function() {
          pixiSpriteRenderer.addEntity(ge);
        }).to.
        throw (Error);

      });

      it("constructs a new PIXI.Sprite with texture image", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              image: "testimage.png"
            }
          })
        });

        pixiSpriteRenderer.addEntity(ge);

        expect(ge.display).to.be.an.instanceof(PIXI.Sprite);
      });

      it("raises error if either texture id or image undefined", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {})
        });

        expect(function() {
          pixiSpriteRenderer.addEntity(ge);
        }).to.
        throw (Error);

      });

      it("raises error on texture id type mismatch (must be string)", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: PIXI.Texture
            }
          })
        });

        expect(function() {
          pixiSpriteRenderer.addEntity(ge);
        }).to.
        throw (TypeError);
        
      });

      it("raises error on texture image type mismatch (must be string)", function() {
        var ge = new GameEntity({
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              image: PIXI.Texture
            }
          })
        });

        expect(function() {
          pixiSpriteRenderer.addEntity(ge);
        }).to.
        throw (TypeError);
        
      });

    });

  }
);