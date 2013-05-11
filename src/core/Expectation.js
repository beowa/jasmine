jasmine.Expectation = function(options) {
  this.util = options.util;
  this.actual = options.actual;
  this.addExpectationResult = options.addExpectationResult;
  this.isNot = options.isNot;
};

jasmine.Expectation.prototype.wrapCompare = function(name, matcherFactory) {
  return function() {
    var args = Array.prototype.slice.call(arguments, 0),
      expected = args.slice(0),
      message = "";

    args.unshift(this.actual);

    var result = matcherFactory().compare.apply(null, args);

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
        expected: expected // this needs to be arrayified/sliced
      }
    );
  };
};

jasmine.Expectation.addMatchers = function(matchers) {
  var expecatationPrototype = jasmine.Expectation.prototype;
  for (var matcherName in matchers) {
    var matcher = matchers[matcherName];
    expecatationPrototype[matcherName] = expecatationPrototype.wrapCompare(matcherName, matcher);
  }
};

jasmine.Expectation.Factory = function(options) {
  options = options || {};
  var expect = new jasmine.Expectation(options);

  // TOD
  options.isNot = true;
  expect.not = new jasmine.Expectation(options);

  return expect;
};