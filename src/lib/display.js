define(["PIXI"],
  function (PIXI) {
  
  // private
  var width = 800,
    height = 600,
    renderTarget = document.body,
    background = 0x000000,
    interactive = false,
    stage = new PIXI.Stage(background, interactive),
    renderer = PIXI.autoDetectRenderer(width, height),
    frameCount = 0;

  function render() {
    requestAnimFrame(render);
    renderer.render(stage);
    frameCount += 1;
  }

  (function init() {
    console.log("init");
    renderTarget.appendChild(renderer.view);
    requestAnimFrame(render);
  }());

  // per interval ms
  setInterval(function() {
    var time = frameCount/2;
    console.log("display: received " + frameCount + " frames @ " + time + "fps.");
    frameCount = 0;
  }, 2000);

  // public
  return {
    stage: stage,
    renderer: renderer
  };
});