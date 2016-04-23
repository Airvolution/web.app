///<reference path='../../typings/tsd.d.ts' />
import SiteHeaderDirective = require('./Index/siteHeaderDirective');
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
import ModelMatchesDirective = require("./modelMatchesDirective");
import SVGAQIDirective = require("./AQI/svgAQIDirective");

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
            .directive(AQIDirective.htmlName, AQIDirective.create)
            .directive(ModelMatchesDirective.htmlName, ModelMatchesDirective.create)
            .directive(SVGAQIDirective.htmlName, SVGAQIDirective.create)
            .directive(SiteHeaderDirective.htmlName, SiteHeaderDirective.create);
