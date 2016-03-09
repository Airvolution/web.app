///<reference path='../../../typings/tsd.d.ts'/>
import WeatherController = require('./WeatherController');
export = WeatherDirective;

class WeatherDirective implements ng.IDirective {
    public static htmlName: string = 'weather';
    public controller = WeatherController;
    public controllerAs = 'wctrl';
    public scope = {};
    public bindToController = {
        station: '='
    };
    public templateUrl = 'app/directives/Weather/WeatherTemplate.html';
    public restrict = 'E';

    public static create(): WeatherDirective {
        return new WeatherDirective();
    }
}
