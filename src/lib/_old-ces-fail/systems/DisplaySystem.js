define(["systems/GenericSystem", "utils/parasiticCombinationInheritance"],
  function(GenericSystem, parasiticCombinationInheritance) {

    function DisplaySystem(optionsObject) {
      GenericSystem.call(this, optionsObject);
      
      this.systemType = "display";
    }

    parasiticCombinationInheritance(DisplaySystem, GenericSystem);

    return DisplaySystem;

  }
);