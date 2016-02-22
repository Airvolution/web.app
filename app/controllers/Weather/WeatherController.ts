///<referecnce path='../../typings/tsd.d.ts'/>

export = WeatherController;

class WeatherController {
    public static name = 'WeatherController';
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
                self.updateTemperaturesByCoordinates(40.490562, -111.880033);
                self.$log.log('location service promise rejected: ' + response);
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
                self.$log.log('openWeatherService responded with data: ' + response);
            },
            function (response) {
                self.$log.log('openWeatherService promise rejected: ' + response);
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
                self.$log.log('openWeatherService responded with data: ' + response);
                self.$log.log('sky: ' + response.weather.icon);
            },
            function (response) {
                self.$log.log('openWeatherService promise rejected: ' + response);
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
                self.$log.log('openWeatherService responded with data: ' + response);
            },
            function (response) {
                self.$log.log('openWeatherService promise rejected: ' + response);
            }
        );
    }
}
