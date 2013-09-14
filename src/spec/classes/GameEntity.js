define(["classes/GameEntity", "underscore"],
  function(GameEntity, _) {

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

      it("has a automatically filled uniqueID", function() {
        var entity1 = new GameEntity();
        var entity2 = new GameEntity();

        var uid1 = entity1.uid;

        entity2.uid.should.not.equal(uid1);

        entity1.uid.should.equal(uid1);

      });

      it("has cid, group and tags", function() {
        var entity1 = new GameEntity({
          cid: "one"
        });
        var entity2 = new GameEntity({
          group: "lol"
        });
        var entity3 = new GameEntity({
          tags: ["first", "lol"]
        });
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

      it("can accept optional bindings to systemevents on a entity", function() {

        var entity = new GameEntity({
          systems: ["normal", {
            id: "bindedsystem",
            bindings: {
              reset: "bindingFunction" // call 1 (string) on event
            }
          }, {
            id: "bindedsystem2",
            bindings: {
              anotherevent: ["bindedFunction1", "bindedFunction2"], // call 1 and 2 on event
              yetanother: "binded3"
            }
          }]
        });

        entity.systems[0].should.equal("normal");

        // one binding per event id

        entity.systems[1].id.should.equal("bindedsystem");
        
        _.keys(entity.systems[1].bindings).length.should.equal(1);
        _.keys(entity.systems[1].bindings)[0].should.equal("reset");
        entity.systems[1].bindings.reset.should.equal("bindingFunction");

        // more bindings per event id

        entity.systems[2].id.should.equal("bindedsystem2");
        
        _.keys(entity.systems[2].bindings).length.should.equal(2);
        
        _.isArray(entity.systems[2].bindings.anotherevent).should.equal(true);
        _.isString(entity.systems[2].bindings.yetanother).should.equal(true);

        entity.systems[2].bindings.anotherevent[0].should.equal("bindedFunction1");

      });


    });

  }
);