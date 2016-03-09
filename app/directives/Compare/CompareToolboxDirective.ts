/// <reference path="../../../typings/tsd.d.ts" />
import CompareToolboxController = require('./CompareToolboxController');
export = CompareToolboxDirective;

class CompareToolboxDirective implements ng.IDirective {
    public static htmlName = 'compareToolbox';

    public restict = 'E';
    public templateUrl = 'app/directives/Compare/CompareToolboxTemplate.html';
    public controller = CompareToolboxController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {

    };

    public static create(){
        return new CompareToolboxDirective();
    }
}
