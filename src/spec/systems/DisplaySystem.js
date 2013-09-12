define(["systems/DisplaySystem"],
  function(DisplaySystem) {
    describe("systems/DisplaySystem", function() {

      it("reports its systemType with display", function() {
        var system = new DisplaySystem({
          id: "testDisplaySystem"
        });
        system.getSystemType().should.equal("display");
      });

      it("constructs instances that properly inherit from DisplaySystem", function() {
        var system = new DisplaySystem({
          id: "testDisplaySystem"
        });

        expect(system).to.be.an.instanceof(DisplaySystem);
      });

    });
  }
);