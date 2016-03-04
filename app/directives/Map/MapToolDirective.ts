/// <reference path="../../../typings/tsd.d.ts" />
import MapToolController = require('./MapToolController');
export = MapToolDirective;

class MapToolDirective implements ng.IDirective {
    public static htmlName = 'mapTool';

    public restrict = 'E';
    public templateUrl = 'app/directives/Map/MapToolTemplate.html';
    public controller = MapToolController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public transclude = true;
    public scope = {
        expanded: '=',
        border: '='
    };

    public compile = ($element,$attrs) => {
      if(!$attrs.border) {
          $attrs.border = 'true';
      }

        return {};
    };

    public static create() {
        return new MapToolDirective();
    }
}
