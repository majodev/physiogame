define([],
  function() {

    function hitstatMiddlepoint(point, gameObject) {

      var gameObjectStartX = gameObject.position.x - (gameObject.width * gameObject.anchor.x);
      var gameObjectStartY = gameObject.position.y - (gameObject.height * gameObject.anchor.y);
      var gameObjectEndX = gameObjectStartX + gameObject.width;
      var gameObjectEndY = gameObjectStartY + gameObject.height;

      //var gameObjectEndX = gameObject.position.x + (gameObject.width * gameObject.anchor.x);
      //var gameObjectEndY = gameObject.position.y + (gameObject.height * gameObject.anchor.y);

      //console.log("startx: " + gameObjectStartX + " endx: " + gameObjectEndX + " pointx: " + point.position.x);

      var xToPointDistance = Math.abs((gameObjectStartX + gameObject.width / 2) - point.position.x);
      var yToPointDistance = Math.abs((gameObjectStartY + gameObject.height / 2) - point.position.y);

      var percentageX = Math.abs(1 - xToPointDistance / (gameObject.width / 2));
      var percentageY = Math.abs(1 - yToPointDistance / (gameObject.height / 2));
      var percentageBothAxis = (percentageX + percentageY) / 2;

      //console.log("x%: " + Math.ceil(percentageX * 100) + " y%: " + Math.ceil(percentageY * 100) + " all%: " + Math.ceil(percentageBothAxis * 100));

      if (percentageX < 0 || percentageX > 1 || percentageY < 0 ||
        percentageY > 1 || percentageBothAxis < 0 || percentageBothAxis > 1) {
        throw new Error("hitstatMiddlepoint: point x=" + point.position.x +
          " y=" + point.position.y + " is not within gameObject x=" +
          gameObjectStartX + " dx=" + (gameObjectEndX - gameObjectStartX) +
          " y=" + gameObjectStartY + " dy=" + (gameObjectEndY - gameObjectStartY));
      }

      return {
        percentageX: percentageX,
        percentageY: percentageY,
        percentageBothAxis: percentageBothAxis
      };
    }

    return hitstatMiddlepoint;

  }
);