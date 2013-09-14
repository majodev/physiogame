define(["base/systemManager", "classes/GameEntity"],
  function(systemManager, GameEntity) {
    describe("base/systemManager", function() {

      it("resolves system based on id", function() {

        systemManager.init();

        systemManager.resolveSystem("moveToTarget").id.should.equal("moveToTarget");
        systemManager.resolveSystem("moveWithSpeed").id.should.equal("moveWithSpeed");

        systemManager.kill();

      });

      it("throws error on undefined system resolving", function() {

        systemManager.init();

        expect(function() {
          systemManager.resolveSystem("undefinedSystem");
        }).to.
        throw (Error);

        expect(function() {
          systemManager.resolveSystem();
        }).to.
        throw (TypeError);

        systemManager.kill();

      });

      it("can attach entities to predefined systems", function() {

        systemManager.init();

        systemManager.attachEntityToItsSystems({
          systems: ["moveToTarget", "moveWithSpeed"]
        });
        systemManager.attachEntityToItsSystems({
          systems: ["moveToTarget", "moveWithSpeed"]
        });

        systemManager.resolveSystem("moveToTarget").entities.length.should.equal(2);
        systemManager.resolveSystem("moveWithSpeed").entities.length.should.equal(2);

        systemManager.kill();

      });

      it("can attach entity to a new system", function() {
        systemManager.init();

        systemManager.attachEntityToNewSystemID({}, "moveToTarget");
        systemManager.attachEntityToNewSystemID({}, "moveToTarget");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equal(2);
        systemManager.resolveSystem("moveWithSpeed").entities.length.should.equal(0);

        systemManager.kill();
      });

      it("can deattach all entities from a system", function() {
        systemManager.init();

        var entity1 = {
          systems: ["moveToTarget"]
        };
        var entity2 = {
          systems: ["moveToTarget", "moveWithSpeed"]
        };

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);
        systemManager.deattachAllEntitiesFromSystemID("moveToTarget");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(0);
        systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(1);

        systemManager.kill();
      });

      it("can deattach specified entities from all systems", function() {

        systemManager.init();

        var entity1 = {
          systems: ["moveToTarget"]
        };
        var entity2 = {
          systems: ["moveToTarget", "moveWithSpeed"]
        };

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);

        systemManager.deattachEntitiesFromSystems([entity2]);

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(1);
        systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(0);

        systemManager.kill();

      });

      it("can deattach entity from specific system", function() {

        systemManager.init();

        var entity1 = {
          systems: ["moveToTarget"]
        };
        var entity2 = {
          systems: ["moveToTarget", "moveWithSpeed"]
        };

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);

        systemManager.deattachEntityFromSystemID(entity1, "moveToTarget");
        systemManager.deattachEntityFromSystemID(entity2, "moveWithSpeed");

        systemManager.resolveSystem("moveToTarget").entities.length.should.equals(1);
        systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(0);

        systemManager.kill();

      });

      // it("can (de)attach gameEntities with system bindings (complex systems)", function() {

      //   systemManager.init();

      //   var entity = new GameEntity({
      //     systems: [{
      //       id: "moveToTarget",
      //       bindings: {
      //         reset: "bindingFunction" // call 1 (string) on event
      //       }
      //     }, {
      //       id: "moveWithSpeed",
      //       bindings: {
      //         anotherevent: ["bindedFunction1", "bindedFunction2"], // call 1 and 2 on event
      //         yetanother: "binded3"
      //       }
      //     }]
      //   });

      //   systemManager.attachEntitiesToTheirSystems([entity]);

      //   systemManager.resolveSystem("moveToTarget").entities.length.should.equals(1);
      //   systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(1);

      //   systemManager.deattachEntitiesFromSystems([entity]);

      //   systemManager.resolveSystem("moveToTarget").entities.length.should.equals(0);
      //   systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(0);

      //   systemManager.kill();

      // });

      // it("throws error when binding of entity from systemevent was not found", function() {

      //   systemManager.init();

      //   var entity = new GameEntity({
      //     c: {
      //       position: {
      //         x: 0,
      //         y: 0
      //       },
      //       target: {
      //         x: 0,
      //         y: 0
      //       }
      //     },
      //     systems: [{
      //       id: "moveWithSpeed",
      //       bindings: {
      //         resetTargetX: ["testBinding1", "testBinding2"], // call 1 and 2 on event
      //         resetTargetY: "testBinding3"
      //       }
      //     }]
      //   });

      //   systemManager.attachEntitiesToTheirSystems([entity]);
      //   systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(1);

      //   expect(function() {
      //     systemManager.update();
      //   }).to.
      //   throw (Error); // bindings not found (runtime event check!)


      //   systemManager.kill();

      // });

      // it("can execute bindings of systems", function() {

      //   systemManager.init();

      //   var entity = new GameEntity({
      //     c: {
      //       position: {
      //         x: 0,
      //         y: 0
      //       },
      //       target: {
      //         x: 0,
      //         y: 0
      //       },
      //       scale: {
      //         x: -1,
      //         y: -1
      //       }
      //     },
      //     systems: [{
      //       id: "moveWithSpeed",
      //       bindings: {
      //         resetTargetX: ["randomScale", "randomScale"], // call 1 and 2 on event
      //         resetTargetY: "randomScale"
      //       }
      //     }]
      //   });

      //   systemManager.attachEntitiesToTheirSystems([entity]);
      //   systemManager.resolveSystem("moveWithSpeed").entities.length.should.equals(1);

      //   entity.c.scale.x.should.equal(-1);
      //   entity.c.scale.y.should.equal(-1);

      //   systemManager.update();

      //   entity.c.scale.x.should.not.equal(-1);
      //   entity.c.scale.y.should.not.equal(-1);

      //   systemManager.kill();

      // });

      it("updates entities through systems (with binding test)", function() {
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
          systems: ["moveToTarget"],
          binding: {
            moveToTargetXReached: ["randomTargetX"],
            moveToTargetYReached: ["randomTargetY"],
          }
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
          systems: ["moveToTarget"],
          binding: {
            moveToTargetXReached: ["randomTargetX"],
            moveToTargetYReached: ["randomTargetY"],
          }
        };

        systemManager.init();

        systemManager.attachEntitiesToTheirSystems([entity1, entity2]);
        systemManager.attachAllEntityBindings(entity1);
        systemManager.attachAllEntityBindings(entity2);
        systemManager.update();

        // check if right
        entity1.c.position.x.should.equals(0);
        entity1.c.position.y.should.equals(0);
        entity1.c.target.x.should.not.equals(0);
        entity1.c.target.y.should.not.equals(0);

        entity2.c.position.x.should.equals(5);
        entity2.c.position.y.should.equals(5);
        entity2.c.target.x.should.not.equals(5);
        entity2.c.target.y.should.not.equals(5);

        systemManager.kill();
      });

      it("can attach binding of entity and set it up correctly", function() {

        var entity = new GameEntity({
          systems: ["moveWithSpeed"],
          binding: {
            moveWithSpeedX: ["randomRotation", "randomScale"],
            moveWithSpeedY: ["randomScale"]
          }
        });

        systemManager.init();

        systemManager.attachAllEntityBindings(entity);

        systemManager.kill();

      });

      it("throws error when binding of entity cant be resolved", function() {

        var entity = new GameEntity({
          systems: ["moveToTarget"],
          binding: {
            moveToTargetXReached: ["NOTFOUND", "randomScale"],
            moveToTargetYReached: ["randomScale"]
          }
        });

        systemManager.init();

        expect(function() {
          systemManager.attachAllEntityBindings(entity);
        }).to.
        throw (Error);

        

        systemManager.kill();

      });

    });
  });