/// <reference path="../../../typings/tsd.d.ts" />

export = MapViewController;

class MapViewController {

    public detailsVisible:boolean;
    public plotVisible:boolean;

    public selectedStation;
    public loadingStationData;

    private drawCount;

    public controls;
    public center;
    public minZoom;
    public maxZoom;
    public markers;
    public bounds;
    public events;
    public layers;

    public chartOptions;
    public chartData;

    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'APIService', '$timeout'];

    constructor(private $scope,
                private leafletData,
                private leafletBoundsHelpers,
                private leafletMarkerEvents,
                private $http,
                private $log,
                private locationService,
                private APIService,
                private $timeout) {

        this.detailsVisible = true;
        this.plotVisible = false;
        this.minZoom = 5;
        this.maxZoom = 12;

        // middle of continental US
        this.center = {
            lat: 39.994157,
            lng: -97.722896,
            zoom: 5
        };

        this.markers = [];

        this.selectedStation = {location: {}, last: {}};
        //this.bounds = this.defaultMapBounds();

        this.layers = this.configureLayers();
        this.events = this.registerMapEvents();

        this.drawCount = 0;

        $scope.$on('leafletDirectiveMarker.map.click', this.onMarkerClick());

        this.updateMapMarkers();
        this.positionMapWithLocation();
        this.configureMapMoveEvents();
        //this.updateOverlays();
    }

    private configureLayers() {
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

    //private configureOverlays() {
    //    return {
    //        name: 'Heat Map',
    //        type: 'heat',
    //
    //        data: [],
    //        layerOptions: {
    //            backgroundColor: 'rgba(0,0,0,0.25)',
    //            maxOpacity: 0.9,
    //            minOpacity: 0.5,
    //            radius: 50,
    //            blur: 15
    //        },
    //        visible: false
    //    };
    //}

    private registerMapEvents() {
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

    //private defaultMapBounds() {
    //    return this.leafletBoundsHelpers.createBoundsFromArray([
    //        [ 57.903638, -37.642519 ],
    //        [ 11.708745, -152.757073 ]
    //    ]);
    //}

    //private defaultMapBounds() {
    //    return this.leafletBoundsHelpers.createBoundsFromArray([
    //        [57.903638, -37.642519],
    //        [11.708745, -152.757073]
    //    ]);
    //}

    private configureMapMoveEvents() {
        let self = this;
        self.$scope.$on('leafletDirectiveMap.map.moveend', function (event) {
            // This updates $scope.bounds because leaflet bounds are not updating automatically
            self.leafletData.getMap().then(
                function (map) {
                    self.bounds = map.getBounds();
                    self.$log.log('updating map bounds');
                    self.$log.log('zoom: ' + map.getZoom());
                    //self.drawCircles();
                }
            );
        });
    }

    private onMarkerClick() {
        let self = this;
        self.$scope.$on('leafletDirectiveMarker.map.click', function (event, args) {
            self.$log.log('a marker has been clicked');

            if (self.selectedStation && self.selectedStation.id && args.model.id == self.selectedStation.id) {
                self.toggleDetails(false);
                self.selectedStation = undefined;
                return;
            }

            let model = args.model;
            let id = model.id;
            //if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id == 'Washington County' || id == 'Weber County') {
            //
            //    self.selectedStation = { location: {}, last: {} };
            //
            //    self.selectedStation.id           = model.station_Id;
            //    self.selectedStation.location.lat = model.lat;
            //    self.selectedStation.location.lng = model.lng;
            //
            //    // TODO: get latest values from deq site
            //
            //    self.detailsVisible = true;
            //
            //    if (self.plotVisible) {
            //        self.plotVisible = false;
            //    }
            //    return;
            //}

            self.selectedStation = model;

            self.APIService.asyncGetLastDataPointFrom(id).then(
                function (response) {
                    self.selectedStation.last = {};
                    angular.forEach(response, function (datapoint) {
                        self.selectedStation.last[datapoint.parameter['name']] = {
                            name: datapoint.parameter['name'],
                            value: datapoint.value,
                            unit: datapoint.parameter['unit']
                        };
                        // TODO: Convert UTC to LOCAL Time
                        self.selectedStation['lastUpdated'] = datapoint['time'];
                    });

                    self.detailsVisible = true;

                    if (self.plotVisible) {
                        self.plotVisible = false;
                    }
                },
                function (response) {
                    self.$log.log('last data point promise rejected: ' + response);
                }
            );
        });
        //var self = this;
        //return (event, args)=> {
        //    self.$log.log('a marker has been clicked');
        //
        //    var id = args.model.id || args.model.deviceID;
        //    if (self.selectedStation && self.selectedStation.id && id == self.selectedStation.id) {
        //        self.toggleDetails(false);
        //        self.selectedStation = undefined;
        //        return;
        //    }
        //    self.selectedStation = {location: {}, last: {}};
        //    self.selectedStation.id = id;
        //    self.selectedStation.location.lat = args.model.lat;
        //    self.selectedStation.location.lng = args.model.lng;
        //    if (!self.isEPAStation(id)) {
        //        self.getLastDataPoint(id);
        //        return;
        //    }
        //};
    }

    private togglePlot(visible?) {
        if (visible) {
            this.plotVisible = visible;
        } else {
            this.plotVisible = !this.plotVisible;
        }
    }

    private toggleDetails(visible?) {
        if (visible) {
            this.detailsVisible = visible;
        } else {
            this.detailsVisible = !this.detailsVisible;
        }
    }

    private isEPAStation(id) {
        switch (id) {
            case 'Box Elder County':
            case 'Cache County':
            case 'Price':
            case 'Davis County':
            case 'Duchesne County':
            case 'Salt Lake County':
            case 'Tooele County':
            case 'Uintah County':
            case 'Utah County':
            case 'Washington County':
            case 'Weber County':
                return true;
            default:
                return false;
        }

    }

    private getLastDataPoint(id) {
        this.loadingStationData = true;
        var self = this;
        self.APIService.asyncGetLastDataPointFrom(id).then(
            function (response) {
                self.selectedStation.last = {};

                self.selectedStation.last.pm = response['PM2.5'];
                self.selectedStation.last.co = response['CO'];
                self.selectedStation.last.co2 = response['co2'];
                self.selectedStation.last.no2 = response['NO2'];
                self.selectedStation.last.o3 = response['OZONE'];
                self.selectedStation.last.so2 = response['SO2'];
                self.selectedStation.last.pm10 = response['PM10'];
                self.selectedStation.last.temp = response['temp'];
                self.selectedStation.last.humidity = response['humidity'];
                self.selectedStation.last.pressure = response['pressure'];
                self.selectedStation.last.altitude = response['altitude'];

                self.selectedStation.source = response['agency'];
                self.selectedStation.lastUpdated = response['lastUpdated'];
                self.selectedStation.indoor = response['indoor'];
                self.selectedStation.last.aqi = response['aqi'];
                self.loadingStationData = false;
            },
            function () {
                delete self.selectedStation.last;
                self.loadingStationData = false;
            });
    }

    private positionMapWithLocation() {
        console.log('positionMapWithLocation called...');
        let self = this;
        self.locationService.asyncGetGeoCoordinates().then(
            function (response) {
                self.center = {
                    autoDiscover: true,
                    zoom: 5
                };
                //self.center = {
                //    lat: response.lat,
                //    lng: response.lng,
                //    zoom: 10
                //};
            },
            function (response) {
                self.$log.log('location service promise rejected: ' + response);
            }
        );
    }

    //private updateMapMarkers() {
    //    this.updateAirvolutionMarkers();
    //    this.updateEPAMarkers();
    //}
    //
    //private updateEPAMarkers() {
    //    let self = this;
    //    let bounds  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
    //    self.amsAPIService.asyncGetEPAMarkersInside(bounds).then(
    //        function(response) {
    //            if (self.markers == undefined) {
    //                self.markers = response;
    //                self.$log.log('marker array was empty');
    //            } else {
    //                self.markers = self.markers.concat(response);
    //                self.$log.log('concatenation of the marker array');
    //            }
    //        },
    //        function(response) {
    //            self.$log.log('EPA API service promise rejected: ' + response);
    //        }
    //    );
    //}

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

    //private updateMapMarkers() {
    //    this.updateAirvolutionMarkers();
    //    //this.updateEPAMarkers();
    //}

    //private updateEPAMarkers() {
    //    let self = this;
    //    let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
    //    self.APIService.asyncGetEPAMarkersInside(bounds).then(
    //        function (response) {
    //            if (self.markers == undefined) {
    //                self.markers = response;
    //                self.$log.log('marker array was empty');
    //            } else {
    //                self.markers = self.markers.concat(response);
    //                self.$log.log('concatenation of the marker array');
    //            }
    //        },
    //        function (response) {
    //            self.$log.log('EPA API service promise rejected: ' + response);
    //        }
    //    );
    //}

    private updateMapMarkers() {
        let self = this;

        self.$log.log('*********************UpdatingMapMarkers*********************');
        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        self.APIService.asyncGetMarkersInside(bounds).then(
            function (response) {
                self.$log.log('*********************UpdatingMapMarkers JSON RETURNING*********************');
                let data = response.data;

                // Add custom attributes to each Marker
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
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
                self.$log.log('how many markers did we get back? ' + data.length);
                if (self.markers == undefined) {
                    self.markers = data;
                    self.$log.log('marker array was empty');
                } else {
                    self.markers = self.markers.concat(data);
                    self.$log.log('concatenation of the marker array');
                }

                self.leafletData.getMap().then(
                    function (map) {
                        let panes = map.getPanes();
                        console.log(panes);
                    }
                );
                // Keep around for a bit -- Good example of creating custom leaflet menu tools
                //   Requires --force when grunting
                //self.leafletData.getMap().then(
                //    function(map) {
                //        var legend = L.control({position: 'topright'});
                //        legend.onAdd = function (map) {
                //            var div = L.DomUtil.create('div', 'info legend');
                //
                //            //div.innerHTML = '<select><option>1</option><option>2</option><option>3</option></select>';
                //            let select = '<select>';
                //            for (let i = 0; i < self.markers.length; i++) {
                //                let name = self.markers[i]['name'];
                //                select += "<option>" + name + "</option>";
                //            };
                //            select += '</select>';
                //            div.innerHTML = select;
                //
                //            div.firstChild['onmousedown'] = div.firstChild['onblclick'] = L.DomEvent.stopPropagation;
                //            //div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
                //            return div;
                //        };
                //        legend.addTo(map);
                //    }
                //);
            },
            function (response) {
                self.$log.log('ams API service promise rejected: ' + response);
            }
        );
    }

    //private updateOverlays() {
    //    let self = this;
    //    let bounds  = { 'mapParameters': { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } }, 'pollutantName': 'PM' };
    //    self.amsAPIService.asyncGetHeatMapDataInside(bounds).then(
    //        function(response) {
    //            let heatmap = self.configureOverlays();
    //            heatmap.data = response;
    //
    //            self.layers.overlays = {
    //                heat: heatmap
    //            };
    //        },
    //        function(response) {
    //            self.$log.log('ams API service promise rejected: ' + response);
    //        }
    //    );
    //}

    //private drawCircles() {
    //    let self = this;
    //    if (self.drawCount == 1) {
    //        self.$log.log('lets NOT draw any circles');
    //        return;
    //    }
    //    self.$log.log('lets draw some circles');
    //    self.leafletData.getMap().then(
    //        function(map) {
    //            if (self.drawCount == undefined) {
    //                self.drawCount = 0;
    //            }
    //            L.circle([40.758483, -111.845961], 200, {
    //                fillColor: '#03f'
    //            }).addTo(map);
    //            self.$log.log('circle added to map: ' + self.drawCount++);
    //        }
    //    );
    //
    //    self.leafletData.getMap().then(
    //        function(map) {
    //            self.bounds = map.getBounds();
    //            self.$log.log('here');
    //        }
    //    );
    //}

    public showStationChart() {
        this.togglePlot();
        if (this.plotVisible) {
            this.generatePlot();
        }

    }

    public generatePlot() {
        if (!this.selectedStation || !this.selectedStation.id) {
            return;
        }

        this.unsetChartData();
        let id = this.selectedStation.id;
        if (this.isEPAStation(id)) {
            this.getDataForEPAPlot(id);
        } else {
            this.getDataForPlot(id);
        }
    }

    private getChartHeight() {
        let divHeight = angular.element(document).find('#details-plot').css('height');
        return parseInt(divHeight.substring(0, divHeight.length - 2));
    }

    private getDataForPlot(stationID) {
        let self = this;

        // TODO: move this to compare view!
        let url = "api/stations/parameterValues";
        let config = {
            params: {
                stationID: stationID,
                parameter: ["PM2.5", "PM10", "OZONE", "CO", "NO2", "SO2"]
            }
        };

        self.$http.get(url, config).then(
            function (response) {
                console.log('PASS!');
                self.chartOptions = self.getChartOptions();
                self.chartOptions['height'] = self.getChartHeight();
                self.chartData = response.data;

                console.log('whoa there, lets take a looksy at getDataForPlot');
            },
            function (response) {
                console.log('Failure!');
            }
        );

        //self.APIService.asyncGetDataPointsFrom(stationID).then(
        //    function (response) {
        //        self.chartOptions = self.getChartOptions();
        //        self.chartOptions['height'] = self.getChartHeight();
        //        self.chartData = response;
        //    },
        //    function (response) {
        //        self.$log.log('api for device data points failure');
        //    }
        //);
    }

    private getDataForEPAPlot(stationID) {
        let self = this;
        self.APIService.asyncGetDataPointsFromEPA(stationID).then(
            function (response) {
                self.chartOptions = self.getChartOptions();
                self.chartOptions['height'] = self.getChartHeight();
                self.chartData = response;
            },
            function (response) {
                self.$log.log('api for EPA device data points failure');
            }
        );
    }

    private getChartOptions() {
        return {
            chart: {
                type: 'lineChart',
                height: 0,
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

    private unsetChartData() {
        this.chartOptions = undefined;
        this.chartData = undefined;
    }
}
