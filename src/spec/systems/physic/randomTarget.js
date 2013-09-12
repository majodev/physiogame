define(["systems/physic/randomTarget"],
  function(randomTarget) {

    describe("systems/physic/randomTarget", function() {
      
      it("resets position if target is reached", function() {
        var testEntity = {c: {
          position: {
            x: 2,
            y: 2
          },
          target: {
            x: 1,
            y: 1
          }
        }};

        randomTarget.addEntity(testEntity);
        randomTarget.update();

        testEntity.c.target.x.should.equal(1);
        testEntity.c.target.y.should.equal(1);

        testEntity.c.position = {x: 1, y: 1};
        
        // now target and position matches, must be resetted!
        randomTarget.update();

        testEntity.c.target.x.should.not.equal(1);
        testEntity.c.target.y.should.not.equal(1);

        randomTarget.removeAllEntities();
        randomTarget.entities.length.should.equal(0);

      });

      it("has the id randomTarget", function() {
        randomTarget.id.should.equal("randomTarget");
      });

    });

  }
);