/// <reference path="../../../typings/tsd.d.ts"/>

import FAQSearchResultsDirective = require("./FAQSearchResultsDirective");
import UpdateOnEnterDirective = require("./UpdateOnEnterDirective");
import MapSearchDirective = require("./mapSearchDirective");

export = angular.module('directives.search',[])
    .directive(FAQSearchResultsDirective.htmlName, FAQSearchResultsDirective.create)
    .directive(UpdateOnEnterDirective.htmlName, UpdateOnEnterDirective.create)
    .directive(MapSearchDirective.htmlName, MapSearchDirective.create);
    
