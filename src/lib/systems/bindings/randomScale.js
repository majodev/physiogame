define(["systems/Binding", "underscore"],
  function(Binding, _) {

    var binding = new Binding("randomScale");

    binding.onBinding = function(entity, systemid) {

      var newScale = _.random(0, 1500)/1000;
      //console.log("randomScale onBinding");
      entity.c.scale.x = newScale;
      entity.c.scale.y = newScale;
      
    };

    return binding;
  }
);