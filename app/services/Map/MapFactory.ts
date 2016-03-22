///<reference path="../../../typings/tsd.d.ts" />

export = MapFactory;

class MapFactory {
    private mapMarkers;
    private mapTiles;

    public static serviceName = 'mapFactory';
    public static $inject = ['APIService','leafletMarkerEvents', '$q', '$log', 'locationService'];
    private tilesDictionary = {
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
    };
    constructor(
        private APIService,
        private leafletMarkerEvents,
        private $q,
        private $log,
        private locationService
    ) {
        this.mapMarkers = undefined;
    }

    public registerMapTiles(tiles) {
        this.mapTiles = tiles;
    }

    public setMap(mode) {
        let newTiles = this.createTilesFromKey(mode);
        this.mapTiles.name = newTiles.name;
        this.mapTiles.url = newTiles.url;
        this.mapTiles.type = newTiles.type;
    }

    public getMarkerNames() {
        if (this.mapMarkers === undefined) {
            return [];
        }
        let markerNames = [];
        angular.forEach(this.mapMarkers, function (marker) {
            markerNames.push(marker.name);
        });
        return markerNames;
    }

    public downloadDataFromStation(id) {
        // TODO: when compare view is ready, add support for multiple stations / variable param lists
        this.APIService.downloadDataFromStation(id);
    }

    public getDataFromStation(ids, params) {
        // TODO: when compare view is ready, add support for multiple stations / variable param lists
        var deferred = this.$q.defer();
        let self = this;

        if (params.length == 0) {
            params = ["PM2.5", "PM10", "OZONE", "CO", "NO2", "SO2"];
        }

        self.APIService.asyncGetNVD3DataPointsFrom(ids, params).then(
            function (response) {
                deferred.resolve({
                    chartOptions: self.getChartOptions(),
                    chartData: response
                });
            },
            function (response) {
                deferred.reject(response);
            }
        );
        return deferred.promise;
    }

    private getChartHeight() {
        let divHeight = angular.element(document).find('#details-plot').css('height');
        return parseInt(divHeight.substring(0, divHeight.length - 2));
    }

    public getChartOptions() {
        return {
            chart: {
                type: 'lineChart',
                height: this.getChartHeight(),
                margin: {
                    top: 20,
                    right: 20,
                    bottom: 30,
                    left: 40
                },
                x: function (d) {
                    return d[0];
                },
                y: function (d) {
                    return d[1];
                },
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function (d) {
                        return d3.time.format('%x')(new Date(d));
                    }
                },
                yAxis: {
                    tickFormat: function (d) {
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };
    }

    public getMapMarkers() {
        var deferred = this.$q.defer();
        let self = this;

        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        self.APIService.asyncGetMarkersInside(bounds).then(
            function (response) {
                let data = response.data;

                // Add custom attributes to each Marker
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        data[key]['lat'] = data[key].location.lat;
                        data[key]['lng'] = data[key].location.lng;
                        if (data[key]['agency'] != null) {
                            data[key]['layer'] = data[key]['state'];
                            data[key]['icon'] = self.getIconForMarker(data[key].aqi);
                        } else {
                            data[key]['icon'] = {
                                iconUrl: 'app/assets/images/markers/red.png',
                                iconSize: [35, 45],
                                iconAnchor: [17, 28]
                            };
                        }
                        data[key]['clickable'] = true;
                    }
                }
                self.mapMarkers = data;
                deferred.resolve(data);
            },
            function (response) {
                deferred.reject([]);
            }
        );
        return deferred.promise;
    }

    private getIconForMarker(aqi) {
        var icon = {
            type: 'div',
            iconSize: [60, 60],
            iconAnchor: [30, 30]
        };

        let marker = angular.copy(icon);
        marker['html'] = '<div><span>' + aqi + '</span></div>';

        if (aqi <= 50) {
            marker['className'] = 'marker marker-green';
        } else if (aqi <= 100) {
            marker['className'] = 'marker marker-yellow';
        } else if (aqi <= 150) {
            marker['className'] = 'marker marker-orange';
        } else if (aqi <= 200) {
            marker['className'] = 'marker marker-red';
        } else if (aqi <= 300) {
            marker['className'] = 'marker marker-purple';
        } else {
            marker['className'] = 'marker marker-maroon';
        }
        return marker;
    }

    public getDefaults() {
        return {
            minZoom: 4,
            maxZoom: 16,
            zoomControlPosition: 'bottomright'
        };
    }

    public getCenter() {
        // the map by default must initialize with a valid center
        return {
            autoDiscover: true,
            zoom: 5
        };
    }

    public getCenterNoAutoDiscover(currentZoom) {
        let deferred = this.$q.defer();

        let self = this;
        self.locationService.asyncGetGeoCoordinates().then(
            function (response) {
                deferred.resolve({
                    lat: response.lat,
                    lng: response.lng,
                    zoom: currentZoom
                });
            },
            function (response) {
                deferred.resolve({
                    autoDiscover: true,
                    zoom: currentZoom
                });
            }
        );

        return deferred.promise;
    }

    public getCenterFromMarker(marker, currentZoom) {
        return {
            lat: marker.lat,
            lng: marker.lng,
            zoom: currentZoom
        };
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
                self.$log.debug('Unable to get last datapoint: ' + response);
                deferred.reject(response);
            }
        );
        return deferred.promise;
    }

    public createDefaultTiles() {
        // TODO: when data is saved in user profile, call createTilesFromKey(key)
        return this.tilesDictionary['light_map'];
    }

    public createTilesFromKey(tileKey) {
        // Passing objects by reference inadvertently allows the caller to modify
        //   properties in the factory. Clone the objects first, then return the copy.
        switch (tileKey) {
            case 'light':
                return _.clone(this.tilesDictionary['light_map']);
            case 'dark':
                return _.clone(this.tilesDictionary['dark_map']);
            case 'satellite':
                return _.clone(this.tilesDictionary['satellite_map']);
            default:
                return _.clone(this.tilesDictionary['light_map']);
        };
    }

    public createMapLayers() {
        return {
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
                },
                // CANADA
                AB: {
                    type: 'markercluster',
                    name: 'Alberta',
                    visible: true
                },
                BC: {
                    type: 'markercluster',
                    name: 'British Columbia',
                    visible: true
                },
                MB: {
                    type: 'markercluster',
                    name: 'Manitoba',
                    visible: true
                },
                NB: {
                    type: 'markercluster',
                    name: 'New Brunswick',
                    visible: true
                },
                NS: {
                    type: 'markercluster',
                    name: 'Nova Scotia',
                    visible: true
                },
                ON: {
                    type: 'markercluster',
                    name: 'Ontario',
                    visible: true
                },
                PE: {
                    type: 'markercluster',
                    name: 'Prince Edward Island',
                    visible: true
                },
                QC: {
                    type: 'markercluster',
                    name: 'Québec',
                    visible: true
                },
                SK: {
                    type: 'markercluster',
                    name: 'Saskatchewan',
                    visible: true
                },
                // MEXICO
                'N.L.': {
                    type: 'markercluster',
                    name: 'Nuevo León',
                    visible: true
                }
            }
        };
    }
}
