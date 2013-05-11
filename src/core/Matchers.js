jasmine.Matchers = function(env, actual, spec, opt_isNot) {
  //TODO: true dependency: equals, contains
  this.env = env;
  this.actual = actual;
  this.spec = spec;
  this.isNot = opt_isNot || false;
};

jasmine.Matchers.Any = function(expectedClass) {
  this.expectedClass = expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineMatches = function(other) {
  if (this.expectedClass == String) {
    return typeof other == 'string' || other instanceof String;
  }

  if (this.expectedClass == Number) {
    return typeof other == 'number' || other instanceof Number;
  }

  if (this.expectedClass == Function) {
    return typeof other == 'function' || other instanceof Function;
  }

  if (this.expectedClass == Object) {
    return typeof other == 'object';
  }

  return other instanceof this.expectedClass;
};

jasmine.Matchers.Any.prototype.jasmineToString = function() {
  return '<jasmine.any(' + this.expectedClass + ')>';
};

jasmine.Matchers.ObjectContaining = function(sample) {
  this.sample = sample;
};

jasmine.Matchers.ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
  mismatchKeys = mismatchKeys || [];
  mismatchValues = mismatchValues || [];

  var env = jasmine.getEnv();

  var hasKey = function(obj, keyName) {
    return obj !== null && !jasmine.util.isUndefined(obj[keyName]);
  };

  for (var property in this.sample) {
    if (!hasKey(other, property) && hasKey(this.sample, property)) {
      mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
    }
    else if (!env.equals_(this.sample[property], other[property], mismatchKeys, mismatchValues)) {
      mismatchValues.push("'" + property + "' was '" + (other[property] ? jasmine.util.htmlEscape(other[property].toString()) : other[property]) + "' in expected, but was '" + (this.sample[property] ? jasmine.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in actual.");
    }
  }

  return (mismatchKeys.length === 0 && mismatchValues.length === 0);
};

jasmine.Matchers.ObjectContaining.prototype.jasmineToString = function() {
  return "<jasmine.objectContaining(" + jasmine.pp(this.sample) + ")>";
};
