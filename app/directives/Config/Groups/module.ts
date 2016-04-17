/// <reference path="../../../../typings/tsd.d.ts" />

import GroupDirective = require("./groupDirective");
import MyGroupsDirective = require("./myGroupsDirective");
export = angular.module('app.directives.config.groups',[])
    .directive(GroupDirective.htmlName, GroupDirective.create)
    .directive(MyGroupsDirective.htmlName, MyGroupsDirective.create);