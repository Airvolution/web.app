///<reference path="../../../typings/tsd.d.ts" />

export = ConfigViewDirective;

class ConfigViewDirective implements ng.IDirective{
    public static htmlName = "configView";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/configViewTemplate.html";

    public static create(){
        return new ConfigViewDirective();
    }
    constructor(){}
}