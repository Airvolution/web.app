///<reference path="../../../typings/tsd.d.ts" />

export = MapFactory;

class MapFactory {
    public static serviceName = 'mapFactory';
    public static $inject = ['APIService','leafletMarkerEvents', '$q', '$log'];
    constructor(
        private APIService,
        private leafletMarkerEvents,
        private $q,
        private $log
    ) {
        // empty constructor
        $log.log('A Map Factory has been born.');
    }

    public getLastDataPointFromStation(id) {
        var deferred = this.$q.defer();

        let self = this;
        self.APIService.asyncGetLastDataPointFrom(id).then(
            function (response) {
                let lastDataPoint = {};
                let lastUpdated = "";

                angular.forEach(response, function (datapoint) {
                    lastDataPoint[datapoint.parameter['name']] = {
                        name: datapoint.parameter['name'],
                        value: datapoint.value,
                        unit: datapoint.parameter['unit']
                    };
                    // TODO: Convert UTC to LOCAL Time
                    lastUpdated = datapoint['time'];
                });

                deferred.resolve({
                    lastDataPoint: lastDataPoint,
                    lastUpdated: lastUpdated
                });
            },
            function (response) {
                self.$log.log('Map Factory received rejected promise: ' + response);
                deferred.reject(response);
            }
        );
        return deferred.promise;
    }

    public createMapEvents() {
        return {
            map: {
                enable: ['moveend'],
                logic: 'emit'
            },
            markers: {
                enable: this.leafletMarkerEvents.getAvailableEvents()
            }
        };
    }

    public createMapLayers() {
        return {
            baselayers: {
                light_map: {
                    name: 'Light Map',
                    url: 'https://api.tiles.mapbox.com/v4/tjhooker33.o78l0n36/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                    type: 'xyz'
                },
                dark_map: {
                    name: 'Dark Map',
                    url: 'https://api.tiles.mapbox.com/v4/tjhooker33.o780o9a3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                    type: 'xyz'
                },
                satellite_map: {
                    name: 'Satellite Map',
                    url: 'https://api.tiles.mapbox.com/v4/tjhooker33.oc2el95l/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                    type: 'xyz'
                }
            },
            overlays: {
                AL: {
                    type: 'markercluster',
                    name: 'Alabama',
                    visible: true
                },
                AK: {
                    type: 'markercluster',
                    name: 'Alaska',
                    visible: true
                },
                AZ: {
                    type: 'markercluster',
                    name: 'Arizona',
                    visible: true
                },
                AR: {
                    type: 'markercluster',
                    name: 'Arkansas',
                    visible: true
                },
                CA: {
                    type: 'markercluster',
                    name: 'California',
                    visible: true
                },
                CO: {
                    type: 'markercluster',
                    name: 'Colorado',
                    visible: true
                },
                CT: {
                    type: 'markercluster',
                    name: 'Connecticut',
                    visible: true
                },
                DE: {
                    type: 'markercluster',
                    name: 'Delaware',
                    visible: true
                },
                DC: {
                    type: 'markercluster',
                    name: 'District of Columbia',
                    visible: true
                },
                FL: {
                    type: 'markercluster',
                    name: 'Florida',
                    visible: true
                },
                GA: {
                    type: 'markercluster',
                    name: 'Georgia',
                    visible: true
                },
                HI: {
                    type: 'markercluster',
                    name: 'Hawaii',
                    visible: true
                },
                ID: {
                    type: 'markercluster',
                    name: 'Idaho',
                    visible: true
                },
                IL: {
                    type: 'markercluster',
                    name: 'Illinois',
                    visible: true
                },
                IN: {
                    type: 'markercluster',
                    name: 'Indiana',
                    visible: true
                },
                IA: {
                    type: 'markercluster',
                    name: 'Iowa',
                    visible: true
                },
                KS: {
                    type: 'markercluster',
                    name: 'Kansas',
                    visible: true
                },
                KY: {
                    type: 'markercluster',
                    name: 'Kentucky',
                    visible: true
                },
                LA: {
                    type: 'markercluster',
                    name: 'Lousiana',
                    visible: true
                },
                ME: {
                    type: 'markercluster',
                    name: 'Maine',
                    visible: true
                },
                MD: {
                    type: 'markercluster',
                    name: 'Maryland',
                    visible: true
                },
                MA: {
                    type: 'markercluster',
                    name: 'Massachusetts',
                    visible: true
                },
                MI: {
                    type: 'markercluster',
                    name: 'Michigan',
                    visible: true
                },
                MN: {
                    type: 'markercluster',
                    name: 'Minnesota',
                    visible: true
                },
                MS: {
                    type: 'markercluster',
                    name: 'Mississippi',
                    visible: true
                },
                MO: {
                    type: 'markercluster',
                    name: 'Missouri',
                    visible: true
                },
                MT: {
                    type: 'markercluster',
                    name: 'Montana',
                    visible: true
                },
                NE: {
                    type: 'markercluster',
                    name: 'Nebraska',
                    visible: true
                },
                NV: {
                    type: 'markercluster',
                    name: 'Nevada',
                    visible: true
                },
                NH: {
                    type: 'markercluster',
                    name: 'New Hampshire',
                    visible: true
                },
                NJ: {
                    type: 'markercluster',
                    name: 'New Jersey',
                    visible: true
                },
                NM: {
                    type: 'markercluster',
                    name: 'New Mexico',
                    visible: true
                },
                NY: {
                    type: 'markercluster',
                    name: 'New York',
                    visible: true
                },
                NC: {
                    type: 'markercluster',
                    name: 'North Carolina',
                    visible: true
                },
                ND: {
                    type: 'markercluster',
                    name: 'North Dakota',
                    visible: true
                },
                OH: {
                    type: 'markercluster',
                    name: 'Ohio',
                    visible: true
                },
                OK: {
                    type: 'markercluster',
                    name: 'Oklahoma',
                    visible: true
                },
                OR: {
                    type: 'markercluster',
                    name: 'Oregon',
                    visible: true
                },
                PA: {
                    type: 'markercluster',
                    name: 'Pennsylvania',
                    visible: true
                },
                RI: {
                    type: 'markercluster',
                    name: 'Rhode Island',
                    visible: true
                },
                SC: {
                    type: 'markercluster',
                    name: 'South Carolina',
                    visible: true
                },
                SD: {
                    type: 'markercluster',
                    name: 'South Dakota',
                    visible: true
                },
                TN: {
                    type: 'markercluster',
                    name: 'Tennessee',
                    visible: true
                },
                TX: {
                    type: 'markercluster',
                    name: 'Texas',
                    visible: true
                },
                UT: {
                    type: 'markercluster',
                    name: 'Utah',
                    visible: true
                },
                VT: {
                    type: 'markercluster',
                    name: 'Vermont',
                    visible: true
                },
                VA: {
                    type: 'markercluster',
                    name: 'Virginia',
                    visible: true
                },
                WA: {
                    type: 'markercluster',
                    name: 'Washington',
                    visible: true
                },
                WV: {
                    type: 'markercluster',
                    name: 'West Virginia',
                    visible: true
                },
                WI: {
                    type: 'markercluster',
                    name: 'Wisconsin',
                    visible: true
                },
                WY: {
                    type: 'markercluster',
                    name: 'Wyoming',
                    visible: true
                }
            }
        };
    }
}
