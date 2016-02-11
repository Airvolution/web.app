/// <reference path="../../../typings/tsd.d.ts" />

import AlmanacViewController = require("./AlmanacViewController");
export = AlmanacWidgetDirective;

class AlmanacWidgetDirective implements ng.IDirective {
    public static htmlName = 'almanacWidget';

    public restrict = 'E';
    public templateUrl = 'app/directives/Almanac/AlmanacWidgetTemplate.html';
    public controller = AlmanacViewController;
    public controllerAs = 'ctrl';
    public bindToController = true;
    public transclude = true;
    public scope = {};

    public static create() {
        return new AlmanacWidgetDirective();
    }

}
