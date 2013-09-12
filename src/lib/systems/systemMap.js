define(["systems/physic/moveToTarget", "systems/physic/randomPositionOnTargetReached",
    "systems/display/applyPixiPositions"
  ],
  function(moveToTarget, randomPositionOnTargetReached, applyPixiPositions) {

    // LOOK OUT MUST BE IN ORDER OF EXECTION!
    // all systems that are available have to be defined here.
    var systems = [
      moveToTarget,
      randomPositionOnTargetReached,
      applyPixiPositions
    ];

    function getSystem(id) {
      var i = 0,
        len = systems.length;

      for (i; i < len; i += 1) {
        if (systems[i].id === id) {
          return systems[i];
        }
      }
      throw new Error("systemGetter: undefined systemid:" + id);
    }

    function getAllSystems() {
      return systems;
    }

    return {
      getSystem: getSystem,
      getAllSystems: getAllSystems
    };
  }
);