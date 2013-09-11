define(["systems/GenericSystem", "utils/parasiticCombinationInheritance"],
  function(GenericSystem, parasiticCombinationInheritance) {

    function PhysicSystem(id) {
      GenericSystem.call(this, id);
      
      this.systemType = "physic";
    }

    parasiticCombinationInheritance(PhysicSystem, GenericSystem);

    return PhysicSystem;

  }
);