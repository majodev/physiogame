define([],
  function() {
    var Binding = function (id) {
      this.id = id;

    };

    Binding.prototype = {
      constructor: Binding,
      onBinding: function (entity, systemid) {
        throw new Error("must be overridden by your specialized binding!");
      }
    };

    return Binding;

  }
);