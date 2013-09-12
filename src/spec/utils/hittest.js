define(["utils/hittest"],
  function(hittest) {

    describe("utils/hittest", function() {

      it("can test if two points hit each other", function() {
        hittest({position: {x: 40, y: 40}},
          {position: {x: 40, y: 40}}).should.equal(true);
        
        hittest({position: {x: 40, y: 40}},
          {position: {x: 40, y: 41}}).should.equal(false);
        
        hittest({position: {x: 40, y: 40}},
          {position: {x: 41, y: 40}}).should.equal(false);
      });

      it("can test if a point hits a rectangle", function() {
        hittest({position: {x: 0, y: 0}, width: 100, height: 100},
          {position: {x: 40, y: 40}}).should.equal(true);

        hittest({position: {x: 0, y: 0}, width: 100, height: 100},
          {position: {x: 120, y: 120}}).should.equal(false);
      });

      it("can test if a rectangle hits a rectangle", function() {
        hittest({position: {x: 0, y: 0}, width: 100, height: 100},
          {position: {x: 40, y: 40}, width: 10, height: 10}).should.equal(true);

        hittest({position: {x: 25, y: 25}, width: 166, height: 166},
          {position: {x: 0, y: 0}, width: 100, height: 100}).should.equal(true);

        hittest({position: {x: 25, y: 25}, width: 25, height: 25},
          {position: {x: 140, y: 140}, width: 100, height: 100}).should.equal(false);
      });

    });
  });