define(["backbone", "underscore"],
  function(Backbone, _) {

    function make() {
      return _.clone(Backbone.Events);
    }

    return {
      make: make
    };
  }
);