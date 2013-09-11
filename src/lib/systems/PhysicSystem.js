define(["systems/GenericSystem", "utils/parasiticCombinationInheritance"],
  function(GenericSystem, parasiticCombinationInheritance) {

    function PhysicSystem() {
      GenericSystem.call(this, id);
      this.systemType = "physic";
    }

    parasiticCombinationInheritance(PhysicSystem, GenericSystem);

    return PhysicSystem;

  }
);