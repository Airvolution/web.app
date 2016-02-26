/// <reference path="../../../typings/tsd.d.ts" />
import ToolController = require('./ToolController');
export = ToolDirective;

class ToolDirective implements ng.IDirective {
    public static htmlName = 'tool';

    public restrict = 'E';
    public templateUrl = 'app/directives/Toolbox/ToolTemplate.html';
    public controller = ToolController;
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
        return new ToolDirective();
    }
}
