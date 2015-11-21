///<reference path="../typings/tsd.d.ts" />

import angular = require("angular");
import SiteNavDirective = require('./directives/SiteNavDirective');

export = angular.module('app',[])
    .directive(SiteNavDirective.name, SiteNavDirective.create());