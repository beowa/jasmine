// TODO: these should be require, and should return the object that they define
function requireCore() {
  var jasmineCore = {};

  requireBase(jasmineCore);
  jasmineCore.util = requireUtil();
  jasmineCore.Any = requireAny();
  jasmineCore.Clock = requireClock();
  jasmineCore.matchers = requireMatchers();
  jasmineCore.DelayedFunctionScheduler = requireDelayedFunctionScheduler();
  jasmineCore.Expectation = requireExpectation();
  jasmineCore.ExceptionFormatter = requireExceptionFormatter();
  jasmineCore.buildExpectationResult = requireBuildExpectationResult();
  jasmineCore.JsApiReporter = requireJsApiReporter();
  jasmineCore.matchersUtil = requireMatchersUtil(jasmineCore);
  jasmineCore.ObjectContaining = requireObjectContaining(jasmineCore);
  jasmineCore.StringPrettyPrinter = requirePrettyPrinter(jasmineCore);
  jasmineCore.QueueRunner = requireQueueRunner();
  jasmineCore.ReportDispatcher = requireReportDispatcher();
  jasmineCore.Spec = requireSpec();
  jasmineCore.Suite = requireSuite();
  jasmineCore.Env = requireEnv(jasmineCore);

  return jasmineCore;
}
