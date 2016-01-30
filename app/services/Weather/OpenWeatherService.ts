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
        apiKey = '9f5c853ae111945a65873eae72898a19';
    }

    public test() {
        let self = this;
        self.$log.log('this is a test of your open weather service');

        let url = 'http://api.openweathermap.org/data/2.5/weather';
        let config = {
            headers: {
                'Authorization': 'Bearer ' + self.apiKey
            },
            params: {
                lat: 35,
                lon: 139
            }
        };

        self.$http.get(url, config).then(
            function(response) {
                self.$log.log('open weather success: ' + response);
            },
            function(response) {
                self.$log.log('open weather FAIL: ' + response);
            }
        );
    }
}
