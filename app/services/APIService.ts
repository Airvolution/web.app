///<reference path="../../typings/tsd.d.ts" />

export = APIService;

class APIService {
    public static serviceName = 'APIService';
    public static $inject = ['$http', '$q', '$log','locationService'];
    constructor(
        private $http,
        private $q,
        private $log,
        private locationService
    ) {}

    public getDailies(days) {
        var deferred = this.$q.defer();
        var self = this;
        var onError = (error)=>{deferred.reject(error);};
        this.locationService.asyncGetGeoCoordinates().then((location)=>{
            var locationParameter = {
                params:location
            };
            self.$http.get('api/stations/nearest',locationParameter).then((stationData)=>{
                var dailiesParameters = {
                    params: {
                        stationId:stationData.data.id,
                        daysBack:days
                    }
                };
               self.$http.get('api/almanac/dailies',dailiesParameters).then((dailies)=>{
                  deferred.resolve(dailies.data);
               },onError);
            },onError);
        },onError);
        return deferred.promise;
    }
    public asyncGetMarkersInside(bounds) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/locations';
        let config = {
            params: {
                latMin: bounds.southWest.lat,
                latMax: bounds.northEast.lat,
                lngMin: bounds.southWest.lng,
                lngMax: bounds.northEast.lng
            }
        };

        self.$http.get(url, config).then(
            function(response) {
                deferred.resolve(response);
            },
            function(response) {
                self.$log.log('we did not get any markers get back');
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetLastDataPointFrom(stationID) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/latestDataPoint/' + stationID;
        self.$http.get(url).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetDataPointsFrom(stationID) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/datapoints/' + stationID;
        self.$http.get(url).then(
            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetNVD3DataPointsFrom(id) {
        // TODO: when compare view is ready, add support for multiple stations / variable param lists
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/stations/parameterValues";
        let config = {
            params: {
                stationID: id,
                parameter: ["PM2.5", "PM10", "OZONE", "CO", "NO2", "SO2"]
            }
        };
        self.$http.get(url, config).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response);
            }
        );

        return deferred.promise;
    }

    public GetFAQs() {
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/faq";

        self.$http.get(url).then(
            function (response) {
                deferred.resolve(response.data);
            },
            function (response) {
                deferred.reject(response);
            }
        );

        return deferred.promise;
    }
}
