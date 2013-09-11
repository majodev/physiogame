define(["base/systemManager"],
  function(systemManager) {
    describe("systemManager", function() {

      it("attaches entities to the specified systems", function() {

        systemManager.init();

        systemManager.attachEntityToSystems({
          systems: ["moveToTarget", "randomPositionOnTargetReached"]
        });
        systemManager.attachEntityToSystems({
          systems: ["moveToTarget", "randomPositionOnTargetReached"]
        });

        systemManager.resolveSystem("moveToTarget").entities.length.should.equal(2);
        systemManager.resolveSystem("randomPositionOnTargetReached").entities.length.should.equal(2);

        systemManager.kill();

      });

      it("updates entities through systems", function() {
        var entity1 = {
          c: {
            position: {
              x: 10,
              y: 10
            },
            speed: {
              x: 10,
              y: 10
            },
            target: {
              x: 0,
              y: 0
            }
          },
          systems: ["moveToTarget"]
        };

        var entity2 = {
          c: {
            position: {
              x: 0,
              y: 0
            },
            target: {
              x: 5,
              y: 5
            },
            speed: {
              x: 5,
              y: 5
            }
          },
          systems: ["randomPositionOnTargetReached", "moveToTarget"]
        };

        systemManager.init();

        systemManager.attachEntitiesToSystems([entity1, entity2]);
        systemManager.update();

        // check if right
        entity1.c.position.x.should.equals(0);
        entity1.c.position.y.should.equals(0);
        entity1.c.target.x.should.equals(0);
        entity1.c.target.y.should.equals(0);

        entity2.c.position.x.should.equals(5);
        entity2.c.position.y.should.equals(5);
        entity2.c.target.x.should.not.equals(5);
        entity2.c.target.y.should.not.equals(5);

        systemManager.kill();
      });

    });
  });