/// <reference path="../../../typings/tsd.d.ts" />
import MapViewDirective = require('./MapViewDirective');
import MapDetailsDirective = require("./mapDetailsDirective");
import MapToolboxDirective = require('./MapToolboxDirective');
import MapToolDirective = require('./MapToolDirective');

export = angular.module('directives.map',[])
    .directive(MapViewDirective.htmlName, MapViewDirective.create)
    .directive(MapDetailsDirective.htmlName, MapDetailsDirective.create)
    .directive(MapToolboxDirective.htmlName, MapToolboxDirective.create)
    .directive(MapToolDirective.htmlName, MapToolDirective.create);
