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

    public asyncGetEPAMarkersInside(bounds) {
        // when this is updated for new API, 'bounds' will be used
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/frontend/daq';
        self.$http.get(url).then(
            function(response) {
                let markers = [];

                // Add custom attributes to each Marker
                for (let index in response.data) {
                    let site = response.data[index]['site'];
                    let obj = ({
                        deviceID: site['name'],
                        lat: site['latitude'],
                        lng: site['longitude'],
                        'clickable': true,
                        'icon': {
                            iconUrl: 'app/assets/images/markers/red.png',
                            iconSize: [35, 45],
                            iconAnchor: [17, 28]
                        }
                    });
                    markers.push(obj);
                }

                deferred.resolve(markers);
            },
            function(response) {
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

    public asyncGetNVD3DataPointsFrom(stationID) {
        // TODO: when compare view is ready, add support for multiple stations / variable param lists
        var deferred = this.$q.defer();

        let self = this;
        let url = "api/stations/parameterValues";
        let config = {
            params: {
                stationID: stationID,
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

    public asyncGetDataPointsFromEPA(stationID) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/frontend/daqChart';
        let data = JSON.stringify(stationID);
        self.$http.post(url, data, {}).then(
            function(response) {
                // make sure there are no entries of length zero
                let data = [];
                for (let index in response.data) {
                    if (response.data[index].values.length > 0) {
                        data.push({
                            'key': response.data[index].key,
                            'values': response.data[index].values
                        });
                    }
                }

                deferred.resolve(data);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }

    public asyncGetHeatMapDataInside(bounds) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/frontend/heatmap';
        let data = JSON.stringify(bounds);
        self.$http.post(url, data, {}).then(
            function(response) {
                deferred.resolve(response.data['values']);
            },
            function(response) {
                deferred.reject([
                    // empty array
                ]);
            }
        );

        return deferred.promise;
    }
}
