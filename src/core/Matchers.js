getJasmineRequireObj().Matchers = function(j$) {
  var Matchers = {};

  Matchers.Any = function(expectedClass) {
    this.expectedClass = expectedClass;
  };

  Matchers.Any.prototype.jasmineMatches = function(other) {
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

  Matchers.Any.prototype.jasmineToString = function() {
    return '<jasmine.any(' + this.expectedClass + ')>';
  };

  Matchers.ObjectContaining = function(sample) {
    this.sample = sample;
  };

  Matchers.ObjectContaining.prototype.jasmineMatches = function(other, mismatchKeys, mismatchValues) {
    mismatchKeys = mismatchKeys || [];
    mismatchValues = mismatchValues || [];

    var env = j$.getEnv();

    var hasKey = function(obj, keyName) {
      return obj !== null && !j$.util.isUndefined(obj[keyName]);
    };

    for (var property in this.sample) {
      if (!hasKey(other, property) && hasKey(this.sample, property)) {
        mismatchKeys.push("expected has key '" + property + "', but missing from actual.");
      }
      else if (!env.equals_(this.sample[property], other[property], mismatchKeys, mismatchValues)) {
        mismatchValues.push("'" + property + "' was '" + (other[property] ? j$.util.htmlEscape(other[property].toString()) : other[property]) + "' in expected, but was '" + (this.sample[property] ? j$.util.htmlEscape(this.sample[property].toString()) : this.sample[property]) + "' in actual.");
      }
    }

    return (mismatchKeys.length === 0 && mismatchValues.length === 0);
  };

  Matchers.ObjectContaining.prototype.jasmineToString = function() {
    return "<jasmine.objectContaining(" + j$.pp(this.sample) + ")>";
  };

  return Matchers;

};
