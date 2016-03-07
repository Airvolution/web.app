/// <reference path="../../../typings/tsd.d.ts" />
import MapViewController = require('./MapViewController');
export = MapViewDirective;

class MapViewDirective implements ng.IDirective {
    public static htmlName = "mapView";
    
    public restrict = "E";
    public templateUrl =  "app/directives/Map/mapViewTemplate.html";
    public controller = MapViewController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {

    };

    public static create() {
        return new MapViewDirective();
    }
    constructor() {}
}
