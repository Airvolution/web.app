/// <reference path="../../../typings/tsd.d.ts" />
import AlmanacViewDirective = require('./AlmanacViewDirective');
import AlmanacWidgetDirective = require("./AlmanacWidgetDirective");

export = angular.module('directives.almanac',[])
    .directive(AlmanacViewDirective.htmlName, AlmanacViewDirective.create)
    .directive(AlmanacWidgetDirective.htmlName, AlmanacWidgetDirective.create);
