/// <reference path="../../../typings/tsd.d.ts"/>

import FAQSearchResultsDirective = require("./FAQSearchResultsDirective");
import UpdateOnEnterDirective = require("./UpdateOnEnterDirective");

export = angular.module('directives.search',[])
    .directive(FAQSearchResultsDirective.htmlName, FAQSearchResultsDirective.create)
    .directive(UpdateOnEnterDirective.htmlName, UpdateOnEnterDirective.create);
    
