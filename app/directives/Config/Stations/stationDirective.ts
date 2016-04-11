///<reference path='../../../../typings/tsd.d.ts'/>
import StationController = require('./StationController');
export = StationDirective;

class StationDirective implements ng.IDirective {
    public static htmlName: string = 'station';
    public controller = StationController;
    public controllerAs = 'ctrl';
    public scope = {};
    public bindToController = {
        station: '='
    };
    public templateUrl = 'app/directives/Config/Stations/stationTemplate.html';
    public restrict = 'E';

    public static create(): StationDirective {
        return new StationDirective();
    }
}
