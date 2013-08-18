define(["PIXI"], function (PIXI) {
  
  // private
  var width = 800,
    height = 600,
    background = 0x005588,
    interactive = false,
    stage = new PIXI.Stage(background, interactive),
    renderer = PIXI.autoDetectRenderer(width, height),
    initialized = false;

  var init = function init() {
    if(!initialized) {
      console.log("init");
      document.body.appendChild(renderer.view);

      requestAnimFrame(render);

      initialized = true;
    } else {
      console.log("already initialized, doing nothing.");
    }
  };

  var render = function render() {
    requestAnimFrame(render);
    renderer.render(stage);
  };

  // public
  return {
    start: function start() {
      init();
    }
  };
});