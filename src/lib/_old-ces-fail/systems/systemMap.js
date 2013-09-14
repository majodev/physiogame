define(["systems/physic/moveToTarget", "systems/physic/rotateWithSpeed",
    "systems/display/pixiDOCRenderer", "systems/display/pixiSpriteRenderer",
    "systems/display/pixiTextRenderer", "systems/display/pixiMCRenderer",
    "systems/physic/resetRightToLeft", "systems/physic/moveWithSpeed"
  ],
  function(moveToTarget, rotateWithSpeed, 
    pixiDOCRenderer, pixiSpriteRenderer,
    pixiTextRenderer, pixiMCRenderer,
    resetRightToLeft, moveWithSpeed) {

    // LOOK OUT MUST BE IN ORDER OF EXECTION!
    // all systems that are available have to be defined here.
    var systems = [
      moveWithSpeed,
      moveToTarget,
      rotateWithSpeed,
      resetRightToLeft,
      pixiDOCRenderer,
      pixiSpriteRenderer,
      pixiTextRenderer,
      pixiMCRenderer
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