///<referecnce path='../../typings/tsd.d.ts'/>

export = MapController;

class MapController {
    public static name = 'MapController';
    public static $inject = ['$scope', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http', '$log', 'locationService'];
    constructor(
        private $scope,
        private leafletData,
        private leafletBoundsHelpers,
        private leafletMarkerEvents,
        private $http,
        private $log,
        private locationService
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
                self.$log.log('map bounds: ' + self.$scope.bounds);
                self.$log.log('L bounds: ' + map.getBounds());
                self.$scope.bounds = map.getBounds();
                self.$log.log('map bounds: ' + self.$scope.bounds);
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

            let id = args.model.deviceID;
            if (id == 'Box Elder County' || id == 'Cache County' || id == 'Price' || id == 'Davis County' || id == 'Duchesne County' || id == 'Salt Lake County' || id == 'Tooele County' || id == 'Uintah County' || id == 'Utah County' || id == 'Washington County' || id == 'Weber County') {

                pscope.station = { location: {}, last: {} };

                pscope.station.id           = args.model.deviceID;
                pscope.station.location.lat = args.model.lat;
                pscope.station.location.lng = args.model.lng;

                // TODO: get latest values from deq site

                pscope.showDetails = true;

                if (pscope.plotVisible) {
                    pscope.pctrl.togglePlot(false);
                }
                return;
            }

            let url = 'api/frontend/singleLatest';
            let obj = JSON.stringify(id);
            self.$log.log('JSON: ' + obj);
            self.$http({
                url: url,
                data: obj,
                method: 'POST'
            }).then(
                function(response) {
                    self.$log.log('Success!');
                    self.$log.log('  status: ' + response.status);
                    self.$log.log('======================');

                    pscope.station = { location: {}, last: {} };

                    pscope.station.id           = args.model.deviceID;
                    pscope.station.location.lat = args.model.lat;
                    pscope.station.location.lng = args.model.lng;

                    let data = response.data;

                    // TODO: the current API really doesn't make this easy
                    pscope.station.last.pm       = data['pm'];
                    pscope.station.last.co       = data['co'];
                    pscope.station.last.co2      = data['co2'];
                    pscope.station.last.no2      = data['no2'];
                    pscope.station.last.o3       = data['os3'];
                    pscope.station.last.temp     = data['temp'];
                    pscope.station.last.humidity = data['humidity'];
                    pscope.station.last.pressure = data['pressure'];
                    pscope.station.last.altitude = data['altitude'];

                    pscope.showDetails = true;

                    if (pscope.plotVisible) {
                        pscope.pctrl.togglePlot(false);
                    }
                },
                function(response) {
                    self.$log.log('Failure!');
                    self.$log.log('  status: ' + response.status);
                    self.$log.log('======================');
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
                self.$log.log('location service promise accepted: ' + response);
            },
            function(response) {
                // failure
                self.$log.log('location service promise rejected: ' + response);
            },
            function(response) {
                // got notification
                self.$log.log('location service notification: ' + response);
            }
        );
    }

    private updateMapMarkers() {
        this.updateAirvolutionMarkers();
        this.updateEPAMarkers();
    }

    private updateEPAMarkers() {
        let self = this;
        let url = 'api/frontend/daq';
        let bounds  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        let data = JSON.stringify(bounds);
        self.$log.log('JSON: ' + data);
        self.$http({
            url: url,
            method: 'GET'
        }).then(
            function(response) {
                self.$log.log('Success!');
                self.$log.log('  status: ' + response.status);
                self.$log.log('======================');

                // TODO: Parse the returned DATA into JSON
                let data = response.data;
                // let daqSites = [];

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
                    self.$scope.markers.push(obj);
                }
            },
            function(response) {
                self.$log.log('Failure!');
                self.$log.log('  status: ' + response.status);
                self.$log.log('======================');
            }
        );
    }

    private updateAirvolutionMarkers() {
        // TODO: It would be nice to make an API class
        let self = this;
        let url = 'api/frontend/map';
        let bounds  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        let data = JSON.stringify(bounds);
        self.$log.log('JSON: ' + data);
        self.$http.post(url, data, {} ).then(
            function(response) {
                self.$log.log('Success!');
                self.$log.log('  status: ' + response.status);
                self.$log.log('======================');

                // TODO: Parse the returned DATA into JSON
                let data = response.data['ams'];

                // Add custom attributes to each Marker
                for (let key in data) {
                    // console.log('key: ' + key);
                    if (data.hasOwnProperty(key)) {
                        data[key]['clickable'] = true;
                        data[key]['icon'] = {
                            iconUrl: 'app/assets/images/markers/green.png',
                            iconSize: [35, 45],
                            iconAnchor: [17, 28]
                        };
                    }
                }

                // Add markers to map
                self.$scope.markers = data;
            },
            function(response) {
                self.$log.log('Failure!');
                self.$log.log('  status: ' + response.status);
                self.$log.log('======================');
            }
        );
    }
}
