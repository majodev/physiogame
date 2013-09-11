define(["underscore"],
  function(_) {
    return function hittest(r1, r2) {

      // define vars for normalized positions will consider the anchor
      var r1posx = 0,
        r1posy = 0,
        r2posx = 0,
        r2posy = 0,
        parameterDefaults = {width: 0,
        height: 0,
        anchor: {
          x: 0,
          y: 0
        }};

      // set defaults for parameters
      _.defaults(r1, parameterDefaults);
      _.defaults(r2, parameterDefaults);

      // consider anchor and edit positions accordingly
      r1posx = r1.position.x - (r1.width * r1.anchor.x);
      r1posy = r1.position.y - (r1.height * r1.anchor.y);
      r2posx = r2.position.x - (r2.width * r2.anchor.x);
      r2posy = r2.position.y - (r2.height * r2.anchor.y);

      // test hitting
      if (((r1posx + r1.width >= r2posx) &&
          (r1posx <= r2posx + r2.width)) &&
        ((r1posy + r1.height >= r2posy) &&
          (r1posy <= r2posy + r2.height))) {
        return true;
      } else {
        return false;
      }
    };
  }
);