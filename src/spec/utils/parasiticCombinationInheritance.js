define(["utils/parasiticCombinationInheritance"],
  function(parasiticCombinationInheritance) {

    describe("utils/parasiticCombinationInheritance", function() {

      it("sets up prototype chain as expected", function() {
        var ParentClass = function (id) {
          this.id = id;
        };

        ParentClass.prototype = {
          constructor: ParentClass,
          getID: function () {
            return this.id;
          },
          overridden: function () {
            return "not overridden!";
          }
        };

        var ChildClass = function (id) {
          ParentClass.call(this, id);
        };

        parasiticCombinationInheritance(ChildClass, ParentClass);
        

        // NOTE: you cannot override with the constructor/prototype combination pattern!
        ChildClass.prototype.overridden = function () {
          return "overridden!";
        };

        var childTest = new ChildClass("test");

        expect(childTest.getID()).equals("test");
        expect(childTest.overridden()).equals("overridden!");

      });

    });
  });