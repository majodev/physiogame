define(["systems/PhysicSystem"],
  function(PhysicSystem) {
    describe("PhysicSystem", function() {

      it("reports its systemType with physic", function() {
        var system = new PhysicSystem("testPhysicSystem");
        system.getSystemType().should.equal("physic");
      });

      it("constructs instances that properly inherit from PhysicSystem", function() {
        var system = new PhysicSystem("testPhysicSystem");

        expect(system).to.be.an.instanceof(PhysicSystem);
      });

    });
  }
);