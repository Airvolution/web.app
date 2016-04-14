/// <reference path="../../../../typings/tsd.d.ts" />

import EmailConfirmedModalController = require("./emailConfirmedModalController");
export = EmailConfirmedModalDirective;

class EmailConfirmedModalDirective implements ng.IDirective{
    public static htmlName = "emailConfirmedModal";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/emailConfirmedModalTemplate.html";
    public controller = EmailConfirmedModalController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new EmailConfirmedModalDirective();
    }
    constructor(){}
}
