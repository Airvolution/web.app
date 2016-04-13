/// <reference path="../../../../typings/tsd.d.ts" />

import PasswordResetModalController = require("./passwordResetModalController");
export = PasswordResetModalDirective;

class PasswordResetModalDirective implements ng.IDirective{
    public static htmlName = "passwordResetModal";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/passwordResetModalTemplate.html";
    public controller = PasswordResetModalController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new PasswordResetModalDirective();
    }
    constructor(){}
}
