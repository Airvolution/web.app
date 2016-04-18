/// <reference path="../../../../typings/tsd.d.ts" />

import EditGroupController = require('./editGroupController');
export = EditGroupDirective;

class EditGroupDirective implements ng.IDirective {
    public static htmlName = "editGroup";

    public restrict = "E";
    public templateUrl = "app/directives/Config/Groups/editGroupTemplate.html";
    public controller = EditGroupController;
    public controllerAs = "ctrl";
    public bindToController = true;

    public static create() {
        return new EditGroupDirective();
    }

    constructor() {}
}