define(["log", "Backbone"],
  function(log, Backbone) {
    
    var ActionComponent = Backbone.Model.extend({
      update: function() {
        // this function will be automatically called by 
        // the container of a implmented component on draw
        // hence: override this one in your implementation
        
        log.error("components should override this function" +
          "and implement their behaiour on update!");

        throw new Error("update should be overridden be implementing component");
      },
      defaults: {
        container: undefined // container gets the further implemented container should be supplied
      }
    });

    return ActionComponent;
  }
);