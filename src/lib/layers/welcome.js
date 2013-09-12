define(["PIXI", "display/factory", "config", "base/entityManager", "classes/GameEntity"],
  function(PIXI, factory, config, entityManager, GameEntity) {
    var layer = factory.makeLayer(),
      welcomeText;



    function activate() {
      welcomeText = new PIXI.Text("Physioshooter internal\nPress ENTER to start", {
        font: "bold italic 80px Arvo",
        fill: "#bb4433",
        align: "center",
        stroke: "#FFAAAA",
        strokeThickness: 5
      });

      welcomeText.position.x = config.get("width") / 2;
      welcomeText.position.y = config.get("height") / 2;
      welcomeText.anchor.x = 0.5;
      welcomeText.anchor.y = 0.5;

      layer.addChild(welcomeText);


      entityManager.addEntity(new GameEntity({
        cid: "testEntity",
        display: new PIXI.Text("gameEntity now WORKING!", {
          font: "bold italic 30px Arvo",
          fill: "#55AA77",
          align: "center",
          stroke: "#FFAAAA",
          strokeThickness: 5,
          anchor: {
            x: 0.5,
            y: 0.5
          }
        }),
        c: {
          position: {
            x: config.get("width") / 2,
            y: config.get("height") / 2
          },
          speed: {
            x: 1,
            y: 1
          }
        },
        systems: ["moveToTarget", "randomTarget", "pixiDisplay"]
      }));

      layer.addChild(entityManager.getEntityByCid("testEntity").display);

      config.on("change", configChanged);
    }

    function deactivate() {
      layer.removeChild(welcomeText);

      layer.removeChild(entityManager.getEntityByCid("testEntity").display);
      entityManager.removeEntity(entityManager.getEntityByCid("testEntity"));

      config.off("change", configChanged);
    }

    function configChanged(model, options) {
      welcomeText.position.x = config.get("width") / 2;
      welcomeText.position.y = config.get("height") / 2;
    }

    function getLayer() {
      return layer;
    }

    return {
      activate: activate,
      deactivate: deactivate,
      getLayer: function() {
        return layer;
      }
    };

  }
);