define(["lib/utils/eventPublisher"],
  function(eventPublisher) {

    describe("eventPublisher", function() {

      it("adds subscription at on and registers", function() {
        var events = eventPublisher(["testEvent1"]);
        events.on("testEvent1", function() {
          return true;
        });
        events.subscribers.should.have.property("testEvent1").with.length(1);
      });

      it("cleans a subscription on remove call", function() {
        var events = eventPublisher(["testEvent1"]);
        var testfunction = function() {
          return true;
        };
        events.on("testEvent1", testfunction);
        events.remove("testEvent1", testfunction);
        events.subscribers.should.have.property("testEvent1").with.length(0);
      });

      it("fires events to subscripers", function() {
        var events = eventPublisher(["testEvent1"]);
        var invoked = 0;
        var testfunction = function() {
          invoked += 1;
        };
        events.on("testEvent1", testfunction);
        events.fire("testEvent1");
        events.fire("testEvent1");
        invoked.should.be.equal(2);
      });

      it("raises Error on unexpected eventTypes used at runtime", function() {
        var events = eventPublisher(["notusedevent"]);
        expect(function () {
          events.on("notfoundevent", function () {});
        }).to.throw(Error);
      });

      it("raises TypeError on init with first argument is not an array", function () {
        expect(function () {
          eventPublisher("no array");
        }).to.throw(TypeError);
        expect(function () {
          eventPublisher({object: "object"});
        }).to.throw(TypeError);
      });

      it("raises Error on init when eventtype array is empty", function () {
        expect(function () {
          eventPublisher([]);
        }).to.throw(Error);
      });

      it("raises TypeError on init when eventtype array does not consist of strings", function () {
        expect(function () {
          eventPublisher([{lol: "lol"}]);
        }).to.throw(TypeError);
      });

    });
  });