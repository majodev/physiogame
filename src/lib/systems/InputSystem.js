define(["systems/GenericSystem", "utils/parasiticCombinationInheritance"],
  function(GenericSystem, parasiticCombinationInheritance) {

    function InputSystem(optionsObject) {
      GenericSystem.call(this, optionsObject);
      
      this.systemType = "input";
    }

    parasiticCombinationInheritance(InputSystem, GenericSystem);

    return InputSystem;

  }
);