/// <reference path="../../../../typings/tsd.d.ts" />

import CalibrateStationController = require("./calibrateStationController");
export = CalibrateStationDirective;

class CalibrateStationDirective implements ng.IDirective{
    public static htmlName = "calibrateStation";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/Stations/calibrateStationTemplate.html";
    public controller = CalibrateStationController;
    public controllerAs = "ctrl";
    public bindToController = true;

    public static create(){
        return new CalibrateStationDirective();
    }
    constructor(){}
}
