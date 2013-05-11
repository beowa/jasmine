jasmine.matchers = {};

jasmine.matchers.toBe = function() {
  return {
    compare: function(actual, expected) {
      return {
        pass: actual === expected
      };
    }
  };
};

jasmine.matchers.toBeCloseTo = function() {
  return {
    compare: function(actual, expected, precision) {
      if (precision !== 0) {
        precision = precision || 2;
      }

      return {
        pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)
      };
    }
  };
};

jasmine.matchers.toBeDefined = function() {
  return {
    compare: function(actual) {
      return {
        pass: !(void 0 === actual)
      };
    }
  };
};

jasmine.matchers.toBeFalsy = function() {
  return {
    compare: function(actual) {
      return {
        pass: !!!actual
      };
    }
  };
};

jasmine.matchers.toBeGreaterThan = function() {
  return {
    compare: function(actual, expected) {
      return {
        pass: actual > expected
      };
    }
  };
};

jasmine.matchers.toBeLessThan = function() {
  return {

    compare: function(actual, expected) {
      return {
        pass: actual < expected
      };
    }
  };
};

jasmine.matchers.toBeNaN = function() {
  return {
    compare: function(actual) {
      var result = {
        pass: (actual !== actual)
      };

      if (result.pass) {
        result.message = "Expected actual not to be NaN."
      } else {
        result.message = "Expected " + jasmine.pp(actual) + " to be NaN."
      }

      return result;
    }
  };
};

jasmine.matchers.toBeNull = function() {
  return {
    compare: function(actual) {
      return {
        pass: actual === null
      };
    }
  };
};

jasmine.matchers.toBeTruthy = function() {
  return {
    compare: function(actual) {
      return {
        pass: !!actual
      };
    }
  };
};

jasmine.matchers.toBeUndefined = function() {
  return {
    compare: function(actual) {
      return {
        pass: void 0 === actual
      };
    }
  };
};

jasmine.matchers.toEqual = function(util) {
  var customEqualityTesters = [];

  return {
    compare: function(actual, expected) {
      var result = {
        pass: false,
//        message: {}
      };

      result.pass = util.equals(actual, expected, customEqualityTesters);

      // TODO: this might be fine with the default message
//      result.message = result.pass ?
//        "Expected " + jasmine.pp(actual) + " not to equal " + jasmine.pp(expected) + "." :
//        "Expected " + jasmine.pp(actual) + " to equal " + jasmine.pp(expected) + ".";

      return result;
    },
    addTester: function(tester) {
      customEqualityTesters.push(tester);
    }
  };
};

jasmine.matchers.toHaveBeenCalled = function() {
  return {
    compare: function(actual) {
      var result = {};

      if (!jasmine.isSpy(actual)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
      }

      if (arguments.length > 1) {
        throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
      }

      result.pass = actual.wasCalled;

      result.message = result.pass ?
        "Expected spy " + actual.identity + " not to have been called." :
        "Expected spy " + actual.identity + " to have been called.";

      return result;
    }
  };
};

jasmine.matchers.toHaveBeenCalledWith = function(util) {
  return {
    compare: function() {
      var args = Array.prototype.slice.call(arguments, 0),
        actual = args[0],
        expectedArgs = args.slice(1);

      if (!jasmine.isSpy(actual)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
      }

      return {
        pass: util.contains(actual.argsForCall, expectedArgs)
      };
    },
    message: function(actual) {
      return {
        affirmative: "Expected spy " + actual.identity + " to have been called.",
        negative: "Expected spy " + actual.identity + " not to have been called."
      };
    }
  };
};

jasmine.matchers.toMatch = function() {
  return {
    compare: function(actual, expected) {
      var regexp = new RegExp(expected);

      return {
        pass: regexp.test(actual)
      };
    }
  };
};

jasmine.matchers.toThrow = function() {
  return {
    compare: function(actual, expected) {
      var result = { pass: false },
        exception;

      if (typeof actual != "function") {
        throw new Error("Actual is not a Function");
      }

      if (expectedCannotBeTreatedAsException()) {
        throw new Error("Expected cannot be treated as an exception.");
      }

      try {
        actual();
      } catch (e) {
        exception = new Error(e);
      }

      if (!exception) {
        result.message = "Expected function to throw an exception.";
        return result;
      }

      if (void 0 == expected) {
        result.pass = true;
        result.message = "Expected function not to throw an exception.";
      } else if (exception.message == expected) {
        result.pass = true;
        result.message = "Expected function not to throw an exception \"" + expected + "\".";
      } else if (exception.message == expected.message) {
        result.pass = true;
        result.message = "Expected function not to throw an exception \"" + expected.message + "\".";
      } else if (expected instanceof RegExp) {
        if (expected.test(exception.message)) {
          result.pass = true;
          result.message = "Expected function not to throw an exception matching " + expected + ".";
        } else {
          result.pass = false;
          result.message = "Expected function to throw an exception matching " + expected + ".";
        }
      } else {
        result.pass = false;
        result.message = "Expected function to throw an exception \"" + (expected.message || expected) + "\"."
      }

      return result;

      function expectedCannotBeTreatedAsException() {
        return !(
          (void 0 == expected) ||
            (expected instanceof Error) ||
            (typeof expected == "string") ||
            (expected instanceof RegExp)
          );
      }
    }
  };
};

jasmine.matchers.toContain = function(util) {
  return {
    compare: function(actual, expected) {

      return {
        pass: util.contains(actual, expected)
      };
    }
  };
};
