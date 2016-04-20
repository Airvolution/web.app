/// <reference path="../../../../typings/tsd.d.ts" />

import GroupDirective = require("./groupDirective");
import MyGroupsDirective = require("./myGroupsDirective");
import EditGroupDirective = require('./editGroupDirective');

export = angular.module('app.directives.config.groups',[])
    .directive(GroupDirective.htmlName, GroupDirective.create)
    .directive(MyGroupsDirective.htmlName, MyGroupsDirective.create)
    .directive(EditGroupDirective.htmlName, EditGroupDirective.create);
