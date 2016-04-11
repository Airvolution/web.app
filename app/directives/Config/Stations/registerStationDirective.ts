///<reference path="../../../../typings/tsd.d.ts" />

import RegisterStationController = require("./registerStationController");
export = RegisterStationDirective

class RegisterStationDirective implements ng.IDirective{
    public static htmlName = "registerStation";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/Stations/registerStationTemplate.html";
    public controller = RegisterStationController;
    public controllerAs = "ctrl";
    public bindToController = true;

    
    public static create(){
        return new RegisterStationDirective();
    }
    constructor(){}
}