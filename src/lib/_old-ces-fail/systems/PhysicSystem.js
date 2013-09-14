define(["systems/GenericSystem", "utils/parasiticCombinationInheritance"],
  function(GenericSystem, parasiticCombinationInheritance) {

    function PhysicSystem(optionsObject) {
      GenericSystem.call(this, optionsObject);
      
      this.systemType = "physic";
    }

    parasiticCombinationInheritance(PhysicSystem, GenericSystem);

    return PhysicSystem;

  }
);