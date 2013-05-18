var jasmineRequire = jasmineRequire || {};

jasmineRequire.console = function(j$) {
  j$.ConsoleReporter = jasmineRequire.ConsoleReporter();
};

if (typeof exports == "object") {
  exports.jasmineRequire = jasmineRequire;
}
