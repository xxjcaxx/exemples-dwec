(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    var colours = ["red", "green", "blue"];
    document.getElementById("header").addEventListener("click", function () {
      // this és una referència al clicat
      var that = this;
      colours.forEach((element, index) => {
        console.log(this, that, index, element);
        // this és undefined
        // that és el que s'ha clicat
      });
    });
  });
})();
