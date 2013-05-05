jasmine.coreMatchers = (function() {
  return {
    toBe: {
      name: "toBe",
      compare: function(actual, expected) {
        return {
          pass: actual === expected
        };
      }
    },

    toBeCloseTo: {
      name: "toBeCloseTo",
      compare: function(actual, expected, precision) {
        if (precision !== 0) {
          precision = precision || 2;
        }

        return {
          pass: Math.abs(expected - actual) < (Math.pow(10, -precision) / 2)
        };
      }
    },

    toBeDefined: {
      name: "toBeDefined",
      compare: function(actual) {
        return {
          pass: !jasmine.util.isUndefined(actual)
        };
      }
    },

    toBeFalsy: {
      name: "toBeFalsy",
      compare: function(actual) {
        return {
          pass: !!!actual
        };
      }
    },

    toBeGreaterThan: {
      name: "toBeGreaterThan",
      compare: function(actual, expected) {
        return {
          pass: actual > expected
        };
      }
    },

    toBeLessThan: {
      name: "toBeLessThan",
      compare: function(actual, expected) {
        return {
          pass: actual < expected
        };
      }
    },

    toBeNaN: {
      name: "toBeNaN",
      compare: function(actual) {
        return {
          pass: (actual !== actual),
          message: {
            fail: "Expected " + jasmine.pp(actual) + " to be NaN.",
            notFail: "Expected actual not to be NaN."
          }
        };
      }
    },

    toBeNull: {
      name: "toBeNull",
      compare: function(actual) {
        return {
          pass: actual === null
        };
      }
    },

    toBeTruthy: {
      name: "toBeTruthy",
      compare: function(actual) {
        return {
          pass: !!actual
        };
      }
    },

    toBeUndefined: {
      name: "toBeUndefined",
      compare: function(actual) {
        return {
          pass: void 0 === actual
        };
      }
    },

    toContain: {
      name: "toContain",
      compare: function(actual, expected) {
        return {
          pass: true
        }
      }
    },

    toHaveBeenCalled: {
      name: "toHaveBeenCalled",
      compare: function(actual) {
        if (!jasmine.isSpy(actual)) {
          throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
        }

        if (arguments.length > 1) {
          throw new Error('toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith');
        }

        return {
          pass: actual.wasCalled,
          message: {
            fail: "Expected spy " + actual.identity + " to have been called.",
            notFail: "Expected spy " + actual.identity + " not to have been called."
          }
        };
      }
    },

    toHaveBeenCalledWith: {
      name: "toHaveBeenCalledWith",
      compare: function() {
        var args = Array.prototype.slice.call(arguments, 0),
          actual = args[0],
          expectedArgs = args.slice[1],
          result;

        if (!jasmine.isSpy(actual)) {
          throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
        }

        result = {
          pass: actual.wasCalled
        };

        return result;
      },
      message: function(actual) {
        return {
          affirmative: "Expected spy " + actual.identity + " to have been called.",
          negative: "Expected spy " + actual.identity + " not to have been called."
        };
      }
    },

    toMatch: {
      name: "toMatch",
      compare: function(actual, expected) {
        var regexp = new RegExp(expected);

        return {
          pass: regexp.test(actual)
        };
      }
    },

    toThrow: {
      name: "toThrow",
      compare: function(actual, expected) {
        var result = {
            pass: false,
            message: {}
          },
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
          result.message.fail = "Expected function to throw an exception.";
          return result;
        }

        if (void 0 == expected) {
          result.pass = true;
          result.message.notFail = "Expected function not to throw an exception.";
        } else if (exception.message == expected) {
          result.pass = true;
          result.message.notFail = "Expected function not to throw an exception \"" + expected + "\".";
        } else if (exception.message == expected.message) {
          result.pass = true;
          result.message.notFail = "Expected function not to throw an exception \"" + expected.message + "\".";
        } else if (expected instanceof RegExp) {
          if (expected.test(exception.message)) {
            result.pass = true;
            result.message.notFail = "Expected function not to throw an exception matching " + expected + ".";
          } else {
            result.pass = false;
            result.message.fail = "Expected function to throw an exception matching " + expected + ".";
          }
        } else {
          result.pass = false;
          result.message.fail = "Expected function to throw an exception \"" + (expected.message || expected) + "\"."
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
    }
  }
}());
