define(["systems/Binding", "underscore"],
  function(Binding, _) {

    var binding = new Binding("randomTargetX");

    binding.onBinding = function(entity, systemid) {
      entity.c.target.x = _.random(
          0 - entity.c.target.bounds.x,
          entity.c.target.bounds.width + entity.c.target.bounds.x);
    };

    return binding;
  }
);