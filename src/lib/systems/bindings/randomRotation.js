define(["systems/Binding", "underscore"],
  function(Binding, _) {

    var binding = new Binding("randomScale");

    binding.onBinding = function(entity, systemid) {
      entity.c.rotation = Math.random() * Math.PI;
    };

    return binding;
  }
);