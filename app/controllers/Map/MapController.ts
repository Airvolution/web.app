///<referecnce path="../../typings/tsd.d.ts"/>
declare var L;

export = MapController;
class MapController {
    // TODO: This controller is currently providing functionality for MAP
    // TODO: We should move this where it belongs at some point
    public static name = "MapController";
    static $inject = ['$scope','leafletData', 'leafletBoundsHelpers', 'leafletMarkerEvents', '$http'];
    constructor(
        private $scope,
        private leafletData,
        private leafletBoundsHelpers,
        private leafletMarkerEvents,
        private $http
    ) {
        var bounds = leafletBoundsHelpers.createBoundsFromArray([
            // TODO: use location from IP address of client
            [ 41.381483, -110.387754],
            [ 39.640479, -112.236828 ]
        ]);

        // TODO: We should have a way to do this only once (not in two different controllers)
        angular.extend($scope, {
            bounds: bounds,
            layers: {
                baselayers: {
                    mapbox_light: { 
                        name: 'Mapbox Light',
                        url: 'https://api.tiles.mapbox.com/v4/tjhooker33.o78l0n36/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                        type: 'xyz',
                        layerOptions: {
                            apikey: 'pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                            mapid: 'tjhooker33.o78l0n36'
                        }
                    }
                }
            },
            events: {
                map: {
                    enable: ['moveend'],
                    logic: 'emit'
                },
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents()
                }
            }
        });
        
        
        // TODO: It would be nice to make an API class
        console.log('bounds: ' + $scope.bounds.northEast.lat);
        var url = 'api/frontend/map'
        var obj  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
        var data = JSON.stringify(obj);
        console.log('JSON: ' + data);
        $http.post(url, data, {} ).then(
            function(response) {
                console.log('Success!');
                console.log('  status: ' + response.status);
                console.log('======================');
                

                // TODO: Parse the returned DATA into JSON
                var data = response.data['ams'];

                // Add custom attributes to each Marker
                for (var key in data) {
                    //console.log('key: ' + key);
                    if (data.hasOwnProperty(key)) {
                        data[key]['clickable'] = true;
                        data[key]['riseOnHover'] = true;
                        data[key]['draggable'] = true;
                        data[key]['message'] = "Lat: " + data[key]['lat'] + "</br>Lng: " + data[key]['lng'];
                    }
                }

                // Add markers to map
                $scope.markers = data;
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );

        $scope.$on('leafletDirectiveMap.map.moveend', function(event) {
            var url = 'api/frontend/map'
            var obj  = { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } };
            var data = JSON.stringify(obj);
            console.log('JSON: ' + data);
            $http.post(url, data, {} ).then(
                function(response) {
                    console.log('Success!');
                    console.log('  status: ' + response.status);
                    console.log('======================');

                    var data = response.data['ams'];

                    // Add custom attributes to each Marker
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            data[key]['clickable'] = true;
                            data[key]['riseOnHover'] = true;
                            data[key]['draggable'] = true;
                            data[key]['message'] = "Lat: " + data[key]['lat'] + "</br>Lng: " + data[key]['lng'];
                        }
                    }

                    // Add markers to map
                    $scope.markers = data;
                },
                function(response) {
                    console.log('Failure!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
                }
            );
        });

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            console.log('a marker has been clicked');
           
            var pscope = $scope.$parent;
           
            if (pscope.station && pscope.station.id && args.model.deviceID == pscope.station.id) {
                pscope.showDetails = false;
                pscope.plotVisible = false;
                pscope.station = undefined;
                return;
            }
           
            var url = 'api/frontend/singleLatest'
            var obj = JSON.stringify(args.model.deviceID);
            console.log('JSON: ' + obj);
            $http({
                url:url,
                data:obj,
                method: 'POST'
                }).then(
                function(response) {
                    console.log('Success!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
    
                    pscope.station = { location: {}, last: {} };
                    
                    pscope.station.id           = args.model.deviceID;
                    pscope.station.location.lat = args.model.lat;
                    pscope.station.location.lng = args.model.lng;
                    
                    var data = response.data;

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
                    console.log('Failure!');
                    console.log('  status: ' + response.status);
                    console.log('======================');
                }
            );
        });
    }
}