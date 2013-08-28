define([],
  function() {
    return function zeroPad(num, size) {
      var s = num + "";
      while (s.length < size) {
        s = "0" + s;
      }
      return s;
    };
  }
);