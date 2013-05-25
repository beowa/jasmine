describe("Any", function() {
  it("matches a string", function() {
    var any = new j$.Matchers.Any(String);

    expect(any.jasmineMatches("foo")).toBe(true);
  });

  it("matches a number", function() {
    var any = new j$.Matchers.Any(Number);

    expect(any.jasmineMatches(1)).toBe(true);
  });

  it("matches a function", function() {
    var any = new j$.Matchers.Any(Function);

    expect(any.jasmineMatches(function(){})).toBe(true);
  });

  it("matches an Object", function() {
    var any = new j$.Matchers.Any(Object);

    expect(any.jasmineMatches({})).toBe(true);
  });

  it("matches another constructed object", function() {
    var Thing = function() {},
      any = new j$.Matchers.Any(Thing);

    expect(any.jasmineMatches(new Thing())).toBe(true);
  });

  it("jasmineToString's itself", function() {
    var any = new j$.Matchers.Any(Number);

    expect(any.jasmineToString()).toMatch('<jasmine.any');
  });

});