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
    public scope = {

    };
    public link = ($scope,$element,$attrs,$ctrl,$transclude)=>{
        $('#almanac-grid').gridster({
            widget_selector: 'almanac-widget',
            min_cols:6,
            max_cols: 6,
            widget_base_dimensions: [140,140],
            widget_margins: [10,10],
            extra_rows: 1
        }).data('gridster');
    };

    constructor(){}

    public static create() {
        return new AlmanacViewDirective();
    }
}
