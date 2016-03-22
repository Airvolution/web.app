///<reference path="../../../typings/tsd.d.ts" />

export = LocationService;

class LocationService {
    public static serviceName = 'locationService';
    public static $inject = ['$http', '$q', '$log'];
    private locationData = undefined;
    constructor(
        private $http,
        private $q,
        private $log
    ) {
        let ls = this;
        ls.asyncGetGeoCoordinates();
    }

    public asyncGetGeoCoordinates() {
        var deferred = this.$q.defer();

        let self = this;
        if (self.locationData !== undefined) {
            deferred.resolve(self.locationData);
        } else {
            let url = 'http://ip-api.com/json'; // query lat lon
            self.$http.get(url).then(
                function(response) {
                    self.locationData = response.data;
                    self.locationData.lng = response.data.lon;
                    deferred.resolve({
                        city: response.data.city,
                        region: response.data.region,
                        lat: response.data.lat,
                        lng: response.data.lon
                    });
                },
                function(response) {
                    self.$log.error('Unable to retrieve location. Response: '+response);
                    deferred.reject({
                        city: '',
                        region: '',
                        lat: 0,
                        lng: 0
                    });
                }
            );
        }
        return deferred.promise;
    }
}
