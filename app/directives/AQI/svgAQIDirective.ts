/// <reference path="../../../typings/tsd.d.ts"/>

import SVGAQIController = require("./svgAQIController");
export = SVGAQIDirective

class SVGAQIDirective implements ng.IDirective {
    public static htmlName = "aqiScale";

    public restrict = "E";
    public templateUrl = "app/directives/AQI/svgAQITemplate.html";
    public controller = SVGAQIController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {
        aqi: '='
    };

    public static create() {
        return new SVGAQIDirective();
    }

    constructor() {
    }
}