/// <reference path="../../../../typings/tsd.d.ts"/>

import UserPreferencesController = require("./userPreferencesController");
export = UserPreferencesDirective;

class UserPreferencesDirective implements ng.IDirective{
    public static htmlName = "userPreferences";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/User/userPreferencesTemplate.html";
    public controller = UserPreferencesController;
    public controllerAs = "ctrl";
    public bindToController = true;
    
    public static create(){
        return new UserPreferencesDirective();
    }
    constructor(){}
}
