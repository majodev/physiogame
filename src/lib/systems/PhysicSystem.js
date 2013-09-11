define(["systems/GenericSystem"],
  function(GenericSystem) {

    function PhysicSystem() {
      GenericSystem.call(this, id);
      this.systemType = "physic";
    }

    parasiticCombinationInheritance(PhysicSystem, GenericSystem);

    return PhysicSystem;

  }
);