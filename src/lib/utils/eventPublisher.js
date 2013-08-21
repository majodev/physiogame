define([],
  function() {
    return function(allowedEventTypes) {

      var eventTypes = [];

      // check if its a true array
      if (Object.prototype.toString.apply(allowedEventTypes) === "[object Array]") {
        eventTypes = allowedEventTypes;
      } else {
        throw new Error("EventType argument isn't an array.");
      }

      function checkEventTypeValid(type) {
        var typeCount = 0,
          length = eventTypes.length;

        for (typeCount; typeCount < length; typeCount += 1) {
          if (type === eventTypes[typeCount]) {
            return true;
          }
        }

        return false;
      }

      return {
        subscribers: {
          any: []
        },
        on: function(type, fn, context) {
          type = type || "any";

          if (type) {
            if (checkEventTypeValid(type)) {
              type = type;
            } else {
              throw new Error("Encountered unexpected eventtype: " + type +
                ". Needs predefinition in publisher object.");
            }
          } else {
            type = "any";
          }

          fn = typeof fn === "function" ? fn : context[fn];

          if (typeof this.subscribers[type] === "undefined") {
            this.subscribers[type] = [];
          }
          this.subscribers[type].push({
            fn: fn,
            context: context || this
          });
        },
        remove: function(type, fn, context) {
          this.visitSubscribers('unsubscribe', type, fn, context);
        },
        fire: function(type, publication) {
          this.visitSubscribers('publish', type, publication);
        },
        visitSubscribers: function(action, type, arg, context) {
          var pubtype = type || "any",
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers ? subscribers.length : 0,
            targetContext = context ? context : this;

          for (i = 0; i < max; i += 1) {
            if (action === "publish") {
              subscribers[i].fn.call(subscribers[i].targetContext, arg);
            } else {
              if (subscribers[i].fn === arg &&
                subscribers[i].context === targetContext) {

                subscribers.splice(i, 1);
              }
            }
          }
        }
      };
    };
  }
);