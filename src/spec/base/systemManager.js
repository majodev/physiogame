define(["base/systemManager"],
  function(systemManager) {
    describe("base/systemManager", function() {

      it("resolves system based on id", function() {

        systemManager.init();

        systemManager.resolveSystem("moveToTarget").id.should.equal("moveToTarget");
        systemManager.resolveSystem("randomTarget").id.should.equal("randomTarget");

        systemManager.kill();

      });

      it("throws error on undefined system resolving", function() {

        systemManager.init();

        expect(function() {
          systemManager.resolveSystem("undefinedSystem");
        }).to.throw(Error);

        expect(function() {
          systemManager.resolveSystem();
        }).to.throw(TypeError);

        systemManager.kill();

      });

      it("can attach entities to predefined systems", function() {

        systemManager.init();

        systemManager.attachEntityToItsSystems({
          systems: ["moveToTarget", "randomTarget"]
        });
        systemManager.attachEntityToItsSystems({
          systems: ["moveToTarget", "randomTarget"]
        });

        systemManager.resolveSystem("moveToTarget").entities.length.should.equal(2);
        systemManager.resolveSystem("randomTarget").entities.length.should.equal(2);

        systemManager.kill();

      });

      it("can attach entity to a new system", function () {
        systemManager.init();

        systemManager.attachEntityToNewSystemID({}, "moveToTarget");
        systemManager.attachEntityToNewSystemID({}, "moveToTarget");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equal(2);
        systemManager.resolveSystem("randomTarget").entities.length.should.equal(0);

        systemManager.kill();
      });

      it("can deattach all entities from a system", function() {
        systemManager.init();

        var entity1 = {systems: ["moveToTarget"]};
        var entity2 = {systems: ["moveToTarget", "randomTarget"]};

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);
        systemManager.deattachAllEntitiesFromSystemID("moveToTarget");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(0);
        systemManager.resolveSystem("randomTarget").entities.length.should.equals(1);

        systemManager.kill();
      });

      it("can deattach specified entities from all systems", function() {

        systemManager.init();

        var entity1 = {systems: ["moveToTarget"]};
        var entity2 = {systems: ["moveToTarget", "randomTarget"]};

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);

        systemManager.deattachEntitiesFromSystems([entity2]);

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(1);
        systemManager.resolveSystem("randomTarget").entities.length.should.equals(0);

        systemManager.kill();

      });

      it("can deattach entity from specific system", function() {

        systemManager.init();

        var entity1 = {systems: ["moveToTarget"]};
        var entity2 = {systems: ["moveToTarget", "randomTarget"]};

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);

        systemManager.deattachEntityFromSystemID(entity1, "moveToTarget");
        systemManager.deattachEntityFromSystemID(entity2, "randomTarget");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(1);
        systemManager.resolveSystem("randomTarget").entities.length.should.equals(0);

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
          systems: ["randomTarget", "moveToTarget"]
        };

        systemManager.init();

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);
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