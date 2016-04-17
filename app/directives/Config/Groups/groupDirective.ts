/// <reference path="../../../../typings/tsd.d.ts" />

import GroupController = require("./groupController");
export = GroupDirective

class GroupDirective implements ng.IDirective{
    public static htmlName = "group";
    
    public restrict = "E";
    public templateUrl = "app/directives/Config/Groups/groupTemplate.html";
    public controller = GroupController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {
        group: '=',
        refresh: '&refreshGroups'
    };
    
    public static create(){
        return new GroupDirective();
    }
    constructor(){}
}