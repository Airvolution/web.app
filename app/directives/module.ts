///<reference path="../../typings/tsd.d.ts" />
import services = require('../services/module');
import controller = require('../controllers/module');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');

export = angular.module('directives',
    [   "services",
        "controllers"
    ])
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create);
