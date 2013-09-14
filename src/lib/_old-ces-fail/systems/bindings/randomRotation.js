define(["systems/Binding", "underscore"],
  function(Binding, _) {

    var binding = new Binding("randomScale");

    binding.onBinding = function(entity, systemid) {
      //console.log("randomRotation onBinding");
      entity.c.rotation = Math.random() * Math.PI;
    };

    return binding;
  }
);