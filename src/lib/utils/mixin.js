define([],
  function() {
    return function mixin() {
      var arg,
        prop,
        child = {};

      // loop through arguments and copy properties to empty child object
      for (arg = 0; arg < arguments.length; arg += 1) {
        for (prop in arguments[arg]) {
          if (arguments[arg].hasOwnProperty(prop)) {
            child[prop] = arguments[arg][prop];
          }
        }
      }

      return child;
    };
  }
);