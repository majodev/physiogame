define(["systems/display/pixiSpriteRenderer", "PIXI", "classes/GameEntity", "underscore"],
  function(pixiSpriteRenderer, PIXI, GameEntity, _) {

    var testComponent = {
      position: {
        x: 10,
        y: 10
      },
      anchor: {
        x: 1,
        y: 1
      },
      scale: {
        x: 0,
        y: 0
      },
      visible: false,
      alpha: 0.5,
      rotation: Math.PI,
      width: 88,
      height: 88,
    };


    describe("systems/display/pixiSpriteRenderer", function() {

      it("can update PIXI.Sprite basic values (DOC like)", function() {
        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            autoDetectDimensions: true
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.position.x.should.equal(10);
        ge.display.position.y.should.equal(10);
        ge.display.visible.should.equal(false);
        ge.display.alpha.should.equal(0.5);
        ge.display.rotation.should.equal(Math.PI);

        ge.display.anchor.x.should.be.equal(1);
        ge.display.anchor.y.should.be.equal(1);


      });

      it("can autoDetect dimension from scales", function() {

        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            autoDetectDimensions: true
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.scale.x.should.equal(0);
        ge.display.scale.y.should.equal(0);

        ge.display.width.should.not.be.equal(88);
        ge.display.height.should.not.be.equal(88);

      });

      it("can autoDetect scale from dimensions", function() {

        var ge = new GameEntity({
          display: new PIXI.Sprite(PIXI.Texture.fromImage("nopicNeeded.png")),
          c: _.extend(_.cloneDeep(testComponent), {
            texture: {
              id: "testid"
            },
            autoDetectDimensions: false
          })
        });

        pixiSpriteRenderer.addEntity(ge);
        pixiSpriteRenderer.update();

        ge.display.scale.x.should.not.be.equal(0);
        ge.display.scale.y.should.not.be.equal(0);

        ge.display.width.should.be.equal(88);
        ge.display.height.should.be.equal(88);

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