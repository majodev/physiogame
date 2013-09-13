define(["base/entityManager", "classes/GameEntity"],
  function(entityManager, GameEntity) {
    describe("base/entityManager", function() {

      it("adds and gets entities based on cid", function() {

        entityManager.init();
        entityManager.addEntity(new GameEntity({
          cid: "customID",
          group: "testGroup"
        }));

        entityManager.getEntityByCid("customID").group.should.equal("testGroup");
        entityManager.kill();

      });

      it("adds and removes entities", function() {

        var entity = new GameEntity({
          systems: ["moveToTarget"]
        });

        entityManager.init();

        entityManager.addEntity(entity);

        entityManager.getEntitiesLength().should.equal(1);

        entityManager.removeEntity(entity);

        entityManager.getEntitiesLength().should.equal(0);
        entity.systems.length.should.equal(0);

        entityManager.kill();

      });

      it("removes multiple entities with uid array", function() {
        var notRemoved1 = new GameEntity();
        var entity1 = new GameEntity();
        var notRemoved2 = new GameEntity();
        var entity2 = new GameEntity();
        var notRemoved3 = new GameEntity();
        var entity3 = new GameEntity();
        var notRemoved4 = new GameEntity();


        entityManager.init();

        entityManager.addEntities([notRemoved1, entity1, notRemoved2, entity2, notRemoved3, entity3, notRemoved4]);
        entityManager.getEntitiesLength().should.equal(7);

        entityManager.removeEntitiesStrictSortedUids([entity1.uid, entity2.uid, entity3.uid]);
        entityManager.getEntitiesLength().should.equal(4);

        entityManager.kill();
      });

      it("removeEntitiesStrictSortedUids throws error if a uid could not be removed", function() {

        var entity1 = new GameEntity();
        var notAdded = new GameEntity();
        var entity2 = new GameEntity();

        entityManager.init();

        entityManager.addEntities([entity1, entity2]);
        entityManager.getEntitiesLength().should.equal(2);

        expect(function() {
          entityManager.removeEntitiesStrictSortedUids([entity1.uid, entity2.uid, notAdded.uid]);
        }).to.
        throw (Error);

        entityManager.kill();
      });

      it("returns false on removing a nonexistant entity", function() {
        var entity = new GameEntity();

        entityManager.init();

        entityManager.removeEntity(entity).should.equal(false);

        entityManager.kill();
      });

      it("can remove many entities at once", function() {
        var entity1 = new GameEntity({
          tags: ["one", "three", "two"]
        });
        var entity2 = new GameEntity({
          tags: ["three"]
        });
        var entity3 = new GameEntity({
          tags: ["three", "two"]
        });

        entityManager.init();

        entityManager.addEntities([entity1, entity2, entity3]);

        entityManager.removeEntities([entity1, entity2, entity3]);
        entityManager.getEntitiesLength().should.equal(0);

        entityManager.kill();
      });

      it("returns tagged entities", function() {
        var entity1 = new GameEntity({
          tags: ["one", "three", "two"]
        });
        var entity2 = new GameEntity({
          tags: ["three"]
        });
        var entity3 = new GameEntity({
          tags: ["three", "two"]
        });

        entityManager.init();

        entityManager.addEntities([entity1, entity2, entity3]);

        entityManager.getEntitiesByTag("one").length.should.equal(1);
        entityManager.getEntitiesByTag("two").length.should.equal(2);
        entityManager.getEntitiesByTag("three").length.should.equal(3);
        entityManager.getEntitiesByTag("nonexistant").length.should.equal(0);

        entityManager.kill();
      });

      it("returns group entities", function() {
        var entity1 = new GameEntity({
          group: "first"
        });
        var entity2 = new GameEntity({
          group: "second"
        });
        var entity3 = new GameEntity({
          group: "second"
        });

        entityManager.init();

        entityManager.addEntities([entity1, entity2, entity3]);

        entityManager.getEntitiesByGroup("first").length.should.equal(1);
        entityManager.getEntitiesByGroup("second").length.should.equal(2);
        entityManager.getEntitiesByGroup("nonexistant").length.should.equal(0);

        entityManager.kill();
      });

      it("returns true on removing a existant entity", function() {
        var entity = new GameEntity();

        entityManager.init();

        entityManager.addEntity(entity);
        entityManager.removeEntity(entity).should.equal(true);

        entityManager.kill();
      });

      it("throws error when cid is not found", function() {
        entityManager.init();

        expect(function() {
          entityManager.getEntityByCid("notFound");
        }).to.
        throw (Error);

        entityManager.kill();

      });

      it("throws error when uid is not found", function() {

        entityManager.init();

        expect(function() {
          entityManager.getEntityByUid("anyUID");
        }).to.
        throw (Error);

        entityManager.kill();

      });


    });
  });