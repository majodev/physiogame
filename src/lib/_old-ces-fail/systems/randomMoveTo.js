define(["appConfig"],
  function(appConfig) {

    var width = appConfig.get("width"),
      height = appConfig.get("height");

    function init(container) {
      
      container.target = {
        x: parseInt(Math.random() * width, 10),
        y: parseInt(Math.random() * height, 10)
      };
      
      container.speed = {
        x: 1,
        y: 1
      };
      
    }

    function update(container) {

      if (container.position.x < container.target.x) {
        container.position.x += container.speed.x;
      }
      if (container.position.x > container.target.x) {
        container.position.x -= container.speed.x;
      }
      if (container.position.y < container.target.y) {
        container.position.y += container.speed.y;
      }
      if (container.position.y > container.target.y) {
        container.position.y -= container.speed.y;
      }
      if (container.position.x === container.target.x) {
        container.target.x = parseInt(Math.random() * width, 10);
      }
      if (container.position.y === container.target.y) {
        container.target.y = parseInt(Math.random() * height, 10);
      }

    }

    function kill(container) {

    }

    return {
      init: init,
      update: update,
      kill: kill
    };
  }
);