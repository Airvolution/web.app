/// <reference path="../../../typings/tsd.d.ts" />

import MapFactory = require("../../services/Map/MapFactory");
export = MapViewController;

class MapViewController {
    private clusterSearch;
    private deregisterStateWatcher;

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

    public static $inject = ['$state', '$rootScope', '$scope', '$stateParams','leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'APIService', '$timeout', 'mapFactory', 'selectionService'];

    constructor(private $state,
                private $rootScope,
                private $scope,
                private $stateParams,
                private leafletData,
                private leafletBoundsHelpers,
                private leafletMarkerEvents,
                private $http,
                private $log,
                private locationService,
                private APIService,
                private $timeout,
                private mapFactory,
                private selectionService
    ) {
        let mv = this;

        mv.detailsVisible = true;
        mv.plotVisible = false;

        mv.selectedStation = {location: {}, last: {}};

        mv.markers = mv.getMapMarkers();
        mv.defaults = mapFactory.getDefaults();
        mv.center = mapFactory.getCenter();

        // things to watch with scope watch
        if ($stateParams.mode === undefined) {
            $scope.mode = 'light';
        } else {
            $scope.mode = $stateParams.mode;
        }
        $scope.centerOnLocation = true; // arbitrary value
        $scope.centerOnMarker = false;  // arbitrary value, but why not be different?
        $scope.togglePlot = false;
        $scope.downloadPlot = false;
        $scope.toggleCluster = undefined;
        $scope.hideAllClusters = false;
        $scope.showAllClusters = true;
        $scope.toggleDetails = true;

        mv.tiles = mapFactory.createTilesFromKey($scope.mode);
        mv.layers = mapFactory.createMapLayers();
        mv.events = mv.createMapEvents();
        mv.clusterSearch = $state.params['cluster'];

        $scope.$watch('mode', function (mode) {
            mv.updateMapTiles(mode);
        });

        $scope.$watch('centerOnLocation', function () {
            mv.$log.log('lets try to center shall we please');
            mv.mapFactory.getCenterNoAutoDiscover(mv.center.zoom).then(
                function (response) {
                    mv.center = response;
                }
            );
        });

        $scope.$watch('centerOnMarker', function (marker) {
            if (mv.selectedStation && mv.selectedStation.id) {
                mv.$log.log('lets try to center on a marker, that would be neat-o-rific');
                mv.center = mv.mapFactory.getCenterFromMarker(mv.selectedStation, mv.center.zoom);
            }
        });

        $scope.$watch('togglePlot', function () {
            if (mv.selectedStation && mv.selectedStation.id) {
                mv.showStationChart();
            }
        });

        $scope.$watch('downloadPlot', function () {
            if (mv.selectedStation && mv.selectedStation.id) {
                mv.downloadStationData();
            }
        });

        $scope.$watch('toggleCluster', function () {
            if (mv.layers.overlays[$scope.toggleCluster] === undefined) {
            } else {
                mv.layers.overlays[$scope.toggleCluster].visible = !mv.layers.overlays[$scope.toggleCluster].visible;
                $scope.toggleCluster = undefined;
            }
        });

        $scope.$watch('hideAllClusters', function () {
            mv.hideAllClusters();
        });

        $scope.$watch('showAllClusters', function () {
            mv.showAllClusters();
        });

        $scope.$watch('toggleDetails', function () {
            mv.detailsVisible = !mv.detailsVisible;
        });

        $scope.$on('leafletDirectiveMarker.map.click', mv.onMarkerClick());
        $scope.$on('leafletDirectiveMap.map.moveend', mv.onMapMove());
        this.showStationsByCluster($stateParams['cluster']);
    }

    private updateMapTiles(mode) {
        this.tiles = this.mapFactory.createTilesFromKey(mode);
    }

    private registerStateWatcher($rootScope) {
        var self = this;
        $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams)=> {
            // TODO: for now I'm only doing tiles, in the future we may need to add additional checks here
            if(toState.name == fromState.name && toParams == fromParams){
                return;
            }
            if (toState.name == 'app.map') {
                self.tiles = self.mapFactory.createTilesFromKey(toParams.mode);
                if (toParams.cluster) {
                    self.showStationsByCluster(toParams['cluster']);
                }
            } else {
                self.deregisterStateWatcher();
            }
        });
    }

    private showStationsByCluster(cluster) {
        let self = this;
        if (cluster === undefined) {
            self.$log.log('MapViewController received undefined stateParam.');
            return;
        }
        if (!cluster || cluster == "") {
            self.showAllClusters();
            return;
        }
        self.hideAllClusters();
        if (Array.isArray(cluster)) {
            angular.forEach(cluster, function (id) {
                if (self.layers.overlays[id] === undefined) {
                } else {
                    self.layers.overlays[id].visible = true;
                }
            });
        } else {
            this.layers.overlays[cluster].visible = true;
        }

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
        self.$scope.$on('leafletDirectiveMap.map.moveend', function () {
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
            self.selectionService.setCurrentStation(self.selectedStation);
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

    public downloadStationData() {
        if (!this.selectedStation || !this.selectedStation.id) {
            return;
        }
        this.mapFactory.downloadDataFromStation(this.selectedStation.id);
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
