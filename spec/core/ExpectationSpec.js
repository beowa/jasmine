describe("Expectation", function() {

  it("returns an object that exposes each matcher provided for postive and 'not' cases", function() {
    var matchers = {
        toFoo: {
          name: "toFoo"
        },
        toBar: {
          name: "toBar"
        }
      },
      expectation = new jasmine.Expectation({
        matchers: matchers
      });
    console.error(expectation);

    expect(expectation.toFoo).toBeDefined();
    expect(expectation.toBar).toBeDefined();
    expect(expectation.not).toBeDefined();
    expect(expectation.not.toFoo).toBeDefined();
    expect(expectation.not.toBar).toBeDefined();
  });

  it("wraps matchers's compare functions, passing the actual and expected", function() {
    var fakeCompare = jasmine.createSpy('fake-compare').andReturn({pass: true}),
      matchers = {
        toFoo: {
          name: "toFoo",
          compare: fakeCompare
        }
      },
      util = {
        buildFailureMessage: jasmine.createSpy('buildFailureMessage')
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      expectation = new jasmine.Expectation({
        matchers: matchers,
        util: util,
        actual: "an actual",
        spec: spec
      });

    expectation.toFoo("hello");
    expectation.not.toFoo("goodbye", "see", "you");

    expect(fakeCompare).toHaveBeenCalledWith("an actual", "hello");
    expect(fakeCompare).toHaveBeenCalledWith("an actual", "goodbye", "see", "you");
  });

  it("reports a passing result to the spec when the comparison passes", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() { return { pass: true }; }
        }
      },
      util = {
        buildFailureMessage: jasmine.createSpy('buildFailureMessage')
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      expectation = new jasmine.Expectation({
        matchers: matchers,
        util: util,
        actual: "an actual",
        spec: spec
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(true, {
      matcherName: "toFoo",
      passed: true,
      message: "",
      expected: "hello",
      actual: "an actual"
    });
  });

  it("reports a failing result to the spec when the comparison fails", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() { return { pass: false }; }
        }
      },
      util = {
        buildFailureMessage: function() { return ""; }
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      expectation = new jasmine.Expectation({
        matchers: matchers,
        util: util,
        actual: "an actual",
        spec: spec
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(false, {
      matcherName: "toFoo",
      passed: false,
      expected: "hello",
      actual: "an actual",
      message: jasmine.any(String)
    });
  });

  it("reports a failing result and a custom fail message to the spec when the comparison fails", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() {
            return {
              pass: false,
              message: "I am a custom message"
            };
          }
        }
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      expectation = new jasmine.Expectation({
        matchers: matchers,
        actual: "an actual",
        spec: spec
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(false, {
      matcherName: "toFoo",
      passed: false,
      expected: "hello",
      actual: "an actual",
      message: "I am a custom message"
    });
  });

  it("reports a passing result to the spec when the comparison fails for a .not expectation", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() { return { pass: false }; }
        }
      },
      util = {
        buildFailureMessage: function() { return ""; }
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      actual = "an actual",
      expectation = new jasmine.Expectation({
        matchers: matchers,
        actual: "an actual",
        spec: spec,
        isNot: true
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(true, {
      matcherName: "toFoo",
      passed: true,
      message: "",
      expected: "hello",
      actual: actual
    });
  });

  it("reports a failing result to the spec when the comparison passes for a .not expectation", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() { return { pass: true }; }
        }
      },
      util = {
        buildFailureMessage: function() { return "default messge"; }
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      actual = "an actual",
      expectation = new jasmine.Expectation({
        matchers: matchers,
        actual: "an actual",
        util: util,
        spec: spec,
        isNot: true
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(false, {
      matcherName: "toFoo",
      passed: false,
      expected: "hello",
      actual: actual,
      message: "default messge"
    });
  });

  it("reports a failing result and a custom fail message to the spec when the comparison passes for a .not expectation", function() {
    var matchers = {
        toFoo: {
          name: "toFoo",
          compare: function() {
            return {
              pass: true,
              message: "I am a custom message"
            };
          }
        }
      },
      spec = {
        addExpectationResult: jasmine.createSpy("addExpectationResult")
      },
      actual = "an actual",
      expectation = new jasmine.Expectation({
        matchers: matchers,
        actual: "an actual",
        spec: spec,
        isNot: true
      });

    expectation.toFoo("hello");

    expect(spec.addExpectationResult).toHaveBeenCalledWith(false, {
      matcherName: "toFoo",
      passed: false,
      expected: "hello",
      actual: actual,
      message: "I am a custom message"
    });
  });
});