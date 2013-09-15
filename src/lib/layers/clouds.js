define(["log", "display/textures",
    "PIXI", "underscore", "classes/Layer"
  ],
  function(log, textures, PIXI, _, Layer) {

    var layer = new Layer({
      listeners: {
        render: true
      }
    });

    var clouds = [],
      cloudsToGenerate = 50,
      cloudsCount = 0;

    layer.onActivate = function () {
      var cloud;

      if (cloudsCount < cloudsToGenerate) {

        for (cloudsCount; cloudsCount < cloudsToGenerate; cloudsCount += 1) {
          cloud = new PIXI.MovieClip(textures.cloudTextures);

          cloud.anchor.x = 0.5;
          cloud.anchor.y = 0.5;
          cloud.position.x = parseInt(Math.random() * layer.width, 10);

          randomizeCloud(cloud);

          cloud.loop = true;
          cloud.gotoAndPlay(_.random(0, 24));

          clouds.push(cloud);

          this.pixiLayer.addChild(cloud);
        }
        log.debug("cloud activate");
      }

    };

    layer.onRender = function () {
      onRenderMove();
    };

    layer.onDeactivate = function () {
      cloudsCount = 0;
      clouds = [];
    };

    function randomizeCloud(cloud) {
      cloud.position.y = parseInt((layer.height * 0.40) + (Math.random() * layer.height * 0.60), 10);
      cloud.rotation = Math.random() * Math.PI;
      cloud.scale.x = cloud.scale.y = 0.10 + Math.random() * 1.10;
      cloud.speed = cloud.scale.x / 2;
      cloud.alpha = cloud.scale.x * 0.75;
    }

    function onRenderMove() {
      var i = 0,
        length = clouds.length;
      if (cloudsCount > 0) {
        for (i; i < cloudsCount; i += 1) {
          clouds[i].position.x += clouds[i].speed;
          clouds[i].position.y += (_.random(0, 1) === 0) ? -clouds[i].speed : clouds[i].speed;
          if (clouds[i].position.x > layer.width + 100) {
            clouds[i].position.x = -100;
            randomizeCloud(clouds[i]);
          }
        }
      }
    }

    return layer;

  }
);