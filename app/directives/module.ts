///<reference path='../../typings/tsd.d.ts' />
import FooterDirective = require('./Index/FooterDirective');
import AQIDirective = require('./AQI/AQIDirective');
import MapDirectives = require('./Map/module');
import CompareDirectives = require('./Compare/module');
import WeatherDirective = require('./Weather/WeatherDirective');
import AlmanacDirectives = require('./Almanac/module');
import ToolboxDirectives = require('./Toolbox/module');
import FAQDirectives = require('./FAQ/module');
import SearchDirectives = require('./Search/module');
import ConfigModule = require('./Config/module');
import AboutModule = require('./About/module');

export = angular.module('directives', [
        MapDirectives.name,
        CompareDirectives.name,
        AlmanacDirectives.name,
        ToolboxDirectives.name,
        FAQDirectives.name,
        SearchDirectives.name,
        ConfigModule.name,
        AboutModule.name
    ])
            .directive(WeatherDirective.htmlName, WeatherDirective.create)
            .directive(FooterDirective.htmlName, FooterDirective.create)
            .directive(AQIDirective.htmlName, AQIDirective.create);
