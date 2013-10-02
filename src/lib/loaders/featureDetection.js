define(["Modernizr"],
  function(Modernizr) {
    
    function canRender() {
      if(Modernizr.canvas || Modernizr.webgl) {
        return true;
      } else {
        return false;
      }
    }

    function canStats() {
      return Modernizr.svg;
    }

    function canAudio() {
      if(Modernizr.audio.ogg || Modernizr.audio.mp3 || Modernizr.audio.m4a) {
        return true;
      } else {
        return false;
      }
    }

    function supported() {
      return canRender() && canStats() && canAudio();
    }

    function reportDetails() {
      return "\ncanRender: " + canRender() +
        "\ncanAudio:" + canAudio() +
        "\ncanStats: " + canStats();
    }

    function report() {
      if(supported() === true) {
        return "Environment is supported.";
      } else {
        return "Your browser-environment is NOT supported!\n\n" +
        "Sorry, your browser is too old.\n\n" +
        "Please update to the LATEST version of IE, Firefox, Chrome or Opera!\n";
      }
    }

    return {
      supported: supported,
      report: report,
      reportDetails: reportDetails
    };

  }
);