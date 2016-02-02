///<reference path="../../../typings/tsd.d.ts" />

export = AMSServiceAPI;

class AMSServiceAPI {
    public static serviceName = 'amsAPIService';
    public static $inject = ['$http', '$q', '$log'];
    constructor(
        private $http,
        private $q,
        private $log
    ) {
        // empty constructor
    }

    public asyncGetMarkersInside(bounds) {
        var deferred = this.$q.defer();

        let self = this;
        let url = 'api/stations/locators';
        let data = JSON.stringify(bounds);
        self.$http.get(url, data, {} ).then(
            function(response) {
                let data = response.data['ams'];

                // Add custom attributes to each Marker
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        data[key]['clickable'] = true;
                        data[key]['icon'] = {
                            iconUrl: 'app/assets/images/markers/green.png',
                            iconSize: [35, 45],
                            iconAnchor: [17, 28]
                        };
                    }
                }
                self.$log.log('how many markers did we get back? ' + data.length);
                deferred.resolve(data);
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
