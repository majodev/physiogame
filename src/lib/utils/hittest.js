define([],
  function() {
    return function hittest(r1, r2) {

      // define vars for normalized positions will consider the anchor
      var r1posx = 0,
        r1posy = 0,
        r2posx = 0,
        r2posy = 0;

      // set defaults if parameters are undefined
      r1.width = (r1.width === undefined) ? 0 : r1.width;
      r1.height = (r1.height === undefined) ? 0 : r1.height;
      r2.width = (r2.width === undefined) ? 0 : r2.width;
      r2.height = (r2.height === undefined) ? 0 : r2.height;
      r1.anchor = (r1.anchor === undefined) ? {x: 0, y: 0} : r1.anchor;
      r2.anchor = (r2.anchor === undefined) ? {x: 0, y: 0} : r2.anchor;

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