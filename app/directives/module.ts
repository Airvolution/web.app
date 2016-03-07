///<reference path='../../typings/tsd.d.ts' />
// import controller = require('../controllers/module');
import SiteNavDirective = require('./SiteNav/SiteNavDirective');
import FooterDirective = require('./Index/FooterDirective');
import SystemNotificationDirective = require('./SystemNotification/SystemNotificationDirective');
import StationDirective = require('./Station/StationDirective');
import AQIDirective = require('./AQI/AQIDirective');
import MapDirectives = require('./Map/module');
import CompareDirectives = require('./Compare/module');
import WeatherDirective = require('./Weather/WeatherDirective');
import AlmanacDirectives = require('./Almanac/module');
import ToolboxDirectives = require('./Toolbox/module');

export = angular.module('directives', [
        MapDirectives.name,
        CompareDirectives.name,
        AlmanacDirectives.name,
        ToolboxDirectives.name
    ])
            .directive(WeatherDirective.htmlName, WeatherDirective.create)
            .directive(SiteNavDirective.htmlName, SiteNavDirective.create)
            .directive(FooterDirective.htmlName, FooterDirective.create)
            .directive(SystemNotificationDirective.htmlName, SystemNotificationDirective.create)
            .directive(StationDirective.htmlName, StationDirective.create)
            .directive(AQIDirective.htmlName, AQIDirective.create);
