///<reference path="../../../typings/tsd.d.ts" />

export = OpenWeatherService

class OpenWeatherService {
    public static serviceName = "openWeatherService";
    public static $inject = ['$http', '$q', '$log'];
    constructor(
        private $http,
        private $q,
        private $log,
        private apiKey
    ) {
        // empty constructor
    }

    public getCurrentWeather() {
        var deferred = this.$q.defer();

        let self = this;


        let url = 'api/weather/current';
        //let url = "api/weather/current?lat=39.927035&lng=-84.024774"
        let params = {
            params: {
                lat: 40.757823,
                lng: -111.850680
            }
        }

        self.$http.get(url, params).then(
            function (response) {
                self.$log.log('WEATHER success: ' + response);
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.log('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ])
            }
        );

        return deferred.promise;
    }

    public getCurrentWeatherByCoordinates(lat, lng) {
        var deferred = this.$q.defer();

        let self = this;


        let url = 'api/weather/current';
        //let url = "api/weather/current?lat=39.927035&lng=-84.024774"
        let params = {
            params: {
                lat: lat,
                lng: lng
            }
        }

        self.$http.get(url, params).then(
            function (response) {
                self.$log.log('WEATHER success: ' + response);
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.log('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ])
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
                self.$log.log('WEATHER success: ' + response);
                let data = JSON.parse(response.data);
                data.main.temp = self.convertKelvinToFarenheit(data.main.temp);
                data.main.temp_max = self.convertKelvinToFarenheit(data.main.temp_max);
                data.main.temp_min = self.convertKelvinToFarenheit(data.main.temp_min);
                deferred.resolve(data);
            },
            function (response) {
                self.$log.log('WEATHER failure: ' + response);
                deferred.reject([
                    // empty array
                ])
            }
        );

        return deferred.promise;
    }

    private convertKelvinToFarenheit(kelvin) {
        return (kelvin - 273.15) * 1.8 + 32;
    }
}
