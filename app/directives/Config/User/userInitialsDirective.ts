///<reference path="../../../../typings/tsd.d.ts"/>
import UserInitialsController = require("./UserInitialsController");
export = UserInitialsDirective

class UserInitialsDirective implements ng.IDirective{
    public static htmlName = "userInitials";

    public restrict = "E";
    public templateUrl = "app/directives/Config/User/userInitialsTemplate.html";
    public controller = UserInitialsController;
    public controllerAs = "ctrl";
    public bindToController = true;

    public scope = {
        userProfile:"="
    };

    public static create(){
        return new UserInitialsDirective();
    }
    constructor(){}
}
