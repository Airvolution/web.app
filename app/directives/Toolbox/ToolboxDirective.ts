/// <reference path="../../../typings/tsd.d.ts" />
import ToolboxController = require('./ToolboxController');
export = ToolboxDirective;

class ToolboxDirective implements ng.IDirective {
    public static htmlName = 'toolbox';

    public restict = 'E';
    public templateUrl = 'app/directives/Toolbox/ToolboxTemplate.html';
    public controller = ToolboxController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {

    };

    public static create(){
        return new ToolboxDirective();
    }
}
