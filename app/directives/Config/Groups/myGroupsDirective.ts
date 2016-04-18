/// <reference path="../../../../typings/tsd.d.ts"/>

import MyGroupsController = require("./myGroupsController");
export = MyGroupsDirective;

class MyGroupsDirective implements ng.IDirective{
    public static htmlName = "myGroups";

    public restrict = "E";
    public templateUrl = "app/directives/Config/Groups/myGroupsTemplate.html";
    public controller = MyGroupsController;
    public controllerAs = "ctrl";
    public bindToController = true;

    public static create(){
        return new MyGroupsDirective();
    }
    constructor(){}
}
