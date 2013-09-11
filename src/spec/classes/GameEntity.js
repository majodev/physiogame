define(["classes/GameEntity"],
  function(GameEntity) {

    describe("GameEntity", function() {
      it("can extend components", function() {

        var entity = new GameEntity(null, {
          position: {
            x: 300,
            y: 500
          }
        });

        entity.c.position.x.should.equal(300);
        entity.c.position.y.should.equal(500);

      });

      it("has systems array", function() {

        var entity = new GameEntity(null, {}, ["testSystem1", "testSystem2"]);
        entity.systems.length.should.equal(2);

        var entityEmptySystems = new GameEntity(null);
        entityEmptySystems.systems.length.should.equal(0);

      });

      it("constructs instances that properly inherit from GameEntity", function () {

        var entity = new GameEntity(null);
        expect(entity).to.be.an.instanceof(GameEntity);
        
      });


    });

  }
);