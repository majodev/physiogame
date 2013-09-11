define(["underscore"],
  function(_) {

    var GameObject = function(displayObject) {

      this.capabilities = [];
      this.behaviours = [];
      this.displayObject = displayObject;

    };

    GameObject.prototype.needsCapability = function(capability) {
      var i = 0,
        len = this.capabilities.length;
      
      // check if new capability...
      for (i; i < len; i += 1) {
        if (typeof this.capabilities[i] === capability) {
          return; // don't add capability as it was already extended!
        }
      }

      // new one, add to list and extend this with capability
      this.capabilities.push(capability);

      // copy properties into gameObject
      _.extend(this, capability);

    };

    GameObject.prototype.addBehaviour = function(behaviour) {
      this.behaviours.push(behaviour);

      // initialize the behaviour (will call needsCapabilities automatically!)
      behaviour.init(this);
    };

    GameObject.prototype.update = function() {
      var i = 0,
        len = this.behaviours.length;
      for (i; i < len; i += 1) {
        this.behaviours[i].update(this);
      }
    };

    return GameObject;
  }
);