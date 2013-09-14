define(["systems/physic/moveToTarget"],
  function(moveToTarget) {

    describe("systems/physic/moveToTarget", function() {
      
      it("updates position correctly", function() {
        var testEntity = {c: {
          position: {
            x: 50,
            y: 50
          },
          speed: {
            x: 1,
            y: 1
          }
        }}; // standard target is at x0 y0

        moveToTarget.addEntity(testEntity);
        moveToTarget.update();

        testEntity.c.position.x.should.equal(49);
        testEntity.c.position.y.should.equal(49);
        testEntity.c.target.x.should.equal(0);
        testEntity.c.target.y.should.equal(0);
        testEntity.c.speed.x.should.equal(1);
        testEntity.c.speed.y.should.equal(1);

        moveToTarget.removeAllEntities();
        moveToTarget.entities.length.should.equal(0);

      });

      it("has the id moveToTarget", function() {
        moveToTarget.id.should.equal("moveToTarget");
      });

    });

  }
);