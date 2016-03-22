///<reference path="../../../typings/tsd.d.ts" />

export = OpenWeatherService

class OpenWeatherService {
    public static serviceName = 'openWeatherService';
    public static $inject = ['$http', '$q', '$log'];
    constructor(
        private $http,
        private $q,
        private $log
    ) {
        // empty constructor
    }

    public getCurrentWeather() {
        var deferred = this.$q.defer();

        let self = this;

        let url = 'api/weather/current';
        let params = {
            params: {
                lat: 40.757823,
                lng: -111.850680
            }
        };

        self.$http.get(url, params).then(
            function (response) {
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.debug('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public getCurrentWeatherByCoordinates(lat, lng) {
        var deferred = this.$q.defer();

        let self = this;

        let url = 'api/weather/current';
        let params = {
            params: {
                lat: lat,
                lng: lng
            }
        };

        self.$http.get(url, params).then(
            function (response) {
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                data.weather.icon = self.convertToSky(data.weather[0].icon);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.debug('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public getCurrentWeatherByZipCode(zipCode) {
        var deferred = this.$q.defer();

        let self = this;

        let url = 'api/weather/current';
        let params = {
            params: {
                zip: zipCode
            }
        };

        self.$http.get(url, params).then(
            function (response) {
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.debug('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    private convertToSky(icon) {
        switch (icon) {
            case '01d':
                return 'wi-day-sunny';
            case '02d':
                return 'wi-day-cloudy';
            case '03d':
            case '03n':
                return 'wi-cloud';
            case '04d':
            case '04n':
                return 'wi-cloudy';
            case '09d':
            case '09n':
                return 'wi-showers';
            case '10d':
                return 'wi-day-rain';
            case '11d':
            case '11n':
                return 'wi-thunderstorm';
            case '13d':
            case '13n':
                return 'wi-snow';
            case '50d':
            case '50n':
                return 'wi-fog';
            case '01n':
                return 'wi-night-clear';
            case '02n':
                return 'wi-night-alt-cloudy';
            case '10n':
                return 'wi-night-alt-rain';
            default:
                return 'wi-na';
        }
    }
    
    private convertKelvinToFarenheit(kelvin) {
        return Math.round((kelvin - 273.15) * 1.8 + 32);
    }
}
