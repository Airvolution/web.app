/// <reference path="../../../typings/tsd.d.ts" />
import AlmanacViewController = require('./AlmanacViewController');
export = AlmanacViewDirective;

class AlmanacViewDirective implements ng.IDirective {
    public static htmlName = 'almanacView';

    public restrict = 'E';
    public templateUrl = 'app/directives/Almanac/AlmanacViewTemplate.html';
    public controller = AlmanacViewController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {};
    public link = {
        post: ($scope, $element, $attrs, $ctrl, $transclude)=> {
            $element.find('.widget-grid').shapeshift({
                colWidth: 150,
                gutterX: 10,
                gutterY: 10,
                selector: 'almanac-widget',
                "enable-resize": false,
                align: 'left'
            });
        }
    };

    constructor() {
    }

    public static create() {
        return new AlmanacViewDirective();
    }
}
