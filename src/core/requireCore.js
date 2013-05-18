var jasmineRequire = jasmineRequire || {};

jasmineRequire.core = function() {
  j$ = {};

  jasmineRequire.base(j$);
  j$.util = jasmineRequire.util();
  j$.Clock = jasmineRequire.Clock();
  j$.DelayedFunctionScheduler = jasmineRequire.DelayedFunctionScheduler();
  j$.Env = jasmineRequire.Env(j$);
  j$.ExceptionFormatter = jasmineRequire.ExceptionFormatter();
  j$.buildExpectationResult = jasmineRequire.buildExpectationResult();
  j$.JsApiReporter = jasmineRequire.JsApiReporter();
  j$.Matchers = jasmineRequire.Matchers(j$);
  j$.StringPrettyPrinter = jasmineRequire.StringPrettyPrinter(j$);
  j$.QueueRunner = jasmineRequire.QueueRunner();
  j$.ReportDispatcher = jasmineRequire.ReportDispatcher();
  j$.Spec = jasmineRequire.Spec();
  j$.Suite = jasmineRequire.Suite();
  j$.version = jasmineRequire.version();

  return j$;
};

if (typeof exports == "object") {
  exports.jasmineRequire = jasmineRequire;
}
