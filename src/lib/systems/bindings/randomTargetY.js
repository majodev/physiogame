define(["systems/Binding", "underscore"],
  function(Binding, _) {

    var binding = new Binding("randomTargetY");

    binding.onBinding = function(entity, systemid) {
      entity.c.target.y = _.random(
          0 - entity.c.target.bounds.y,
          entity.c.target.bounds.height + entity.c.target.bounds.y);
    };

    return binding;
  }
);