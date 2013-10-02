define([],
  function() {

    var MAX_LINES = 15,
      statusNode = document.getElementById("preloaderStatus"),
      lines = [];

    lines.push(statusNode.innerHTML);

    function write(text) {
      var fullText = "",
        linesLength = lines.length + 1;
      
      lines.push(text.replace(/\n/g, "<br />") + "<br />");

      for (var i = 0; i < linesLength; i++) {

        if(i > (linesLength-MAX_LINES)) {
          fullText = fullText + lines[i];
        }
      }

      statusNode.innerHTML = fullText;
    }

    function clear() {
      statusNode.innerHTML = "";
    }

    return {
      write: write,
      clear: clear
    };
  }
);