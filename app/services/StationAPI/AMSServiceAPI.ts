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
        let url = 'api/frontend/map';
        let data = JSON.stringify(bounds);
        self.$http.post(url, data, {} ).then(
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
                deferred.resolve(data);
            },
            function(response) {
                deferred.resolve({});
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
                let data = response.data;
                let markers = [];

                // Add custom attributes to each Marker
                for (let index in data) {
                    let site = data[index]['site'];
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
        let url = 'api/frontend/singleLatest';
        let data = JSON.stringify(stationID);
        self.$http.post(url, data, {}).then(
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
}
