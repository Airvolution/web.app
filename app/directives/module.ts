///<reference path="../../typings/tsd.d.ts" />
import angular = require('angular');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');
import HeatMapDirective = require('./HeatMap/HeatMapDirective');

export = angular.module('directives',[])
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create)
            .directive(HeatMapDirective.htmlName, HeatMapDirective.create);
