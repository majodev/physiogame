define(["log", "base/displayManager", "display/textures", "display/factory",
    "PIXI", "underscore", "config", "classes/GameLayerPixi"
  ],
  function(log, displayManager, textures, factory, PIXI, _, config, GameLayerPixi) {


    var layer = new GameLayerPixi();

    layer.activate = function() {

      var i = 0,
        randomScale;
      for (i; i < 50; i += 1) {

        randomizer = _.random(1, 1000)/1000;

        this.addChildGe({
          group: "clouds",
          c: {
            textures: textures.cloudTextureNames,
            loop: true,
            flags: {
              playing: true
            },
            position: {
              x: _.random(0, config.get("width")),
              y: _.random(config.get("height") / 2, config.get("height"))
            },
            speed: {
              x: randomizer,
              y: 0
            },
            alpha: randomizer,
            scale: {
              x: randomizer,
              y: randomizer
            }
          },
          systems: ["pixiMCRenderer", "moveWithSpeed", "resetRightToLeft"]
        });
      }

      //cloud.loop = true;
      //cloud.gotoAndPlay(_.random(0, 24));
    };

    return layer;

    // var layer = factory.makeLayer(),
    //   clouds = [],
    //   width,
    //   height,
    //   running = false,
    //   cloudsToGenerate = 50,
    //   cloudsCount = 0;


    // function activate() {

    //   var cloud;

    //   if (cloudsCount < cloudsToGenerate && running === false) {

    //     width = config.get("width");
    //     height = config.get("height");

    //     for (cloudsCount; cloudsCount < cloudsToGenerate; cloudsCount += 1) {
    //       cloud = new PIXI.MovieClip(textures.cloudTextures);

    //       cloud.anchor.x = 0.5;
    //       cloud.anchor.y = 0.5;
    //       cloud.position.x = parseInt(Math.random() * width, 10);

    //       randomizeCloud(cloud);

    //       cloud.loop = true;
    //       cloud.gotoAndPlay(_.random(0, 24));

    //       clouds.push(cloud);

    //       layer.addChild(cloud);
    //     }
    //     log.debug("cloud activate");
    //   }

    //   if (running === false) {
    //     displayManager.events.on("renderFrame", onRenderMove);
    //     config.on("change", configChanged);

    //     running = true;
    //   }
    // }

    // function randomizeCloud(cloud) {
    //   cloud.position.y = parseInt((height * 0.40) + (Math.random() * height * 0.60), 10);
    //   cloud.rotation = Math.random() * Math.PI;
    //   cloud.scale.x = cloud.scale.y = 0.10 + Math.random() * 1.10;
    //   cloud.speed = cloud.scale.x / 2;
    //   cloud.alpha = cloud.scale.x * 0.75;
    // }

    // function onRenderMove() {
    //   var i = 0,
    //     length = clouds.length;
    //   if (cloudsCount > 0) {
    //     for (i; i < cloudsCount; i += 1) {
    //       clouds[i].position.x += clouds[i].speed;
    //       clouds[i].position.y += (_.random(0, 1) === 0) ? -clouds[i].speed : clouds[i].speed;
    //       if (clouds[i].position.x > width + 100) {
    //         clouds[i].position.x = -100;
    //         randomizeCloud(clouds[i]);
    //       }
    //     }
    //   }
    // }

    // function configChanged(model, options) {
    //   width = model.get("width");
    //   height = model.get("height");
    // }

    // function deactivate() {
    //   var i = 0,
    //     len = clouds.length;

    //   displayManager.events.off("renderFrame", onRenderMove);

    //   for (i; i < len; i += 1) {
    //     layer.removeChild(clouds[i]);
    //   }

    //   cloudsCount = 0;
    //   clouds = [];
    //   running = false;
    // }

    // return {
    //   activate: activate,
    //   deactivate: deactivate,
    //   getLayer: function() {
    //     return layer;
    //   }
    // };

  }
);