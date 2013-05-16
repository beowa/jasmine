// TODO: these should be require, and should return the object that they define
function requireCore() {
  var jasmine = {};

  requireBase(jasmine);
  jasmine.util = requireUtil();
  jasmine.Any = requireAny();
  jasmine.Clock = requireClock();
  jasmine.matchers = requireMatchers();
  jasmine.DelayedFunctionScheduler = requireDelayedFunctionScheduler();
  jasmine.Env = requireEnv(jasmine);
  jasmine.ExceptionFormatter = requireExceptionFormatter();
  jasmine.Expectation = requireExpectation();
  jasmine.buildExpectationResult = requireBuildExpectationResult();
  jasmine.JsApiReporter = requireJsApiReporter();
  jasmine.matchersUtil = requireMatchersUtil();
  jasmine.ObjectContaining = requireObjectContaining(jasmine);
  jasmine.StringPrettyPrinter = requirePrettyPrinter(jasmine);
  jasmine.QueueRunner = requireQueueRunner();
  jasmine.ReportDispatcher = requireReportDispatcher();
  jasmine.Spec = requireSpec();
  jasmine.Suite = requireSuite();

  return jasmine;
}