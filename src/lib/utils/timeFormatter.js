define([],
  function() {
    // helper to format the seconds into something displayable
    function formatSeconds(secs) {
      var sec_num = parseInt(secs, 10),
        hours = Math.floor(sec_num / 3600),
        minutes = Math.floor((sec_num - (hours * 3600)) / 60),
        seconds = sec_num - (hours * 3600) - (minutes * 60),
        time;

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      time = minutes + ":" + seconds;
      return time;
    }

    function formatMilliseconds(s) {
      function addZ(n) {
        return (n < 10 ? '0' : '') + n;
        //return n;
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      //var hrs = (s - mins) / 60;

      return addZ(mins) + ':' + addZ(secs) + '.' + ms;
    }

    return {
      formatSeconds: formatSeconds,
      formatMilliseconds: formatMilliseconds
    };

  }
);