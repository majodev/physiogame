define([],
  function() {

    // method to apply PARASITIC COMBINATION INHERITANCE pattern
    // http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/#more-1118
    function inheritPrototype (childObject, parentObject) {
      var copyOfParent = Object.create(parentObject.prototype);
      copyOfParent.constructor = childObject;
      childObject.prototype = copyOfParent;
    }

    return inheritPrototype;

  }
);