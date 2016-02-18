/// <reference path="../../../typings/tsd.d.ts" />

import AlmanacViewController = require("./AlmanacWidgetController");
export = AlmanacWidgetDirective;

class AlmanacWidgetDirective implements ng.IDirective {
    public static htmlName = 'almanacWidget';

    public restrict = 'E';
    public template = '<div ng-include="ctrl.templateUrl"></div>';
    public controller = AlmanacViewController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public scope = {
        "type": "@"
    };

    public link = {
        post: ($scope, $element:JQuery, $attrs, $ctrl)=> {
            var size = $ctrl.getTemplateSize($attrs.type);
            $element.attr('widget-size', size);
            $element.attr('data-ss-colspan', AlmanacWidgetDirective.getColumnsFromSize(size));
        }
    };

    public static create() {
        return new AlmanacWidgetDirective();
    }

    public static getColumnsFromSize(size) {
        switch (size) {
            case 'small':
                return 1;
            case 'medium':
                return 2;
            case 'large':
                return 3;
            default:
                return 1;
        }
    }

}
