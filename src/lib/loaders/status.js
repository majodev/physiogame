define([],
  function() {

    var MAX_LINES = 15,
      statusNode = document.getElementById("preloaderStatus"),
      lines = [];

    //(function startup() {
      //push old infos...
      //lines.push(statusNode.innerHTML);
    //}());

    function write(text) {
      var fullText = "",
        linesLength = lines.length + 1;
      
      lines.push(text.replace(/\n/g, "<br />") + "<br />");

      for (var i = 0; i < linesLength; i++) {

        if(linesLength >= MAX_LINES) {
          if(i > (linesLength-MAX_LINES)) {
            fullText = fullText + lines[i];
          }
        } else {
          fullText = fullText + lines[i];
        }

      }

      statusNode.innerHTML = fullText;
    }

    function touch() {
      statusNode.innerHTML = statusNode.innerHTML + ".";
      lines[lines.length-1] = lines[lines.length-1] + ".";
    }

    function clear() {
      statusNode.innerHTML = "";
    }

    return {
      write: write,
      clear: clear,
      touch: touch
    };
  }
);