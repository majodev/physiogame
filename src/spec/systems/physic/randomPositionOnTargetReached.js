define(["systems/physic/randomPositionOnTargetReached"],
  function(randomPositionOnTargetReached) {

    describe("randomPositionOnTargetReached", function() {
      
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

        randomPositionOnTargetReached.addEntity(testEntity);
        randomPositionOnTargetReached.update();

        testEntity.c.target.x.should.equal(1);
        testEntity.c.target.y.should.equal(1);

        testEntity.c.position = {x: 1, y: 1};
        
        // now target and position matches, must be resetted!
        randomPositionOnTargetReached.update();

        testEntity.c.target.x.should.not.equal(1);
        testEntity.c.target.y.should.not.equal(1);

      });

    });

  }
);