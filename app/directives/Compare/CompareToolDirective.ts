/// <reference path="../../../typings/tsd.d.ts" />
import CompareToolController = require('./CompareToolController');
export = CompareToolDirective;

class CompareToolDirective implements ng.IDirective {
    public static htmlName = 'compareTool';

    public restrict = 'E';
    public templateUrl = 'app/directives/Compare/CompareToolTemplate.html';
    public controller = CompareToolController;
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
        return new CompareToolDirective();
    }
}
