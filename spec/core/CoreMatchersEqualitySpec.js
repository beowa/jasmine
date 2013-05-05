describe("jasmine.coreMatchers", function() {
  describe("toEqual", function() {
    it("has the correct name", function() {
      var matcher = jasmine.coreMatchers.toEqual;

      expect(matcher.name).toEqual("toEqual");
    });

    it("passes for literals that are threequal", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(null, null);
      expect(result.pass).toBe(true);

      result = matcher.compare(void 0, void 0);
      expect(result.pass).toBe(true);
    });

    it("passes with a custom not failure message", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(1, 1);
      expect(result.message).toEqual("Expected 1 not to equal 1.");
    });

    it("fails for things that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare({a: "foo"}, 1);
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected { a : 'foo' } to equal 1.");
    });

    it("passes for Strings that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare("foo", "foo");
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected 'foo' not to equal 'foo'.");
    });

    it("fails for Strings that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare("foo", "bar");
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected 'foo' to equal 'bar'.");
    });

    it("passes for Numbers that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(123, 123);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected 123 not to equal 123.");
    });

    it("fails for Numbers that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(123, 456);
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected 123 to equal 456.");
    });

    it("passes for Dates that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(new Date("Jan 1, 1970"), new Date("Jan 1, 1970"));
      expect(result.pass).toBe(true);
      expect(result.message).toMatch(/Expected Date/);
      expect(result.message).toMatch(/not to equal/);
    });

    it("fails for Dates that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(new Date("Jan 1, 1970"), new Date("Feb 3, 1991"));
      expect(result.pass).toBe(false);
      expect(result.message).toMatch(/Expected Date/);
      expect(result.message).toMatch(/to equal/);
      expect(result.message).not.toMatch(/not to equal/);
    });

    it("passes for Booleans that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(true, true);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected true not to equal true.");
    });

    it("fails for Booleans that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(true, false);
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected true to equal false.");
    });

    it("passes for RegExps that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(/foo/, /foo/);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected /foo/ not to equal /foo/.");
    });

    it("fails for RegExps that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare(/foo/, /bar/);
      expect(result.pass).toBe(false);

      result = matcher.compare(new RegExp("foo", "i"), new RegExp("foo"));
      expect(result.pass).toBe(false);

      expect(result.message).toEqual("Expected /foo/i to equal /foo/.");
    });

    it("passes for Arrays that are equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare([1,2], [1,2]);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected [ 1, 2 ] not to equal [ 1, 2 ].");
    });

    it("fails for Arrays that are not equivalent", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare([1,2], [1,2,3]);
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected [ 1, 2 ] to equal [ 1, 2, 3 ].");
    });

    it("passes for Objects that are equivalent (simple case)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare({a: "foo"}, {a: "foo"});
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected { a : 'foo' } not to equal { a : 'foo' }.");
    });

    it("fails for Objects that are not equivalent (simple case)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare({a: "foo"}, {a: "bar"});
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected { a : 'foo' } to equal { a : 'bar' }.");
    });

    it("passes for Objects that are equivalent (deep case)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare({a: "foo", b: { c: "bar"}}, {a: "foo", b: { c: "bar"}});
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected { a : 'foo', b : { c : 'bar' } } not to equal { a : 'foo', b : { c : 'bar' } }.");
    });

    it("fails for Objects that are not equivalent (deep case)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      result = matcher.compare({a: "foo", b: { c: "baz"}}, {a: "foo", b: { c: "bar"}});
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected { a : 'foo', b : { c : 'baz' } } to equal { a : 'foo', b : { c : 'bar' } }.");
    });

    it("passes for Objects that are equivalent (with cycles)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      var actual = { a: "foo" },
        expected = { a: "foo" };

      actual.b = actual;
      expected.b = actual;

      result = matcher.compare(actual, expected);
      expect(result.pass).toBe(true);
      expect(result.message).toEqual("Expected { a : 'foo', b : <circular reference: Object> } not to equal { a : 'foo', b : { a : 'foo', b : <circular reference: Object> } }.");
    });

    it("fails for Objects that are not equivalent (with cycles)", function() {
      var matcher = jasmine.coreMatchers.toEqual,
        result;

      var actual = { a: "foo" },
        expected = { a: "bar" };

      actual.b = actual;
      expected.b = actual;

      result = matcher.compare(actual, expected);
      expect(result.pass).toBe(false);
      expect(result.message).toEqual("Expected { a : 'foo', b : <circular reference: Object> } to equal { a : 'bar', b : { a : 'foo', b : <circular reference: Object> } }.");
    });
  });
});