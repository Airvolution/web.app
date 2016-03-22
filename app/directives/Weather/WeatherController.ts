///<referecnce path='../../typings/tsd.d.ts'/>

export = WeatherController;

class WeatherController {
    public static $inject = ['$scope', '$log', 'openWeatherService', 'locationService'];

    public currentTemp;
    public currentMax;
    public currentMin;
    public sky;

    constructor(
        private $scope,
        private $log,
        private openWeatherService,
        private locationService
    ) {
        this.sky='wi-na';
        this.findWeatherByLocation();
    }

    public findWeatherByLocation() {
        let self = this;
        self.locationService.asyncGetGeoCoordinates().then(
            function (response) {
                self.updateTemperaturesByCoordinates(response.lat, response.lng);
            },
            function (response) {
                self.$log.debug('Unable to get location: ' + response);
            }
        );
    }

    public updateTemperatures() {
        let self = this;
        self.openWeatherService.getCurrentWeather().then(
            function (response) {
                self.currentTemp = response.main.temp;
                self.currentMax = response.main.temp_max;
                self.currentMin = response.main.temp_min;
                self.sky = response.weather.icon;
            },
            function (response) {
                self.$log.debug('Unable to get weather: ' + response);
            }
        );
    }

    public updateTemperaturesByCoordinates(lat, lng) {
        let self = this;
        self.openWeatherService.getCurrentWeatherByCoordinates(lat, lng).then(
            function (response) {
                self.currentTemp = response.main.temp;
                self.currentMax = response.main.temp_max;
                self.currentMin = response.main.temp_min;
                self.sky = response.weather.icon;
            },
            function (response) {
                self.$log.debug('Unable to get weather: ' + response);
            }
        );
    }

    public updateTemperaturesByZipCode() {
        let self = this;
        self.openWeatherService.getCurrentWeatherByZipCode(84124).then(
            function (response) {
                self.currentTemp = response.main.temp;
                self.currentMax = response.main.temp_max;
                self.currentMin = response.main.temp_min;
            },
            function (response) {
                self.$log.debug('Unable to get weather: ' + response);
            }
        );
    }
}
