jasmine.matchers = {};
jasmine.matchers.equals = function(a, b, customTesters) {

  return eq(a, b, [], [], customTesters);

  // Equality function lovingly adapted from isEqual in [Underscore](http://underscorejs.org)
  function eq(a, b, aStack, bStack, customTesters) {
    var result = true;

    for (var i = 0; i < customTesters.length; i++) {
      result = customTesters[i](a, b);
      if (result) {
        return true;
      }
    }

    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    var className = Object.prototype.toString.call(a);
    if (className != Object.prototype.toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
          a.global == b.global &&
          a.multiline == b.multiline &&
          a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack, customTesters))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction(aCtor) && (aCtor instanceof aCtor) &&
        isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = has(b, key) && eq(a[key], b[key], aStack, bStack, customTesters))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();

    return result;

    function has(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function isFunction(obj) {
      return typeof obj === 'function';
    }
  }
};

jasmine.matchers.contains = function(haystack, needle) {
  if (Object.prototype.toString.apply(haystack) === "[object Array]") {
    for (var i = 0; i < haystack.length; i++) {
      if (jasmine.matchers.equals(haystack[i], needle, [])) {
        return true;
      }
    }
    return false;
  }
  return haystack.indexOf(needle) >= 0;
};

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
        pass: !jasmine.util.isUndefined(actual)
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

jasmine.matchers.toEqual = function() {
  var customEqualityTesters = [];

  return {
    compare: function(actual, expected) {
      var result = {
        pass: false,
        message: {}
      };

      result.pass = jasmine.matchers.equals(actual, expected, customEqualityTesters);

      // TODO: this might be fine with the default message
      result.message = result.pass ?
        "Expected " + jasmine.pp(actual) + " not to equal " + jasmine.pp(expected) + "." :
        "Expected " + jasmine.pp(actual) + " to equal " + jasmine.pp(expected) + ".";

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

jasmine.matchers.toHaveBeenCalledWith = function() {
  return {
    compare: function() {
      var args = Array.prototype.slice.call(arguments, 0),
        actual = args[0],
        expectedArgs = args.slice(1);

      if (!jasmine.isSpy(actual)) {
        throw new Error('Expected a spy, but got ' + jasmine.pp(actual) + '.');
      }

      return {
        pass: jasmine.matchers.contains(actual.argsForCall, expectedArgs)
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

jasmine.matchers.toContain = function() {
  return {
    compare: function(actual, expected) {

      return {
        pass: jasmine.matchers.contains(actual, expected)
      };
    }
  };
};
