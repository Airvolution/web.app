/// <reference path="../../../typings/tsd.d.ts" />

import MapSearchController = require("./mapSearchController");
export = MapSearchDirective;

class MapSearchDirective implements ng.IDirective{
    public static htmlName = "mapSearch";
    
    public restrict = "E";
    public templateUrl = "app/directives/Search/mapSearchTemplate.html";
    public controller = MapSearchController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = true;
    
    public static create(){
        return new MapSearchDirective();
    }
    constructor(){}
}
