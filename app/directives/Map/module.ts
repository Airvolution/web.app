/// <reference path="../../../typings/tsd.d.ts" />
import MapViewDirective = require('./mapViewDirective');
import MapDetailsDirective = require("./Details/mapDetailsDirective");

export = angular.module('directives.map',[])
    .directive(MapViewDirective.htmlName, MapViewDirective.create)
    .directive(MapDetailsDirective.htmlName, MapDetailsDirective.create);
