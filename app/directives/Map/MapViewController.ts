/// <reference path="../../../typings/tsd.d.ts" />

export = MapViewController;

class MapViewController {

    public detailsVisible:boolean;
    public plotVisible:boolean;

    public selectedStation;
    public loadingStationData;

    private drawCount;

    public center;
    public minZoom;
    public maxZoom;
    public markers;
    public bounds;
    public events;
    public layers;

    public chartOptions;
    public chartData;

    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'amsAPIService', '$timeout'];

    constructor(private $scope,
                private leafletData,
                private leafletBoundsHelpers,
                private leafletMarkerEvents,
                private $http,
                private $log,
                private locationService,
                private amsAPIService,
                private $timeout) {
        this.detailsVisible = true;
        this.plotVisible = false;
        this.minZoom = 5;
        this.maxZoom = 12;
        this.center = {
            lat: 0,
            lng: 0,
            zoom: 2
        };
        this.markers = [];
        this.selectedStation = {location: {}, last: {}};
        this.bounds = this.defaultMapBounds();
        this.layers = this.configureLayers();
        this.events = this.registerMapEvents();

        this.drawCount = 0;

        $scope.$on('leafletDirectiveMarker.map.click', this.onMarkerClick());

        this.updateMapMarkers();
        this.positionMapWithLocation();
        this.configureMapMoveEvents();
        this.updateOverlays();
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
            }
        };
    }

    private configureOverlays() {
        return {
            name: 'Heat Map',
            type: 'heat',

            data: [],
            layerOptions: {
                backgroundColor: 'rgba(0,0,0,0.25)',
                maxOpacity: 0.9,
                minOpacity: 0.5,
                radius: 50,
                blur: 15
            },
            visible: false
        };
    }

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

    private defaultMapBounds() {
        return this.leafletBoundsHelpers.createBoundsFromArray([
            [57.903638, -37.642519],
            [11.708745, -152.757073]
        ]);
    }

    private configureMapMoveEvents() {
        let self = this;
        self.$scope.$on('leafletDirectiveMap.map.moveend', function (event) {
            // This updates $scope.bounds because leaflet bounds are not updating automatically
            self.leafletData.getMap().then(
                function (map) {
                    self.bounds = map.getBounds();
                    self.$log.log('updating map bounds');
                    self.drawCircles();
                }
            );
        });
    }

    private onMarkerClick() {
        var self = this;
        return (event, args)=> {
            self.$log.log('a marker has been clicked');
            var id = args.model.id || args.model.deviceID;
            if (self.selectedStation && self.selectedStation.id && id == self.selectedStation.id) {
                self.toggleDetails(false);
                self.toggleDetails(false);
                self.selectedStation = undefined;
                return;
            }
            self.selectedStation = {location: {}, last: {}};
            self.selectedStation.id = id;
            self.selectedStation.location.lat = args.model.lat;
            self.selectedStation.location.lng = args.model.lng;
            if (!self.isEPAStation(id)) {
                self.getLastDataPoint(id);
                return;
            }
        };
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
        self.amsAPIService.asyncGetLastDataPointFrom(id).then(
            function (response) {
                self.selectedStation.last = {};

                self.selectedStation.last.pm = response['PM2.5'];
                self.selectedStation.last.co = response['co'];
                self.selectedStation.last.co2 = response['co2'];
                self.selectedStation.last.no2 = response['NO2'];
                self.selectedStation.last.o3 = response['OZONE'];
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
                    lat: response.lat,
                    lng: response.lng,
                    zoom: 10
                };
            },
            function (response) {
                self.$log.log('location service promise rejected: ' + response);
            }
        );
    }

    private updateMapMarkers() {
        this.updateAirvolutionMarkers();
        //this.updateEPAMarkers();
    }

    //private updateEPAMarkers() {
    //    let self = this;
    //    let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
    //    self.amsAPIService.asyncGetEPAMarkersInside(bounds).then(
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

    private updateAirvolutionMarkers() {
        let self = this;
        let bounds = {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}};
        self.amsAPIService.asyncGetMarkersInside(bounds).then(
            function (response) {
                if (self.markers == undefined) {
                    self.markers = response;
                    self.$log.log('marker array was empty');
                } else {
                    self.markers = self.markers.concat(response);
                    self.$log.log('concatenation of the marker array');
                }
            },
            function (response) {
                self.$log.log('ams API service promise rejected: ' + response);
            }
        );
    }

    private updateOverlays() {
        let self = this;
        let bounds = {
            'mapParameters': {'northEast': {'lat': 89, 'lng': 179}, 'southWest': {'lat': -89, 'lng': -179}},
            'pollutantName': 'PM'
        };
        self.amsAPIService.asyncGetHeatMapDataInside(bounds).then(
            function (response) {
                let heatmap = self.configureOverlays();
                heatmap.data = response;

                self.layers.overlays = {
                    heat: heatmap
                };
            },
            function (response) {
                self.$log.log('ams API service promise rejected: ' + response);
            }
        );
    }

    private drawCircles() {
        let self = this;
        if (self.drawCount == 1) {
            self.$log.log('lets NOT draw any circles');
            return;
        }
        self.$log.log('lets draw some circles');
        self.leafletData.getMap().then(
            function (map) {
                if (self.drawCount == undefined) {
                    self.drawCount = 0;
                }
                L.circle([40.758483, -111.845961], 200, {
                    fillColor: '#03f'
                }).addTo(map);
                self.$log.log('circle added to map: ' + self.drawCount++);
            }
        );

        self.leafletData.getMap().then(
            function (map) {
                self.bounds = map.getBounds();
                self.$log.log('here');
            }
        );
    }

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
        self.amsAPIService.asyncGetDataPointsFrom(stationID).then(
            function (response) {
                self.chartOptions = self.getChartOptions();
                self.chartOptions['height'] = self.getChartHeight();
                self.chartData = response;
            },
            function (response) {
                self.$log.log('api for device data points failure');
            }
        );
    }

    private getDataForEPAPlot(stationID) {
        let self = this;
        self.amsAPIService.asyncGetDataPointsFromEPA(stationID).then(
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
                type: 'lineWithFocusChart',
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
