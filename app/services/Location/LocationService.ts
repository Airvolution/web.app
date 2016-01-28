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

    public asyncGetGeoCoordinates() {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'http://freegeoip.net/json/';
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
}
