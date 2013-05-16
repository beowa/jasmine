function defineHtml(jasmine) {
  jasmine.HtmlReporter = requireHtmlReporter();
  jasmine.HtmlSpecFilter = requireHtmlSpecFilter();
  jasmine.QueryString = requireQueryString();
  jasmine.ResultsNote = requireResultsNode();
}