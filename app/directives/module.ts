///<reference path="../../typings/tsd.d.ts" />
import services = require('../services/module');
import controller = require('../controllers/module');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');
import HeatMapDirective = require('./HeatMap/HeatMapDirective');

export = angular.module('directives',
    [   "services",
        "controllers"
    ])
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create)
            .directive(HeatMapDirective.htmlName, HeatMapDirective.create);
