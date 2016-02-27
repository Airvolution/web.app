///<reference path='../../../typings/tsd.d.ts'/>
import WeatherController = require('../../controllers/Weather/WeatherController');
export = WeatherDirective;

class WeatherDirective implements ng.IDirective {
    public static htmlName: string = 'weather';
    public controller = WeatherController;
    public controllerAs = 'wctrl';
    public scope = {};
    public bindToController = {
        station: '='
    };
    public templateUrl = 'app/templates/weather.html';
    public restrict = 'E';

    public static create(): WeatherDirective {
        return new WeatherDirective();
    }
}
