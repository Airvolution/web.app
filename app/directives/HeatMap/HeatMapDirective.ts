///<reference path="../../../typings/tsd.d.ts"/>
import angular = require('angular');
import heatmap = require('../../maps/heatmap');
heatmap;
export = HeatMapDirective;

class HeatMapDirective implements ng.IDirective {
    public static htmlName:string = "heatMap";
    public templateUrl = "app/templates/heatmap.html";
    public restrict = "E";

    static create():HeatMapDirective {
        return new HeatMapDirective();
    }
}
