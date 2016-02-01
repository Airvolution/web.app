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
                lat: 39.927035,
                lng: -84.024774
            }
        }

        self.$http.get(url, params).then(
            function (response) {
                self.$log.log('WEATHER success: ' + response);
                let ret = JSON.parse(response.data)
                self.$log.log('data');
                deferred.resolve(response.data);
            },
            function (response) {
                self.$log.log('WEATHER failure: ' + response);
                deferred.reject([

                ])
            }
        );

        return deferred.promise;
    }
}
