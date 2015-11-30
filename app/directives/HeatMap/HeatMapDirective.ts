///<reference path="../../../typings/tsd.d.ts"/>
export = HeatMapDirective;

class HeatMapDirective implements ng.IDirective {
    public static htmlName:string = "heatMap";
    public templateUrl = "app/templates/heatmap.html";
    public restrict = "E";
    public replace = true;

    static create():HeatMapDirective {
        return new HeatMapDirective();
    }
}
