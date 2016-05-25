///<reference path="../../../typings/tsd.d.ts"/>

import StationsModule = require("./Stations/module");
import UserModule = require('./User/module');
import ConfigViewDirective = require("./configViewDirective");
import GroupsModule = require('./Groups/module');

export = angular.module('app.directives.config',[
    StationsModule.name,
    UserModule.name,
    GroupsModule.name
])
    .directive(ConfigViewDirective.htmlName, ConfigViewDirective.create);
