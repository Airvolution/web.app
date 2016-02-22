///<reference path="../../../typings/tsd.d.ts" />

export = LocationService;

class LocationService {
    public static serviceName = 'locationService';
    public static $inject = ['$http', '$q', '$log'];
    private data = undefined;
    constructor(
        private $http,
        private $q,
        private $log
    ) {
        // empty constructor
    }

    public asyncGetGeoCoordinates2() {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'http://freegeoip.net/json/';// data.ip data.latitude data.longitude
        self.$http.get(url).then(
            function(response) {
                self.$log.log('ip address: ' + response.data.ip);
                self.data = response.data;
                deferred.resolve({
                    lat: response.data.latitude,
                    lng: response.data.longitude
                });
            },
            function(response) {
                self.$log.log('bad response from freegeoip');
                deferred.reject({
                    lat: 0,
                    lng: 0
                });
            }
        );

        return deferred.promise;
    }

    public asyncGetGeoCoordinates() {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'http://ip-api.com/json'; // query lat lon
        self.$http.get(url).then(
            function(response) {
                self.$log.log('ip address: ' + response.data.query);
                deferred.resolve({
                    lat: response.data.lat,
                    lng: response.data.lon
                });
            },
            function(response) {
                self.$log.log('bad response from freegeoip');
                deferred.reject({
                    lat: 0,
                    lng: 0
                });
            }
        );

        return deferred.promise;
    }
}
