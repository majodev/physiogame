define(["systems/GenericSystem"],
  function(GenericSystem) {
    describe("GenericSystem", function() {

      it("needs a mandadory id parameter", function() {
        
        expect(function() {
          new GenericSystem();
        }).to.throw(Error);

      });

      it("needs mandadory id to be a string", function() {
        
        expect(function() {
          new GenericSystem({});
        }).to.throw(TypeError);

      });

      it("has optinal needs and entities parameters", function() {

        var system = new GenericSystem("testSystem");
        system.id.should.equal("testSystem");
        system.needs.length.should.equal(0);
        system.entities.length.should.equal(0);

      });

      it("can add entities", function() {

        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity);
        system.entities.length.should.equal(1);

      });

      it("can remove entities", function() {

        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity);
        system.entities.length.should.equal(1);

        system.removeEntity(testEntity);
        system.entities.length.should.equal(0);

      });

      it("avoids entity duplicates", function() {
        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity);
        system.addEntity(testEntity);
        system.entities.length.should.equal(1);

        system.removeEntity(testEntity);
        system.removeEntity(testEntity);
        system.entities.length.should.equal(0);
      });

      it("returns false when removing non existant entities", function() {
        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.removeEntity(testEntity).should.equal(false);
        system.entities.length.should.equal(0);
      });

      it("returns false when adding existant entities", function() {
        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity).should.equal(true);
        system.entities.length.should.equal(1);

        system.addEntity(testEntity).should.equal(false);
        system.entities.length.should.equal(1);

      });

      it("appends needed components to entity.components[] when entity is added", function() {
        var system = new GenericSystem("testSystem", [{a1: 1}, {a2: 2}]);
        var testEntity = { c: {} };

        system.addEntity(testEntity);

        testEntity.c.a1.should.equal(1);
        testEntity.c.a2.should.equal(2);
      });

      it("appends systemid to entity.systems[] on add", function() {
        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity);

        testEntity.systems[0].should.equal("testSystem");
        testEntity.systems.length.should.equal(1);
      });

      it("removes systemid from entity.systems[] on remove", function() {
        var system = new GenericSystem("testSystem");
        var testEntity = {};

        system.addEntity(testEntity);

        testEntity.systems[0].should.equal("testSystem");
        testEntity.systems.length.should.equal(1);

        system.removeEntity(testEntity);
        testEntity.systems.length.should.equal(0);

      });

      it("reports its systemType with generic", function() {
        var system = new GenericSystem("testSystem");
        system.getSystemType().should.equal("generic");

      });

      it("throws Error on init, update or kill (needs override)", function() {
        var system = new GenericSystem("testSystem");
        
        expect(function() {
          system.init();
        }).to.throw(Error);

        expect(function() {
          system.update();
        }).to.throw(Error);

        expect(function() {
          system.kill();
        }).to.throw(Error);

      });

    });
  }
);