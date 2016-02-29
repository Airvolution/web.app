/// <reference path="../../../typings/tsd.d.ts" />
import ToolboxDirective = require('./ToolboxDirective');
import ToolDirective = require("./ToolDirective");
export = angular.module('directives.toolbox',[])
    .directive(ToolboxDirective.htmlName, ToolboxDirective.create)
    .directive(ToolDirective.htmlName, ToolDirective.create);
