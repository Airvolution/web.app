/// <reference path="../../../typings/tsd.d.ts" />
import CompareViewController = require('./CompareViewController');
export = CompareViewDirective;

class CompareViewDirective implements ng.IDirective {
    public static htmlName = "compareView";

    public restrict = "E";
    public templateUrl =  "app/directives/Compare/CompareViewTemplate.html";
    public controller = CompareViewController;
    public controllerAs = "ctrl";
    public bindToController = true;
    public scope = {

    };

    public static create() {
        return new CompareViewDirective();
    }
    constructor() {}
}
