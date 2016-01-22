///<referecnce path="../../typings/tsd.d.ts"/>
declare var L;

export = HeatMapController;
class HeatMapController {
    public static name = "HeatMapController";
    private data;
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
            },
            events: {
                map: {
                    enable: ['zoomend'],
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
                
                var data = response.data['ams'];

                // Add custom attributes to each Marker
                for (var key in data) {
                    //console.log('key: ' + key);
                    if (data.hasOwnProperty(key)) {
                        data[key]['clickable'] = true;
                        data[key]['icon'] = { 
                            iconUrl: 'app/assets/images/markers/green.png',
                            iconSize: [35,45], 
                            iconAnchor: [17,28] 
                        };
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

        
        /*
        // This works but it doesn't update for unknown reason
        $scope.$on('leafletDirectiveMap.map.zoomend', function(event) {
            // $scope.layers.overlays.heat <-- layer I want
            // $scope.layers.overlays.heat.layerOptions.radius = 5
            
            $scope.ctrl.leafletData.getMap().then(function(map) {
                map.removeLayer($scope.layers.overlays);
                console.log('did we get the map object?');
                var zoom = map.getZoom();
                console.log('zoom: ' + zoom);
                
                var radius = 5 + 5*zoom;
                //console.log('radius: ' + $scope.layers.overlays.heat.layerOptions.radius);
                //$scope.layers.overlays.heat.layerOptions.radius = radius;
                console.log('radius: ' + $scope.layers.overlays.heat.layerOptions.radius);
                
                
                var heatmap = {
                    name: 'Heat Map',
                    type: 'heat',
                    
                    data: this.data,
                    layerOptions: {
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        maxOpacity: 0.9,
                        minOpacity: 0.5,
                        radius: radius,
                        blur: 15
                    },
                    visible: true
                };
                console.log('radius: ' + $scope.layers.overlays.heat.layerOptions.radius);
                
                $scope.layers.overlays = {
                    heat: heatmap
                };
                
            });
            
            console.log('the map zoomed');
        });
        */

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            console.log('a marker has been clicked');

            var data = { 'deviceID': args.modelName };
        });
        
        var url = 'api/frontend/heatmap'
        var obj2  = { 'mapParameters': { 'northEast': { 'lat': 89, 'lng': 179 }, 'southWest': { 'lat': -89, 'lng': -179 } }, 'pollutantName': 'PM' };
        var data = JSON.stringify(obj2);
        console.log('JSON: ' + data);
        $http.post(url, data, {} ).then(
            function(response) {
                console.log('Success!');
                console.log('  ' + url + ':\t status: ' + response.status);
                console.log('======================');

                this.data = response.data['values'];

                var heatmap = {
                    name: 'Heat Map',
                    type: 'heat',
                    
                    data: this.data,
                    layerOptions: {
                        backgroundColor: 'rgba(0,0,0,0.25)',
                        maxOpacity: 0.9,
                        minOpacity: 0.5,
                        radius: 50,
                        blur: 15
                    },
                    visible: true
                };
                
                $scope.layers.overlays = {
                    heat: heatmap
                };
            },
            function(response) {
                console.log('Failure!');
                console.log('  status: ' + response.status);
                console.log('======================');
            }
        );
    }
}