///<reference path="../../../../typings/tsd.d.ts"/>
import MyProfileController = require("./MyProfileController");
export = MyProfileDirective

class MyProfileDirective implements ng.IDirective{
    public static htmlName = "myProfile";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/myProfileTemplate.html";
    public controller = MyProfileController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new MyProfileDirective();
    }
    constructor(){}
}
