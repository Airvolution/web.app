///<reference path="../../../typings/tsd.d.ts"/>

import StationsModule = require("./Stations/module");
import UserModule = require('./User/module');
import ConfigViewDirective = require("./configViewDIrective");

export = angular.module('app.directives.config',[
    StationsModule.name,
    UserModule.name
])
    .directive(ConfigViewDirective.htmlName, ConfigViewDirective.create);
