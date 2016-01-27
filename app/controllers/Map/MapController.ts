///<referecnce path='../../typings/tsd.d.ts'/>

export = MapController;

class MapController {
    public static name = 'MapController';
    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService', 'amsAPIService'];
    constructor(
        private $scope,
        private leafletData,
        private leafletBoundsHelpers,
        private leafletMarkerEvents,
        private $http,
        private $log,
        private locationService,
        private amsAPIService
    ) {
        angular.extend($scope, {
            minZoom: 5,
            maxZoom: 12,
            center: {
                lat: 0,
                lng: 0,
                zoom: 2
            },
            bounds: this.defaultMapBounds(),
            layers: this.configureLayers(),
            events: this.registerMapEvents()
        });

        this.updateMapMarkers();
        this.positionMapWithLocation();
        this.configureMapMoveEvents();
        this.configureMapClickEvents();
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
            self.leafletData.getMap().then(function(map) {
                self.$scope.bounds = map.getBounds();
            });
        });
    }

    private configureMapClickEvents() {
        let self = this;
        self.$scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            self.$log.log('a marker has been clicked');

            let pscope = self.$scope.$parent;

            if (pscope.station && pscope.station.id && args.model.deviceID == pscope.station.id) {
                pscope.showDetails = false;
                pscope.plotVisible = false;
                pscope.station = undefined;
                return;
            }

            let model = args.model;
            let id = model.deviceID;
            if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id == 'Washington County' || id == 'Weber County') {

                pscope.station = { location: {}, last: {} };

                pscope.station.id           = model.deviceID;
                pscope.station.location.lat = model.lat;
                pscope.station.location.lng = model.lng;

                // TODO: get latest values from deq site

                pscope.showDetails = true;

                if (pscope.plotVisible) {
                    pscope.pctrl.togglePlot(false);
                }
                return;
            }

            self.amsAPIService.asyncGetLastDataPointFrom(id).then(
                function(response) {
                    pscope.station = { location: {}, last: {} };

                    pscope.station.id           = model.deviceID;
                    pscope.station.location.lat = model.lat;
                    pscope.station.location.lng = model.lng;

                    // TODO: the current API really doesn't make this easy
                    pscope.station.last.pm       = response['pm'];
                    pscope.station.last.co       = response['co'];
                    pscope.station.last.co2      = response['co2'];
                    pscope.station.last.no2      = response['no2'];
                    pscope.station.last.o3       = response['os3'];
                    pscope.station.last.temp     = response['temp'];
                    pscope.station.last.humidity = response['humidity'];
                    pscope.station.last.pressure = response['pressure'];
                    pscope.station.last.altitude = response['altitude'];

                    pscope.showDetails = true;

                    if (pscope.plotVisible) {
                        pscope.pctrl.togglePlot(false);
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
                self.$scope.center = {
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
                if (self.$scope.markers == undefined) {
                    self.$scope.markers = response;
                } else {
                    self.$scope.markers = self.$scope.markers.concat(response);
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
                self.$scope.markers = response;
            },
            function(response) {
                self.$log.log('ams API service promise rejected: ' + response);
            }
        );
    }
}
