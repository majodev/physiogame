define(["log", "classes/StatsCollection", "classes/StatModel", "underscore",
    "csv"
  ],
  function(log, StatsCollection, StatModel, _,
    csv) {

    var statsCollection = new StatsCollection(),
      current;

    // fetch previous stats from LocalStorage
    statsCollection.fetch();

    // returns an instance of a new StatModel in the Collection

    function getNew() {
      current = new StatModel();
      statsCollection.push(current);
      log.debug("stats: getNew id=" + current.cid);
      return current;
    }

    function getCurrent() {
      if (_.isUndefined(current) === true) {
        newStat();
      }
      return current;
    }

    function saveCurrent() {
      if (_.isUndefined(current) === false) {
        log.debug("stats: saveCurrent id=" + current.cid);
        current.save();
      }
    }

    function clearAllStats() {
      localStorage.clear("StatsCollection");
      statsCollection.fetch();
    }

    function toJSON() {
      return statsCollection.toJSON();
    }

    function toCSV() {
      return csv(JSON.stringify(statsCollection));
    }

    function debug() {
      return JSON.stringify(statsCollection);
    }

    function getCollection() {
      return statsCollection;
    }

    return {
      getCollection: getCollection,
      getNew: getNew,
      getCurrent: getCurrent,
      saveCurrent: saveCurrent,
      clearAllStats: clearAllStats,
      toJSON: toJSON,
      toCSV: toCSV,
      debug: debug
    };
  }
);