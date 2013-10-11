define(["log", "classes/StatsCollection", "classes/StatModel", "underscore"],
  function(log, StatsCollection, StatModel, _) {

    var statsCollection = new StatsCollection(),
      current;
    
    // returns an instance of a new StatModel in the Collection
    function getNew() {
      current = new StatModel();
      statsCollection.push(current);
      log.debug("stats: new StatModel, id=" + current.cid);
      return current;
    }

    function getCurrent() {
      if(_.isUndefined(current) === true) {
        newStat();
      }
      return current;
    }

    function toJSON() {
      return statsCollection.toJSON();
    }

    function debug() {
      return JSON.stringify(statsCollection);
    }

    return {
      getNew: getNew,
      getCurrent: getCurrent,
      toJSON: toJSON
    };
  }
);