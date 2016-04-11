/// <reference path="../../../../typings/tsd.d.ts"/>

import MyStationsController = require("./myStationsController");
export = MyStationsDirective

class MyStationsDirective implements ng.IDirective{
    public static htmlName = "myStations";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/Stations/myStationsTemplate.html";
    public controller = MyStationsController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new MyStationsDirective();
    }
    constructor(){}
}