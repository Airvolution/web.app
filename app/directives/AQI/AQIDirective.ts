///<reference path='../../../typings/tsd.d.ts'/>
import AQIController = require('./AQIController');
export = AQIDirective;

class AQIDirective implements ng.IDirective {
    public static htmlName: string = 'aqiPopover';
    public controller = AQIController;
    public controllerAs = 'ctrl';
    public scope = {};
    public bindToController = {
        aqi: '=',
        category: '='
    };
    public templateUrl = 'app/templates/aqi-popover.html';
    public restrict = 'E';

    public link(scope, element, attrs, ctrl) {
        scope.$watch(function(scope){
            return ctrl.aqi;
        }, function(value){
            ctrl.onAQIUpdate(value);
        });
    }

    public static create(): AQIDirective {
        return new AQIDirective();
    }
}
