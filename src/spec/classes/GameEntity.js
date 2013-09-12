define(["classes/GameEntity"],
  function(GameEntity) {

    describe("classes/GameEntity", function() {
      it("can extend components", function() {

        var entity = new GameEntity({
          c: {
            position: {
              x: 300,
              y: 500
            }
          }
        });

        entity.c.position.x.should.equal(300);
        entity.c.position.y.should.equal(500);

      });

      it("has systems array with overgiven systems", function() {

        var entity = new GameEntity({
          systems: ["testSystem1", "testSystem2"]
        });
        entity.systems.length.should.equal(2);

      });

      it("has empty systems array when nothing is specified", function() {

        var entityEmptySystems = new GameEntity();
        entityEmptySystems.systems.length.should.equal(0);

      });

      it("has empty components object when nothing is specified", function() {

        var entityEmptyComponent = new GameEntity();
        expect(entityEmptyComponent.c).to.be.an.instanceof(Object);

      });

      it("has empty display object when nothing is specified", function() {

        var entityEmptyContainer = new GameEntity();
        expect(entityEmptyContainer.display).to.be.an.instanceof(Object);

      });

      it("constructs instances that properly inherit from GameEntity", function() {

        var entity = new GameEntity();
        expect(entity).to.be.an.instanceof(GameEntity);

      });

      it("has a automatically filled uniqueID", function () {
        var entity1 = new GameEntity();
        var entity2 = new GameEntity();

        var uid1 = entity1.uid;

        entity2.uid.should.not.equal(uid1);

        entity1.uid.should.equal(uid1);

      });

      it("has cid, group and tags", function () {
        var entity1 = new GameEntity({cid: "one"});
        var entity2 = new GameEntity({group: "lol"});
        var entity3 = new GameEntity({tags:["first", "lol"]});
        var entity4 = new GameEntity();

        entity1.cid.should.equal("one");
        entity2.group.should.equal("lol");
        
        entity3.tags.length.should.equal(2);
        entity3.tags[0].should.equal("first");
        entity3.tags[1].should.equal("lol");

        entity4.cid.should.equal("");
        entity4.group.should.equal("");
        entity4.tags.length.should.equal(0);

      });


    });

  }
);