///<reference path='../../typings/tsd.d.ts' />
// import controller = require('../controllers/module');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');
import FooterDirective = require('./Index/FooterDirective');
import SystemNotificationDirective = require('./SystemNotification/SystemNotificationDirective');
import StationDirective = require('./Station/StationDirective');
import AQIDirective = require('./AQI/AQIDirective');
import MapDirectives = require('./Map/module');
import WeatherDirective = require('./Weather/WeatherDirective');

export = angular.module('directives', [
        MapDirectives.name
    ])
            .directive(WeatherDirective.htmlName, WeatherDirective.create)
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create)
            .directive(FooterDirective.htmlName, FooterDirective.create)
            .directive(SystemNotificationDirective.htmlName, SystemNotificationDirective.create)
            .directive(StationDirective.htmlName, StationDirective.create)
            .directive(AQIDirective.htmlName, AQIDirective.create);
