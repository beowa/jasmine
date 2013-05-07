jasmine.Expectation = function(options) {
  var matchers = options.matchers,
    util = options.util,
    actual = options.actual,
    spec = options.spec,
    isNot = options.isNot;

  this.not = {};

  for (var matcherName in matchers) {
    var matcher = matchers[matcherName];
    this[matcherName] = wrapCompare(matcherName, matcher.compare);
    this.not[matcherName] = wrapCompare(matcherName, matcher.compare);
  }

  return this;

  function wrapCompare(name, compare) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0),
        expected = args.slice(0),
        message = "";

      args.unshift(actual);

      var result = compare.apply(null, args);

      if (isNot) {
        result.pass = !result.pass;
      }

      if (!result.pass) {
        if (!result.message) {
          args.unshift(isNot);
          args.unshift(name);
          message = util.buildFailureMessage.apply(null, args);
        } else {
          message = result.message;
        }
      }

      if (expected.length == 1) {
        expected = expected[0];
      }

      // TODO: how many of these params are needed?
      spec.addExpectationResult(
        result.pass,
        {
          matcherName: name,
          passed: result.pass,
          message: message,
          actual: actual,
          expected: expected // this needs to be arrayified/sliced
        }
      );
    };
  }
};