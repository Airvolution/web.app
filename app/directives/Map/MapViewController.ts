/// <reference path="../../../typings/tsd.d.ts" />

export = MapViewController;

class MapViewController {
    public detailsVisible:boolean;
    public plotVisible:boolean;

    public selectedStation;

    public center;
    public minZoom;
    public maxZoom;
    public markers;
    public bounds;
    public events;
    public layers;

    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'amsAPIService'];
    constructor(
        private $scope,
        private leafletData,
        private leafletBoundsHelpers,
        private leafletMarkerEvents,
        private $http,
        private $log,
        private locationService,
        private amsAPIService,
        private drawCount
    ) {
        this.detailsVisible = true;
        this.plotVisible = false;
        this.minZoom = 5;
        this.maxZoom = 12;
        this.center = {
            lat: 0,
            lng: 0,
            zoom:2
        };
        this.markers = [];
        this.selectedStation = { location: {}, last: {} };
        this.bounds = this.defaultMapBounds();
        this.layers = this.configureLayers();
        this.events = this.registerMapEvents();

        this.updateMapMarkers();
        this.positionMapWithLocation();
        this.configureMapMoveEvents();
        this.configureMapClickEvents();
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
            [ 57.903638, -37.642519 ],
            [ 11.708745, -152.757073 ]
        ]);
    }

    private configureMapMoveEvents() {
        let self = this;
        self.$scope.$on('leafletDirectiveMap.map.moveend', function(event) {
            // This updates $scope.bounds because leaflet bounds are not updating automatically
            self.leafletData.getMap().then(
                function(map) {
                    self.bounds = map.getBounds();
                    self.$log.log('updating map bounds');
                    self.drawCircles();
                }
            );
        });
    }

    private configureMapClickEvents() {
        let self = this;
        self.$scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            self.$log.log('a marker has been clicked');

            if (self.selectedStation && self.selectedStation.id && args.model.deviceID == self.selectedStation.id) {
                self.detailsVisible = false;
                self.plotVisible = false;
                self.selectedStation = undefined;
                return;
            }

            let model = args.model;
            let id = model.deviceID;
            if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id == 'Washington County' || id == 'Weber County') {

                self.selectedStation = { location: {}, last: {} };

                self.selectedStation.id           = model.deviceID;
                self.selectedStation.location.lat = model.lat;
                self.selectedStation.location.lng = model.lng;

                // TODO: get latest values from deq site

                self.detailsVisible = true;

                if (self.plotVisible) {
                    self.plotVisible = false;
                }
                return;
            }

            self.amsAPIService.asyncGetLastDataPointFrom(id).then(
                function(response) {
                    self.selectedStation = { location: {}, last: {} };

                    self.selectedStation.id           = model.deviceID;
                    self.selectedStation.location.lat = model.lat;
                    self.selectedStation.location.lng = model.lng;

                    // TODO: the current API really doesn't make this easy
                    self.selectedStation.last.pm       = response['pm'];
                    self.selectedStation.last.co       = response['co'];
                    self.selectedStation.last.co2      = response['co2'];
                    self.selectedStation.last.no2      = response['no2'];
                    self.selectedStation.last.o3       = response['os3'];
                    self.selectedStation.last.temp     = response['temp'];
                    self.selectedStation.last.humidity = response['humidity'];
                    self.selectedStation.last.pressure = response['pressure'];
                    self.selectedStation.last.altitude = response['altitude'];

                    self.detailsVisible = true;

                    if (self.plotVisible) {
                        self.plotVisible = false;
                    }
                },
                function(response) {
                    self.$log.log('last data point promise rejected: ' + response);
                }
            );
        });
    }

    private positionMapWithLocation() {
        console.log('positionMapWithLocation called...');
        let self = this;
        self.locationService.asyncGetGeoCoordinates().then(
            function(response) {
                self.center = {
                    lat: response.lat,
                    lng: response.lng,
                    zoom: 10
                };
            },
            function(response) {
                self.$log.log('location service promise rejected: ' + response);
            }
        );
    }

    private updateMapMarkers() {
        this.updateAirvolutionMarkers();
        this.updateEPAMarkers();
    }

    private updateEPAMarkers() {
        let self = this;
        let bounds  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        self.amsAPIService.asyncGetEPAMarkersInside(bounds).then(
            function(response) {
                if (self.markers == undefined) {
                    self.markers = response;
                    self.$log.log('marker array was empty');
                } else {
                    self.markers = self.markers.concat(response);
                    self.$log.log('concatenation of the marker array');
                }
            },
            function(response) {
                self.$log.log('EPA API service promise rejected: ' + response);
            }
        );
    }

    private updateAirvolutionMarkers() {
        let self = this;
        let bounds  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        self.amsAPIService.asyncGetMarkersInside(bounds).then(
            function(response) {
                if (self.markers == undefined) {
                    self.markers = response;
                    self.$log.log('marker array was empty');
                } else {
                    self.markers = self.markers.concat(response);
                    self.$log.log('concatenation of the marker array');
                }
            },
            function(response) {
                self.$log.log('ams API service promise rejected: ' + response);
            }
        );
    }

    private updateOverlays() {
        let self = this;
        let bounds  = { 'mapParameters': { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } }, 'pollutantName': 'PM' };
        self.amsAPIService.asyncGetHeatMapDataInside(bounds).then(
            function(response) {
                let heatmap = self.configureOverlays();
                heatmap.data = response;

                self.layers.overlays = {
                    heat: heatmap
                };
            },
            function(response) {
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
            function(map) {
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
            function(map) {
                self.bounds = map.getBounds();
                self.$log.log('here');
            }
        );
    }
}
