/// <reference path="../../../typings/tsd.d.ts" />

import MapFactory = require("../../services/Map/MapFactory");
export = MapViewController;

class MapViewController {

    public detailsVisible:boolean;
    public plotVisible:boolean;

    public selectedStation;
    // TODO: bring this back at some point...
    //public loadingStationData;

    public controls;
    public center;
    public defaults;
    public markers;
    public bounds;
    public events;
    public tiles;
    public layers;
    public chartOptions;
    public chartData;

    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'APIService', '$timeout', 'mapFactory'];

    constructor(private $scope,
                private leafletData,
                private leafletBoundsHelpers,
                private leafletMarkerEvents,
                private $http,
                private $log,
                private locationService,
                private APIService,
                private $timeout,
                private mapFactory) {

        this.detailsVisible = true;
        this.plotVisible = false;

        this.selectedStation = {location: {}, last: {}};

        this.markers = this.getMapMarkers();
        this.defaults = mapFactory.getDefaults();
        this.center = mapFactory.getCenter();
        this.tiles = mapFactory.createDefaultTiles();
        this.layers = mapFactory.createMapLayers();
        this.events = this.createMapEvents();

        $scope.$on('leafletDirectiveMarker.map.click', this.onMarkerClick());
        $scope.$on('leafletDirectiveMap.map.moveend', this.onMapMove());
        $scope.$on('$stateChangeStart', this.onStateChange());
    }

    private onStateChange() {
        let self = this;
        self.$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            // TODO: for now I'm only doing tiles, in the future we may need to add additional checks here
            switch (toState.name) {
                case 'map.light':
                    self.tiles = self.mapFactory.createTilesFromKey(toState.name);
                    break;
                case 'map.dark':
                    self.tiles = self.mapFactory.createTilesFromKey(toState.name);
                    break;
                case 'map.satellite':
                    self.tiles = self.mapFactory.createTilesFromKey(toState.name);
                    break;
                case 'map.cluster':
                    // create an array by separating param string by commas -- example: "CA,TX,UT"
                    self.showStationsByCluster(toParams['clusterId'].split(','));
                    break;
                default: // 'map'
                    self.tiles = self.mapFactory.createDefaultTiles();
            };
        });
    }

    private showStationsByCluster(cluster) {
        let self = this;
        if (cluster === undefined) {
            self.$log.log('MapViewController received undefined stateParam.');
            return;
        }
        if (cluster == "") {
            self.showAllClusters();
            return;
        }
        self.hideAllClusters();
        angular.forEach(cluster, function (id) {
            if (self.layers.overlays[id] === undefined) {
            } else {
                self.layers.overlays[id].visible = true;
            }
        });
    }

    private hideAllClusters() {
        let self = this;
        angular.forEach(self.layers.overlays, function (cluster:any) {
            cluster.visible = false;
        });
    }

    private showAllClusters() {
        let self = this;
        angular.forEach(self.layers.overlays, function (cluster:any) {
            cluster.visible = true;
        });
    }

    private createMapEvents() {
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

    private onMapMove() {
        // This updates $scope.bounds because leaflet bounds are not updating automatically
        let self = this;
        self.$scope.$on('leafletDirectiveMap.map.moveend', function() {
            self.leafletData.getMap().then(
                function (map) {
                    self.bounds = map.getBounds();
                    self.$log.log('updating map bounds');
                    self.$log.log('zoom: ' + map.getZoom());
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

            self.selectedStation = args.model;
            self.mapFactory.getLastDataPointFromStation(self.selectedStation.id).then(
                function (response) {
                    self.selectedStation.last = response.lastDataPoint;
                    self.selectedStation.lastUpdated = response.lastUpdated;

                    self.detailsVisible = true;
                    if (self.plotVisible) {
                        self.plotVisible = false;
                    }
                },
                function (response) {
                    // error
                }
            );
        });
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

    private getMapMarkers() {
        let self = this;

        self.$log.log('*********************UpdatingMapMarkers*********************');
        self.mapFactory.getMapMarkers().then(
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
                self.$log.log('MapViewController received rejected promise when getting map markers.' + response);
                self.markers = [];
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
        this.getDataForPlot(this.selectedStation.id);
    }

    private getDataForPlot(id) {
        let self = this;
        self.mapFactory.getDataFromStation(id).then(
            function (response) {
                self.chartOptions = response.chartOptions;
                self.chartData = response.chartData;
            },
            function (response) {
                self.$log.log('MapViewController received rejected promise when getting data for plot.' + response);
            }
        );
    }

    private unsetChartData() {
        this.chartOptions = undefined;
        this.chartData = undefined;
    }
}
