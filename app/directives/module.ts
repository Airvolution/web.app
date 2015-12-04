///<reference path="../../typings/tsd.d.ts" />
import controller = require('../controllers/module');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');
import SystemNotificationDirective = require("./SystemNotification/SystemNotificationDirective");
import StationDirective = require("./Station/StationDirective");

export = angular.module('directives',
    [   "services"
    ])
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create)
            .directive(SystemNotificationDirective.htmlName, SystemNotificationDirective.create)
            .directive(StationDirective.htmlName, StationDirective.create);
