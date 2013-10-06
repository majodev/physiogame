define([],
  function() {
    function update(layer, gameObject, opt) {
      if (gameObject.position.x < gameObject.targetX) {
        gameObject.position.x += gameObject.speed;
      }
      if (gameObject.position.x > gameObject.targetX) {
        gameObject.position.x -= gameObject.speed;
      }
      if (gameObject.position.y < gameObject.targetY) {
        gameObject.position.y += gameObject.speed;
      }
      if (gameObject.position.y > gameObject.targetY) {
        gameObject.position.y -= gameObject.speed;
      }
      if (Math.abs(gameObject.position.x - gameObject.targetX) <= gameObject.speed) {
        gameObject.targetX = parseInt(Math.random() * layer.width, 10);
      }
      if (Math.abs(gameObject.position.y - gameObject.targetY) <= gameObject.speed) {
        gameObject.targetY = parseInt(Math.random() * layer.height, 10);
      }
    }

    return {
      update: update
    };
  }
);