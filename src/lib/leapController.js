define(["Leap"], function (Leap) {

  // private 
  var controller = new Leap.Controller();
  var frameCount = 0;

  var init = function init() {
    console.log("init");
    controller.connect();
  };

  // per frame from leap
  controller.on("frame", function(frame) {
    //console.log("Frame: " + frame.id + " @ " + frame.timestamp);
    frameCount++;
  });

  // per interval ms
  setInterval(function() {
    var time = frameCount/2;
    console.log("received " + frameCount + " frames @ " + time + "fps");
    frameCount = 0;
  }, 2000);


  // public
  return {
    start: function start() {
      init();
    }
  };
});