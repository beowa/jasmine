function requireExpectation() {

  function Expectation(options) {
    this.util = options.util;
    this.actual = options.actual;
    this.addExpectationResult = options.addExpectationResult || function(){};
    this.isNot = options.isNot;
  }

  Expectation.prototype.wrapCompare = function(name, matcherFactory) {
    return function() {
      var args = Array.prototype.slice.call(arguments, 0),
        expected = args.slice(0),
        message = "";

      args.unshift(this.actual);

      var result = matcherFactory(this.util).compare.apply(null, args);

      if (this.isNot) {
        result.pass = !result.pass;
      }

      if (!result.pass) {
        if (!result.message) {
          args.unshift(this.isNot);
          args.unshift(name);
          message = this.util.buildFailureMessage.apply(null, args);
        } else {
          message = result.message;
        }
      }

      if (expected.length == 1) {
        expected = expected[0];
      }

      // TODO: how many of these params are needed?
      this.addExpectationResult(
        result.pass,
        {
          matcherName: name,
          passed: result.pass,
          message: message,
          actual: this.actual,
          expected: expected // TODO: this may need to be arrayified/sliced
        }
      );
    };
  };

  Expectation.addMatchers = function(matchers) {
    var prototype = Expectation.prototype;
    for (var matcherName in matchers) {
      var matcher = matchers[matcherName];
      prototype[matcherName] = prototype.wrapCompare(matcherName, matcher);
    }
  };

  Expectation.Factory = function(options) {
    options = options || {};

    var expect = new j$.Expectation(options);

    // TODO: this would be nice as its own Object - NegativeExpectation
    options.isNot = true;
    expect.not = new j$.Expectation(options);

    return expect;
  };

  return Expectation;
}