define(["lib/base/systemManager", "lib/base/entityManager"],
  function(systemManager, entityManager) {

    describe("componentEntitySystem", function() {
      it("entity can extend it", function() {
        

        hittest({position: {x: 40, y: 40}},
          {position: {x: 40, y: 40}}).should.equal(true);
      });
    });

  }
);