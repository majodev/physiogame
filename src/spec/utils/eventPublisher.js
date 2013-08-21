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

      it("raises error on unexpected eventTypes", function() {
        var events = eventPublisher([]);
        expect(function () {
          events.on("notfoundevent", function () {});
        }).to.throw(Error);
      });

      it("raises error on init with arguments that are not an array", function () {
        expect(function () {
          eventPublisher("no array");
        }).to.throw(Error);
        expect(function () {
          eventPublisher({object: "object"});
        }).to.throw(Error);
        expect(function () {
          eventPublisher([]);
        }).to.not.throw(Error);
      });

    });
  });