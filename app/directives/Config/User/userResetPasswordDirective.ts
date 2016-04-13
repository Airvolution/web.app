/// <reference path="../../../../typings/tsd.d.ts" />

import UserResetPasswordController = require("./userResetPasswordController");
export = UserResetPasswordDirective

class UserResetPasswordDirective implements ng.IDirective{
    public static htmlName = "userResetPassword";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/userResetPasswordTemplate.html";
    public controller = UserResetPasswordController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new UserResetPasswordDirective();
    }
    constructor(){}
}