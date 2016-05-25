///<reference path="../../../typings/tsd.d.ts" />

import SiteHeaderController = require("./siteHeaderController");
export = SiteHeaderDirective;

class SiteHeaderDirective implements ng.IDirective{
    public static htmlName = "siteHeader";
    
    public restrict = "E";
    public templateUrl = "app/directives/Index/siteHeaderTemplate.html";
    public controller = SiteHeaderController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {

    };
    
    public static create(){
        return new SiteHeaderDirective();
    }
    constructor(){}
}
