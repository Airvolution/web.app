///<reference path="../../typings/tsd.d.ts" />
import angular = require('angular');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');

export = angular.module('directives',[])
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create);
