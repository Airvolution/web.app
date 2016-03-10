/// <reference path="../../../typings/tsd.d.ts"/>

import FAQSearchResultsDirective = require("./FAQSearchResultsDirective");

export = angular.module('directives.search',[])
    .directive(FAQSearchResultsDirective.htmlName, FAQSearchResultsDirective.create);
    
