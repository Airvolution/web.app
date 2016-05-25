/// <reference path="../../../typings/tsd.d.ts" />
import CompareViewDirective = require('./CompareViewDirective');
import CompareToolboxDirective = require('./CompareToolboxDirective');
import CompareToolDirective = require('./CompareToolDirective');

export = angular.module('directives.compare',[])
    .directive(CompareViewDirective.htmlName, CompareViewDirective.create)
    .directive(CompareToolboxDirective.htmlName, CompareToolboxDirective.create)
    .directive(CompareToolDirective.htmlName, CompareToolDirective.create);
