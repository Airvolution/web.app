///<reference path="../../../../typings/tsd.d.ts" />

import UserLoginRegisterController = require("./userLoginRegisterController");
export = UserLoginRegisterDirective

class UserLoginRegisterDirective implements ng.IDirective{
    public static htmlName = "userLogin";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/userLoginRegisterTemplate.html";
    public controller = UserLoginRegisterController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new UserLoginRegisterDirective();
    }
    constructor(){}
}
