define(["log"],
  function(log) {

    var GenericComponent = function() {
      // empty constructor function
    };

    GenericComponent.prototype.update = function(container) {

      log.error("components should override this function" +
        "and implement their behaiour on update!");

      throw new Error("update should be overridden be implementing component");

    };

    return GenericComponent;

  }
);