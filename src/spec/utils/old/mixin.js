define(["lib/utils/mixin"],
  function(mixin) {

    describe("mixin", function() {

      it("mixes properties of any given object", function() {
        var obj1 = {arg1: "hi", arg2: "hi"};
        var obj2 = {arg3: "hi", arg4: "hi"};

        var mixed = mixin(obj1, obj2);

        mixed.should.have.property("arg1");
        mixed.should.have.property("arg2");
        mixed.should.have.property("arg3");
        mixed.should.have.property("arg4");
      });

      it("copies properties without leaving a reference to origin", function() {
        var obj1 = {arg1: "hi", arg2: "hi"};
        var mixed = mixin(obj1);
        obj1.arg1 = "newvalue";
        mixed.arg1.should.not.equal(obj1.arg1);
      });

    });
  });