define(["underscore"],
  function(_) {
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
        gameObject.targetX = _.random(gameObject.width/2, layer.width-gameObject.width/2);
      }
      if (Math.abs(gameObject.position.y - gameObject.targetY) <= gameObject.speed) {
        gameObject.targetY = _.random(gameObject.height/2, layer.height-gameObject.height/2);
      }
    }

    return {
      update: update
    };
  }
);