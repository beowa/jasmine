function requireHtml(jasmine) {
  jasmine.HtmlReporter = requireHtmlReporter(jasmine);
  jasmine.HtmlSpecFilter = requireHtmlSpecFilter();
  jasmine.QueryString = requireQueryString();
  jasmine.ResultsNode = requireResultsNode();
}