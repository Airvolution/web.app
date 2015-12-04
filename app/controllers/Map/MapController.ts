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

        angular.extend($scope, {
            bounds: bounds,
            center: {},
            defaults: {
                tileLayer: 'https://api.tiles.mapbox.com/v4/tjhooker33.o78l0n36/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGpob29rZXIzMyIsImEiOiJjaWg2emdkdGowZHJ4dTBrbDJmNmE4Y21mIn0.t0DvfElObK6T72UP5OO74g',
                maxZoom: 18,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
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
            // Jared, how do I call the private methods at the bottom of this class?
            // TODO: API call to get [deviceIDs and locations]
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
        });

        $scope.$on('leafletDirectiveMarker.map.click', function(event, args){
            // Resource on how to add Marker Events
            // https://github.com/angular-ui/ui-leaflet/blob/master/examples/0513-markers-events-example.html
            console.log('a marker has been clicked');

            var data = { 'deviceID': args.modelName };

            // TODO: Stringify data to JSON
            // JSON.stringify(data);

            // TODO: Make API call

            // TODO: Open Details Panel / Details PLot
        });
    }
}