describe("Core Matchers", function() {
  describe("toBe", function() {
    it("passes when actual === expected", function() {
      var matcher = jasmine.matchers.toBe(),
        result;

      result = matcher.compare(1, 1);
      expect(result.pass).toBe(true);
    });

    it("fails when actual !== expected", function() {
      var matcher = jasmine.matchers.toBe(),
        result;

      result = matcher.compare(1, 2);
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeCloseTo", function() {
    it("passes when within two decimal places by default", function() {
      var matcher = jasmine.matchers.toBeCloseTo(),
        result;

      result = matcher.compare(0, 0);
      expect(result.pass).toBe(true);

      result = matcher.compare(0, 0.001);
      expect(result.pass).toBe(true);
    });

    it("fails when not within two decimal places by default", function() {
      var matcher = jasmine.matchers.toBeCloseTo(),
        result;

      result = matcher.compare(0, 0.01);
      expect(result.pass).toBe(false);
    });

    it("accepts an optional precision argument", function() {
      var matcher = jasmine.matchers.toBeCloseTo(),
        result;

      result = matcher.compare(0, 0.1, 0);
      expect(result.pass).toBe(true);

      result = matcher.compare(0, 0.0001, 3);
      expect(result.pass).toBe(true);
    });

    it("rounds expected values", function() {
      var matcher = jasmine.matchers.toBeCloseTo(),
        result;

      result = matcher.compare(1.23, 1.229);
      expect(result.pass).toBe(true);

      result = matcher.compare(1.23, 1.226);
      expect(result.pass).toBe(true);

      result = matcher.compare(1.23, 1.225);
      expect(result.pass).toBe(true);

      result = matcher.compare(1.23, 1.2249999);
      expect(result.pass).toBe(false);

      result = matcher.compare(1.23, 1.234);
      expect(result.pass).toBe(true);
    });
  });

  describe("toBeDefined", function() {
    it("matches for defined values", function() {
      var matcher = jasmine.matchers.toBeDefined(),
        result;


      result = matcher.compare('foo');
      expect(result.pass).toBe(true);
    });

    it("fails when matching undefined values", function() {
      var matcher = jasmine.matchers.toBeDefined(),
        result;

      result = matcher.compare(void 0);
      expect(result.pass).toBe(false);
    })
  });

  describe("toBeFalsy", function() {
    it("passes for 'falsy' values", function() {
      var matcher = jasmine.matchers.toBeFalsy(),
        result;

      result = matcher.compare(false);
      expect(result.pass).toBe(true);

      result = matcher.compare(0);
      expect(result.pass).toBe(true);

      result = matcher.compare('');
      expect(result.pass).toBe(true);

      result = matcher.compare(null);
      expect(result.pass).toBe(true);

      result = matcher.compare(void 0);
      expect(result.pass).toBe(true);
    });

    it("fails for 'truthy' values", function() {
      var matcher = jasmine.matchers.toBeFalsy(),
        result;

      result = matcher.compare(true);
      expect(result.pass).toBe(false);

      result = matcher.compare(1);
      expect(result.pass).toBe(false);

      result = matcher.compare("foo");
      expect(result.pass).toBe(false);

      result = matcher.compare({});
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeGreaterThan", function() {
    it("passes when actual > expected", function() {
      var matcher = jasmine.matchers.toBeGreaterThan(),
        result;

      result = matcher.compare(2, 1);
      expect(result.pass).toBe(true);
    });

    it("fails when actual <= expected", function() {
      var matcher = jasmine.matchers.toBeGreaterThan();

      result = matcher.compare(1, 1);
      expect(result.pass).toBe(false);

      result = matcher.compare(1, 2);
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeLessThan", function() {
    it("passes when actual < expected", function() {
      var matcher = jasmine.matchers.toBeLessThan(),
        result;

      result = matcher.compare(1, 2);
      expect(result.pass).toBe(true);
    });

    it("fails when actual <= expected", function() {
      var matcher = jasmine.matchers.toBeLessThan(),
        result;

      result = matcher.compare(1, 1);
      expect(result.pass).toBe(false);

      result = matcher.compare(2, 1);
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeNaN", function() {
    it("passes for NaN with a custom .not fail", function() {
      var matcher = jasmine.matchers.toBeNaN(),
        result;

      result = matcher.compare(Number.NaN);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected actual not to be NaN.");
    });

    it("fails for anything not a NaN", function() {
      var matcher = jasmine.matchers.toBeNaN();

      result = matcher.compare(1);
      expect(result.pass).toBe(false);

      result = matcher.compare(null);
      expect(result.pass).toBe(false);

      result = matcher.compare(void 0);
      expect(result.pass).toBe(false);

      result = matcher.compare('');
      expect(result.pass).toBe(false);

      result = matcher.compare(Number.POSITIVE_INFINITY);
      expect(result.pass).toBe(false);
    });

    it("has a custom message on failure", function() {
      var matcher = jasmine.matchers.toBeNaN(),
        result = matcher.compare(0);

      expect(result.message).toEqual("Expected 0 to be NaN.");
    });
  });

  describe("toBeNull", function() {
    it("passes for null", function() {
      var matcher = jasmine.matchers.toBeNull(),
        result;

      result = matcher.compare(null);
      expect(result.pass).toBe(true);
    });

    it("fails for non-null", function() {
      var matcher = jasmine.matchers.toBeNull(),
        result;

      result = matcher.compare('foo');
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeTruthy", function() {
    it("passes for 'truthy' values", function() {
      var matcher = jasmine.matchers.toBeTruthy(),
        result;

      result = matcher.compare(true);
      expect(result.pass).toBe(true);

      result = matcher.compare(1);
      expect(result.pass).toBe(true);

      result = matcher.compare("foo");
      expect(result.pass).toBe(true);

      result = matcher.compare({});
      expect(result.pass).toBe(true);
    });

    it("fails for 'falsy' values", function() {
      var matcher = jasmine.matchers.toBeTruthy(),
        result;

      result = matcher.compare(false);
      expect(result.pass).toBe(false);

      result = matcher.compare(0);
      expect(result.pass).toBe(false);

      result = matcher.compare('');
      expect(result.pass).toBe(false);

      result = matcher.compare(null);
      expect(result.pass).toBe(false);

      result = matcher.compare(void 0);
      expect(result.pass).toBe(false);
    });
  });

  describe("toBeUndefined", function() {
    it("passes for undefined values", function() {
      var matcher = jasmine.matchers.toBeUndefined(),
        result;

      result = matcher.compare(void 0);
      expect(result.pass).toBe(true);

    });

    it("fails when matching defined values", function() {
      var matcher = jasmine.matchers.toBeUndefined();

      result = matcher.compare('foo');
      expect(result.pass).toBe(false);
    })
  });

  describe("toContain", function() {
    it("passes when expected is a substring of actual", function() {
      var matcher = jasmine.matchers.toContain(),
        result;

      result = matcher.compare("ABC", "B");
      expect(result.pass).toBe(true);
    });

    it("fails when expected is a not substring of actual", function() {
      var matcher = jasmine.matchers.toContain(),
        result;

      result = matcher.compare("ABC", "X");
      expect(result.pass).toBe(false);
    });

    it("passes when expected is an element in an actual array", function() {
      var matcher = jasmine.matchers.toContain(),
        result;

      result = matcher.compare(['foo', 'bar'], 'foo');
      expect(result.pass).toBe(true);
    });

    it("fails when expected is not an element in an actual array", function() {
      var matcher = jasmine.matchers.toContain(),
        result;

      result = matcher.compare(['foo', 'bar'], 'baz');
      expect(result.pass).toBe(false);
    });

    it("passes with mixed-element arrays", function() {
      var matcher = jasmine.matchers.toContain(),
        result;

      result = matcher.compare(["foo", {some: "bar"}], "foo");
      expect(result.pass).toEqual(true);

      result = matcher.compare(["foo", {some: "bar"}], {some: "bar"});
      expect(result.pass).toEqual(true);
    });
  });

  describe("toHaveBeenCalled", function() {
    it("passes when the actual was called, with a custom .not fail message", function() {
      var matcher = jasmine.matchers.toHaveBeenCalled(),
        calledSpy = jasmine.createSpy('called-spy'),
        result;

      calledSpy();

      result = matcher.compare(calledSpy);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected spy called-spy not to have been called.");
    });

    it("fails when the actual was not called", function() {
      var matcher = jasmine.matchers.toHaveBeenCalled(),
        uncalledSpy = jasmine.createSpy('uncalled spy');

      result = matcher.compare(uncalledSpy);
      expect(result.pass).toBe(false);
    });

    it("throws an exception when the actual is not a spy", function() {
      var matcher = jasmine.matchers.toHaveBeenCalled(),
        fn = function() {};

      expect(function() { matcher.compare(fn) }).toThrow("Expected a spy, but got Function.");
    });

    it("throws an exception when invoked with any arguments", function() {
      var matcher = jasmine.matchers.toHaveBeenCalled(),
        spy = jasmine.createSpy('sample spy');

      expect(function() { matcher.compare(spy, 'foo') }).toThrow("toHaveBeenCalled does not take arguments, use toHaveBeenCalledWith");
    });

    it("has a custom message on failure", function() {
      var matcher = jasmine.matchers.toHaveBeenCalled(),
        spy = jasmine.createSpy('sample-spy'),
        result;

      result = matcher.compare(spy);

      expect(result.message).toEqual("Expected spy sample-spy to have been called.");
    });
  });

  describe("toHaveBeenCalledWith", function() {
    it("passes when the actual was called with matching parameters", function() {
      var matcher = jasmine.matchers.toHaveBeenCalledWith(),
        calledSpy = jasmine.createSpy('called-spy'),
        result;

      calledSpy('a', 'b');
      result = matcher.compare(calledSpy, 'a', 'b');

      expect(result.pass).toBe(true);
    });

    it("fails when the actual was not called", function() {
      var matcher = jasmine.matchers.toHaveBeenCalledWith(),
        uncalledSpy = jasmine.createSpy('uncalled spy'),
        result;

      result = matcher.compare(uncalledSpy);
      expect(result.pass).toBe(false);
    });

    it("fails when the actual was called with different parameters", function() {
      var matcher = jasmine.matchers.toHaveBeenCalledWith(),
        calledSpy = jasmine.createSpy('called spy'),
        result;

      calledSpy('a');
      result = matcher.compare(calledSpy, 'a', 'b');

      expect(result.pass).toBe(false);
    });

    it("throws an exception when the actual is not a spy", function() {
      var matcher = jasmine.matchers.toHaveBeenCalledWith(),
        fn = function() {};

      expect(function() { matcher.compare(fn) }).toThrow("Expected a spy, but got Function.");
    });

    it("has a custom message on failure", function() {
      var matcher = jasmine.matchers.toHaveBeenCalledWith(),
        spy = jasmine.createSpy('sample-spy'),
      messages = matcher.message(spy);

      expect(messages.affirmative).toEqual("Expected spy sample-spy to have been called.")
      expect(messages.negative).toEqual("Expected spy sample-spy not to have been called.")
    });
  });

  describe("toMatch", function() {
    it("passes when RegExps are equivalent", function() {
      var matcher = jasmine.matchers.toMatch(),
        result;

      result = matcher.compare(/foo/, /foo/);
      expect(result.pass).toBe(true);
    });

    it("fails when RegExps are not equivalent", function() {
      var matcher = jasmine.matchers.toMatch(),
        result;

      result = matcher.compare(/bar/, /foo/);
      expect(result.pass).toBe(false);
    });

    it("passes when the actual matches the expected string as a pattern", function() {
      var matcher = jasmine.matchers.toMatch(),
        result;

      result = matcher.compare('foosball', 'foo');
      expect(result.pass).toBe(true);
    });

    it("fails when the actual matches the expected string as a pattern", function() {
      var matcher = jasmine.matchers.toMatch(),
        result;

      result = matcher.compare('bar', 'foo');
      expect(result.pass).toBe(false);
    });
  });

  describe("toThrow", function() {
    it("throw an error when the acutal is not a function ", function() {
      var matcher = jasmine.matchers.toThrow();

      expect(function() {
        matcher.compare({});
      }).toThrow("Actual is not a Function");
    });

    it("throws an error when the expected can't be turned into an exception", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      expect(function() {
        matcher.compare(fn, 1);
      }).toThrow("Expected cannot be treated as an exception.");
    });

    it("passes if the actual throws any exception", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      result = matcher.compare(fn);

      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected function not to throw an exception.");
    });

    it("fails if the actual does not throw an exception", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          return 0;
        },
        result;

      result = matcher.compare(fn);

      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected function to throw an exception.");
    });

    it("passes if the actual throws an exception with the expected message", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      result = matcher.compare(fn, "foo");

      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected function not to throw an exception \"foo\".");
    });

    it("fails if the actual throws an exception with a different message", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      result = matcher.compare(fn, "bar");

      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected function to throw an exception \"bar\".");
    });

    it("passes if the actual throws an exception and matches the message of the expected exception", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      result = matcher.compare(fn, new Error("foo"));

      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected function not to throw an exception \"foo\".");
    });

    it("fails if the actual throws an exception and it does not match the message of the expected exception with a custom message", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "foo";
        },
        result;

      result = matcher.compare(fn, new Error("bar"));

      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected function to throw an exception \"bar\".");
    });

    it("passes if the actual throws an exception and the message matches the expected regular expression", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "a long message";
        },
        result;

      result = matcher.compare(fn, /long/);

      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected function not to throw an exception matching /long/.");
    });

    it("fails if the actual throws an exception and the message does not match the expected regular expression", function() {
      var matcher = jasmine.matchers.toThrow(),
        fn = function() {
          throw "a long message";
        },
        result;

      result = matcher.compare(fn, /short/);

      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected function to throw an exception matching /short/.");
    });
  });
});