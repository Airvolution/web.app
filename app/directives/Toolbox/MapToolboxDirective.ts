/// <reference path="../../../typings/tsd.d.ts" />
import MapToolboxController = require('./MapToolboxController');
export = MapToolboxDirective;

class MapToolboxDirective implements ng.IDirective {
    public static htmlName = 'mapToolbox';

    public restict = 'E';
    public templateUrl = 'app/directives/Toolbox/MapToolboxTemplate.html';
    public controller = MapToolboxController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {

    };

    public static create(){
        return new MapToolboxDirective();
    }
}
